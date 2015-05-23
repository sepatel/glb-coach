var FS = require('fs');
var Q = require('q');
var Cheerio = require('cheerio');
var _ = require('underscore');

var MongoClient = require('mongodb').MongoClient;
var DBRef = require('mongodb').DBRef;
var Request = require('request');
var Cookie = require('tough-cookie').Cookie;
var Utils = require('./utils');
var Config = require('../config');

var cookieJar = Request.jar();
var activeAccount;
var db;
var playbook = {};
var playerArchtypeCache = {};

var me = module.exports = {
  login: login,
  build: {
    get: function() {
      var defer = Q.defer();
      db.collection('buildGuide').find().toArray(function(err, docs) {
        if (err) {
          return defer.reject(err);
        }
        defer.resolve(docs);
      });
      return defer.promise;
    },
    remove: function(buildId) {
      var defer = Q.defer();
      db.collection('buildGuide').findAndRemove({_id: buildId}, function(error, doc) {
        if (error) {
          return defer.reject(error);
        }
        defer.resolve(doc.value);
      });
      return defer.promise;
    },
    save: function(build) {
      var defer = Q.defer();
      db.collection('buildGuide').update({_id: build._id}, build, {upsert: true}, function(error, count, status) {
        if (error) {
          return defer.reject(error);
        }
        defer.resolve(build);
      });
      return defer.promise;
    }
  },
  getGame: function(gameId) {
    var defer = Q.defer();

    function parseGamePage(body) {
      var defer = Q.defer();
      var $ = Cheerio.load(body);
      var game = {
        _id: gameId,
        team: {
          away: null,
          home: null
        }
      };

      var allPromises = [];
      var teamLogos = $('div#scoreboard > div.team_logo > img');
      var first = teamLogos.first().attr('src');
      var last = teamLogos.last().attr('src');
      allPromises.push(me.getTeam(parseInt(first.substring(first.indexOf('=') + 1))).then(function(team) {
        game.team.home = new DBRef("team", team._id);
      }).catch(errorLogger));
      allPromises.push(me.getTeam(parseInt(last.substring(last.indexOf('=') + 1))).then(function(team) {
        game.team.away = new DBRef("team", team._id);
      }).catch(errorLogger));

      $('div#pbp .pbp_replay a').each(function(index, replay) {
        var ids = $(replay).attr('href').replace(/.*game_id=(\d+)&pbp_id=(\d+)/, "$1 $2").split(" ");
        allPromises.push(me.getReplay(parseInt(ids[0]), parseInt(ids[1])));
      });

      Q.allSettled(allPromises).then(function(promises) {
        console.log("Retrieved game", gameId);
        defer.resolve(game);
      }).catch(function(errors) {
        console.error("Incomplete game", gameId, errors);
        defer.reject(errors);
      });

      return defer.promise;
    }

    request("game" + gameId, {url: Config.glbUrl + '/game.pl?game_id=' + gameId + '&mode=pbp'}).then(function(content) {
      parseGamePage(content).then(function(game) {
        db.collection('game').update({_id: game._id}, {$set: game}, {upsert: true}, function(error, result) {
          if (error) {
            return defer.reject("Unable to save the game", game, error);
          }
          return defer.resolve(game);
        });
      });
    });

    return defer.promise;
  },
  getReplay: function(gameId, replayId) {
    var defer = Q.defer();

    request("replay" + gameId + "_" + replayId, {
      url: Config.glbUrl + '/replay.pl?game_id=' + gameId + '&pbp_id=' + replayId
    }).then(function(content) {
      var $ = Cheerio.load(content.toString());
      var scriptNode = $('body script').get(1).children[0].data;
      var timeMatch = $('span#time_ytg').first().text().match(/(\d+):(\d+) (\d)\w{0,2} & (inches|[\-\.\d]+) on (?:(\w+) ([\-\.\d]+))?/);
      if (!timeMatch) {
        // Kickoff or Extra point attempt when no marker point exists
        console.info("Unable to parse", gameId, replayId, $('span#time_ytg').first().text(), $('div.play#outcome_content').first().text());
      }
      var play = {
        gameId: gameId,
        replayId: replayId,
        outcome: $find($('div#outcome_content')),
        scoreDelta: $findAsInt($('div#off_score')) - $findAsInt($('div#def_score')),
        quarter: matchForInt($find($('div#replay_header h1')), /Q(\d)/),
        timeRemaining: parseInt(timeMatch[1]) * 60 + parseInt(timeMatch[2]),
        down: parseInt(timeMatch[3]),
        distance: parseFloat(timeMatch[4] || 0),
        marker: parseFloat(timeMatch[6] || 0) + (timeMatch[5] == 'OPP' ? 50 : 0),
        players: [],
        offense: matchForDBRef(scriptNode, /var away = '(\d+)'/, "team"),
        defense: matchForDBRef(scriptNode, /var home = '(\d+)'/, "team")
      };

      // parse players involved in the plays, note this logic breaks on timeouts (specifically the match == null)
      var match = scriptNode.match(/var players = (\{.+?\}\});\s*/) || [null, '{}'];
      var playersInPlay = {};
      eval("playersInPlay = " + match[1]);
      Object.keys(playersInPlay).map(function(key) {
        var info = playersInPlay[key];
        var playerId = parseInt(key);
        play.players.push({id: playerId, position: info.position, name: info.name, archetype: playerArchtypeCache[playerId]});
      });

      match = scriptNode.match(/var play_data = (\[\[.+?\]\]);\s*/) || [null, '[]'];
      var playData = [];
      eval('playData = ' + match[1]);
      play.formation = determineFormation(playData[0] || [], play.players);

      var ballPlays = playData.map(function(play) {
        for (var i in play) {
          if (play[i].id == 'ball') {
            return play[i];
          }
        }
      });
      // TODO: assume ball is 4.25y behind line of scrimmage, is it 3y = 1 yard? vary by formation?
      play.yards = Math.abs(ballPlays[ballPlays.length - 1].y - ballPlays[0].y) - 4.25;
      // TODO: Deflected passes should be treated as 0 yards, perhaps a new field for distance ball travelled to know if screens or what are happening

      play.defensivePlay = getDefensivePlayName($('div#defense_play_container').first().text(), play.players);
      play.offensivePlay = getOffensivePlayName($("div#play_container").first().text().trim().replace(/Offense Play:/, ''), play.formation);

      db.collection('play').update({gameId: gameId, replayId: replayId}, {$set: play}, {upsert: true}, function(error, result) {
        if (error) {
          return defer.reject("Unable to save replay", gameId, replayId, error);
        }
        defer.resolve(play);
      });
    }).catch(function(error) {
      console.error("Failure to parse replay", error, "game", gameId, "replay", replayId);
      defer.reject(error);
    });

    return defer.promise.timeout(30000);
  },
  getTeam: function(teamId) {
    var defer = Q.defer();

    function parseTeamPage(body) {
      var $ = Cheerio.load(body);
      var team = {
        _id: parseInt(teamId),
        name: $('div.big_head.subhead_head').text().replace(/\r|\n.*/gm, ''),
        players: []
      };
      // TODO: Parse the team roster out and store it in mongo
      $('div#content_attrib table.players tr').each(function(index, element) {
        var href = $(element).find("td.player_name a").first().attr('href');
        if (href == null) {
          return;
        }
        // TODO: td.player_dc is the players attributes in order of str, spd, agi, jmp, sta, vis, con, blk, tak, thw, cat, cry, kck, pnt
        var player = {
          _id: parseInt(href.substring(href.indexOf('=') + 1)),
          name: $(element).find("td.player_name a").text(),
          archetype: determineArchetype($(element).find("td.player_archetype img").first().attr('onmouseover')),
          position: $(element).find("td.player_position .position").text(),
          level: parseInt($(element).find("td.player_level").first().text())
        };

        db.collection('player').update({_id: player._id}, {$set: player}, {upsert: true}, function(error, result) {
          if (error) {
            return console.error("Error when updating player", player._id, error);
          }
          playerArchtypeCache[player._id] = player.archetype;
        });
        team.players.push(new DBRef("player", player._id));
      });

      return team;
    }

    request("team" + teamId, { url: Config.glbUrl + '/roster.pl?team_id=' + teamId }).then(function(content) {
      var team = parseTeamPage(content);

      db.collection('team').update({_id: team._id}, {$set: team}, {upsert: true}, function(error, result) {
        if (error) {
          return defer.reject("Unable to save the team", team, error);
        }
        return defer.resolve(team);
      });
    });
    return defer.promise;
  }
};

