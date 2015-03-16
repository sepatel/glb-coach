var FS = require('fs');
var Q = require('q');
var Cheerio = require('cheerio');

var MongoClient = require('mongodb').MongoClient;
var DBRef = require('mongodb').DBRef;
var Request = require('request');
var Cookie = require('tough-cookie').Cookie;
var Utils = require('./utils');
var Config = require('../config');

var cookieJar = Request.jar();
var activeAccount;
var db;
// TODO: Define a proper error structure rather then free formed strings

module.exports = {
  login: login,
  getTeam: function(teamId) {
    var defer = Q.defer();

    function parseTeamPage(body) {
      var $ = Cheerio.load(body);
      var team = {
        _id: teamId,
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
}).catch(function(error) {
  console.info("Unable to establish a connection to the database. Existing application", error);
  process.exit(1);
}).all();

function determineArchetype(tip) {
  return tip.replace(/set_tip\('(.+?)',.*/, "$1");
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
    console.info(cacheId + " located in the cache, returning contents");
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

  return defer.promise.timeout(timeout || 3000);
}