Q.nfcall(MongoClient.connect, Config.mongo).then(function(mongodb) {
  db = mongodb;
  db.collection('playbook').find(function(err, docs) {
    docs.forEach(function(play) {
      playbook[play._id] = {
        name: play.name,
        formation: play.formation,
        type: play.type
      };
    });
    console.log("Initialized playbook");
  });

  db.collection('player').find(function(err, docs) {
    docs.forEach(function(player) {
      playerArchtypeCache[player._id] = player.archetype;
    });
    console.log("Initialized player archetypes");
  });
}).catch(function(error) {
  console.info("Unable to establish a connection to the database. Existing application", error);
  process.exit(1);
}).all();

function determineArchetype(tip) {
  return tip.replace(/set_tip\('(.+?)',.*/, "$1");
}

function getOffensivePlayName(playName, formation) {
  var match = null;
  _.forEach(playbook, function(play) {
    if (play.formation == formation && play.name == playName) {
      match = play;
    }
  });
  if (!match) {
    console.info("Offensive Play Did not match", playName, formation);
    return playName;
  }
  return match;
}

function getDefensivePlayName(playName, players) {
  if (playName) {
    return playName.replace(/Defense Play:/, '').trim();
  }

  var count = {dl: 0, lb: 0, cb: 0};
  players.forEach(function(player) {
    if (player.position.match(/RDE|LDE|NT.?|DT.?/)) {
      count.dl++;
    } else if (player.position.match(/[LR][IO]LB|MLB/)) {
      count.lb++;
    } else if (player.position.match(/CB.|SS|FS/)) {
      count.cb++;
    }
  });

  if (count.dl + count.lb + count.cb != 11) {
    return null;
  }
  return count.dl + "-" + count.lb + "-" + count.cb;
}

function determineFormation(initialPlayData, players) {
  var playerCounts = { qb: [], hb: [], fb: [], te: [], wr: [] };
  var playData = {};

  initialPlayData.forEach(function(playPlayer) {
    if (playPlayer.id == 'ball') {
      return;
    }

    playData[playPlayer.id] = _.extend({}, playPlayer, {id: parseInt(playPlayer.id)});
  });

  players.forEach(function(player) {
    var position = player.position;
    var playerPlayData = playData[player.id];
    _.extend(playerPlayData, {position: position, name: player.name});

    if (position.match(/QB/)) {
      playerCounts.qb.push(playerPlayData);
    } else if (position.match(/HB/)) {
      playerCounts.hb.push(playerPlayData);
    } else if (position.match(/FB/)) {
      playerCounts.fb.push(playerPlayData);
    } else if (position.match(/TE/)) {
      playerCounts.te.push(playerPlayData);
    } else if (position.match(/WR/)) {
      playerCounts.wr.push(playerPlayData);
    }
  });

  if (playerCounts.fb.length == 2) {
    return "Special";
  } else if (playerCounts.te.length == 3) {
    return "Goal Line";
  } else if (playerCounts.wr.length == 5) {
    return "Shotgun 5WR";
  } else if (playerCounts.wr.length == 4) {
    return "Spread";
  } else if (playerCounts.wr.length == 3) {
    var ball = initialPlayData[0];
    var wr = [null, null, null];
    playerCounts.wr.forEach(function(player) {
      switch (player.position) {
        case 'WR1':
          wr[0] = player;
          break;
        case 'WR2':
          wr[1] = player;
          break;
        case 'WR3':
          wr[2] = player;
          break;
      }
    });
    if (Math.abs(wr[0].x - wr[1].x) < 15) {
      return "Trips";
    } else if (Math.abs(playerCounts.hb[0].y - playerCounts.qb[0].y) > 10) {
      return "Singleback";
    }
    return "Shotgun 3WR";
  } else if (playerCounts.wr.length == 2 && playerCounts.te.length == 2) {
    return "Singleback Big";
  } else if (playerCounts.wr.length == 2) {
    var hb = playerCounts.hb[0];
    var fb = playerCounts.fb[0];
    var distanceX = hb.x - fb.x;
    _.each(playData, function(player, id) {
      if (player.position == 'LOT' && player.x - playerCounts.qb[0].x > 0) {
        distanceX *= -1; // flip the orientation since the play is directed south instead of north
      }
    });

    if (Math.abs(hb.y - fb.y) < 2) {
      return "Pro Set";
    } else if (Math.abs(distanceX) < 2) {
      return "I Form";
    } else if (distanceX > 2) {
      return "Weak I";
    } else if (distanceX < 2) {
      return "Strong I";
    }
  } else if (playerCounts.wr.length == 1) {
    return "Big I";
  }

  return null; // unknown
}

function login() {
  var defer = Q.defer();
  var configCollection = db.collection('config');
  configCollection.findOne({_id: 'account'}, function(error, account) {
    if (error) {
      return defer.reject("Unable to read the database");
    } else if (!account) {
      return defer.reject("Unable to retrieve account information");
    }

    if ((+account.expiration || 0) < +Date.now()) {
      console.info("Logging in with ", account);
      Request.post({url: Config.glbUrl + '/login.pl', jar: cookieJar, form: {
        user_name: account.username, password: account.password,
        action: 'Submit',
        x: Utils.randomInt(25, 40),
        y: Utils.randomInt(35, 50)
      }}, function(error, response, body) {
        if (response.statusCode != 200) {
          return defer.reject("Unexpected status code on login. Terminating until fixed");
        }
        var cookies = response.headers['set-cookie'].map(function(c) {
          return (Cookie.parse(c));
        });
        account.cookies = {};
        account.expiration = new Date(+Date.now() + 1000 * 60 * 60); // login is good for 1 hour only
        for (var i in cookies) {
          console.info("Cookie is ", JSON.stringify(cookies[i]));
          account.cookies[cookies[i].key] = cookies[i].value;
        }

        configCollection.update({_id: 'account'}, account);
        activeAccount = account;
        return defer.resolve(account);
      });
    } else {
      for (var i in account.cookies || {}) {
        cookieJar.add(Request.cookie(i + "=" + account.cookies[i]), Config.glbUrl);
      }

      activeAccount = account;
      return defer.resolve(account);
    }
  });
  return defer.promise;
}

function request(cacheId, options, timeout) {
  var defer = Q.defer();
  if (options.jar === undefined) {
    options.jar = cookieJar;
  }
  Q.nfcall(FS.readFile, 'server/cache/' + cacheId + ".html").then(function(contents) {
    return defer.resolve(contents);
  }).catch(function() {
    Request(options, function(error, response, body) {
      if (response.statusCode >= 400) {
        return defer.reject(response.statusCode);
      } else if (body.match(/window.location.replace\("\/game\/login.pl/)) {
        db.collection('config').update({_id: 'account'}, {'$unset': {expiration: 1, cookies: 1}}, function(error) {
          if (error) {
            console.error("Unable to clear account status", error);
            return defer.reject(401);
          }

          login().then(function(account) { // try it again now that you have logged in again
            request(options, timeout).then(function(content) {
              defer.resolve(content);
            }).catch(function(code) {
              defer.reject(code);
            });
          }).catch(function(error) {
            defer.reject(error);
          });
        });
      } else {
        Q.nfcall(FS.writeFile, 'server/cache/' + cacheId + '.html', body); // don't care if it succeeds or fails
        defer.resolve(body);
      }
    });
  });

  return defer.promise;
}

function errorLogger(error) {
  console.error(error);
}

function $find(node) {
  return node.first().text();
}

function $findAsInt(node) {
  return parseInt($find(node));
}

function matchForDBRef(string, pattern, collection) {
  var id = matchForInt(string, pattern);
  if (id) {
    return new DBRef(collection, id);
  }
  return null;
}

function matchForInt(string, pattern) {
  var match = string.match(pattern);
  if (match) {
    return parseInt(match[1]);
  }
  return null;
}

