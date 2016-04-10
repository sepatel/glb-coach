var Q = require('q');
var _ = require('underscore');
var Database = require('./database');
var DBRef = require('mongodb').DBRef;

module.exports = {
  gamePlanByPlayType: function(defensiveTeamId, gameIds) {
    var query = {
      defense: DBRef('team', defensiveTeamId),
      outcome: {$not: /^False start penalty/},
      offensivePlay: {$ne: null},
      'offensivePlay.type': {$ne: 'Other'}
    };
    if (gameIds) {
      query.gameId = {$in: gameIds};
    }

    var gamePlannerMapperByOffPlayType = function() {
      var key = {playbook: this.offensivePlay};
      var value = determineAnalyticValue(this, this.players);
      //determinePlayerArchetype(value, this.players);
      emit(key, value);
    };

    return Database.db.collection('play').mapReduce(gamePlannerMapperByOffPlayType, reduceAnalyticValues, {
      query: query,
      out: {inline: 1},
      scope: {determinePlayerArchetype: determinePlayerArchetype, determineAnalyticValue: determineAnalyticValue}
    }).then(function(records) {
      var dataset = {
        Run_Inside: [], Run_Tackle: [], Run_Outside: [], Run_Counter: [],
        Pass_Screen: [], Pass_Short: [], Pass_Medium: [], Pass_Deep: []
      };
      records.forEach(function(record) {
        if (!record._id.playbook.type) {
          return;
        }
        dataset[record._id.playbook.type].push(_.extend({
          teamId: defensiveTeamId,
          type: 'offensive'
        }, record._id, record.value));
      });

      return dataset;
    });
  }
  /*
  gamePlanOffAiStats: function(defensiveTeamId) {
    var defer = Q.defer();
    var analysis = {};
    var gamePlan = Database.db.collection('gamePlan');
    var workQ = [];

    function sortByYards(a, b) {
      function score(yards) {
        return (yards.loss * -1) + (yards.bad) + (yards.normal * 1.5) + (yards.good * 2) + (yards.great * 2.5) + (yards.awesome * 3);
      }

      return score(b.yards) - score(a.yards);
    }

    function qCursorResults(key, cursor) {
      var d = Q.defer();

      function processRecords(docs) {
        _.forEach(docs, function(doc) {
          delete doc._id;
        });
        docs.sort(sortByYards);
        analysis[key] = docs;
        d.resolve(key);
      }

      if (cursor instanceof Array) {
        processRecords(cursor);
      } else {
        Q.ninvoke(cursor, "toArray").then(processRecords).catch(function(e) {
          d.reject(e);
        });
      }
      return d.promise;
    }

    // A/B Packages (10 best each?)
    // 1st down,
    // 2nd down, 0 - 4
    // 2nd down, 4 - 7
    // 2nd down, 7 - 99+
    var finalProjection = {
      $project: {
        _id: 0,
        formation: "$_id.formation",
        down: "$_id.down",
        distance: "$_id.distance",
        QB: "$_id.QB",
        HB: "$_id.HB",
        FB: "$_id.FB",
        TE: "$_id.TE",
        BTE: "$_id.BTE",
        plays: "$plays",
        yards: {
          loss: "$loss",
          bad: "$bad",
          normal: "$normal",
          good: "$good",
          great: "$great",
          awesome: "$awesome"
        }
      }
    };

    function playGrouping(down, distance) {
      var id = {
        formation: "$formation",
        down: "$down",
        distance: "$distance",
        QB: "$QB",
        HB: "$HB",
        FB: "$FB",
        TE: "$TE",
        BTE: "$BTE"
      };
      if (down) {
        id.down = {$literal: down};
      }
      if (distance) {
        id.distance = {$literal: distance};
      }
      return {
        $group: {
          _id: id,
          plays: {$addToSet: "$plays"},
          loss: {$sum: "$yards.loss"},
          bad: {$sum: "$yards.bad"},
          normal: {$sum: "$yards.normal"},
          good: {$sum: "$yards.good"},
          great: {$sum: "$yards.great"},
          awesome: {$sum: "$yards.awesome"}
        }
      };
    }

    workQ.push(Q.ninvoke(gamePlan, 'aggregate', {
      $match: {
        teamId: defensiveTeamId,
        zone: 'normal',
        down: {$in: [1, 2]}
      }
    }, {$unwind: "$plays"}, playGrouping("1/2", "10"), finalProjection).then(function(cursor) {
      return qCursorResults('AB', cursor);
    }));

    // C Packages (5 best)
    // 3rd/4th down, 7 = 99+
    workQ.push(Q.ninvoke(gamePlan, 'aggregate', {
      $match: {
        teamId: defensiveTeamId,
        zone: 'normal',
        down: {$in: [3, 4]},
        distance: '7+'
      }
    }, {$unwind: "$plays"}, playGrouping("3/4", "7+"), finalProjection).then(function(cursor) {
      return qCursorResults('C', cursor);
    }));

    // D Packages (2 best)
    // 3rd/4th down, 4-7
    workQ.push(Q.ninvoke(gamePlan, 'aggregate', {
      $match: {
        teamId: defensiveTeamId,
        down: {$in: [3, 4]},
        distance: '4-7'
      }
    }, {$unwind: "$plays"}, playGrouping("3/4", "4-7"), finalProjection).then(function(cursor) {
      return qCursorResults('D', cursor);
    }));

    // E Packages (2 best)
    // 3rd down, 0 - 4
    workQ.push(Q.ninvoke(gamePlan, 'aggregate', {
      $match: {
        teamId: defensiveTeamId,
        down: 3,
        distance: {$in: ['0-2', '2-4']}
      }
    }, {$unwind: "$plays"}, playGrouping(3, "0-4"), finalProjection).then(function(cursor) {
      return qCursorResults('E', cursor);
    }));

    // F Package (2 best?)
    // 4th down, 0 - 2 yards (sometimes 2-4 yards)
    workQ.push(Q.ninvoke(gamePlan, 'aggregate', {
      $match: {
        teamId: defensiveTeamId,
        down: 4,
        distance: {$in: ['0-2', '2-4']}
      }
    }, {$unwind: "$plays"}, playGrouping(4, "0-4"), finalProjection).then(function(cursor) {
      return qCursorResults('F', cursor);
    }));

    // 1st, 2nd down at Goalline 0 - 5 (3 best?) (really 0 - 4?)
    workQ.push(Q.ninvoke(gamePlan, 'aggregate', {
      $match: {
        teamId: defensiveTeamId,
        zone: 'redzone',
        down: {$in: [1, 2]},
        distance: {$in: ['0-2', '2-4']}
      }
    }, {$unwind: "$plays"}, playGrouping("1/2", "0-4"), finalProjection).then(function(cursor) {
      return qCursorResults('G', cursor);
    }));

    // 1st, 2nd down at Goalline 5 - 10 (3 best?) (really 4-10)
    workQ.push(Q.ninvoke(gamePlan, 'aggregate', {
      $match: {
        teamId: defensiveTeamId,
        zone: 'redzone',
        down: {$in: [1, 2]},
        distance: {$in: ['4-7', '7+']}
      }
    }, {$unwind: "$plays"}, playGrouping("1/2", "4+"), finalProjection).then(function(cursor) {
      return qCursorResults('H', cursor);
    }));

    Q.allSettled(workQ).done(function(results) {
      var errors = results.filter(function(result) {
        return result.state != 'fulfilled';
      });
      if (errors.length) {
        console.info("Errors: ", errors);
      }
      defer.resolve(analysis);
    });

    return defer.promise;
  }
  */
};

/*
function offAiMapper() {
  var key = {
    formation: this.formation,
    formationId: this.offensivePlay.id,
    QB: null,
    HB: null,
    FB: null,
    TE: null,
    BTE: null,
    down: this.down,
    distance: "normal",
    zone: "normal" // redzone, safety
  };
  if (this.down < 3) {
    key.down = 1;
  }
  determinePlayerArchetype(key, this.players);

  if (this.distance < 2) {
    key.distance = "0-2";
  } else if (this.distance < 4) {
    key.distance = "2-4";
  } else if (this.distance < 7) {
    key.distance = "4-7";
  } else {
    key.distance = "7+";
  }

  if (this.marker >= 90) {
    key.zone = "safety";
  } else if (this.marker <= 10) {
    key.zone = "redzone";
  }

  var value = determineAnalyticValue(this);
  emit(key, value);
}
*/

function reduceAnalyticValues(key, values) {
  var returnValue = {plays: [], yards: {loss: 0, bad: 0, normal: 0, good: 0, great: 0, awesome: 0}};
  values.forEach(function(value) {
    returnValue.plays = returnValue.plays.concat(value.plays);
    returnValue.yards.loss += value.yards.loss;
    returnValue.yards.bad += value.yards.bad;
    returnValue.yards.normal += value.yards.normal;
    returnValue.yards.good += value.yards.good;
    returnValue.yards.great += value.yards.great;
    returnValue.yards.awesome += value.yards.awesome;
  });
  return returnValue;
}

function determinePlayerArchetype(key, players) {
  players.forEach(function(player) {
    if (player.position == 'QB') {
      switch (player.archetype) {
        case "Scrambler":
        case "Elusive Back":
        case "Returner":
          key.QB = "rQB";
          break;
        default:
          key.QB = " ";
      }
    } else if (player.position == 'HB') {
      switch (player.archetype) {
        case 'Power Back':
          key.HB = "pHB";
          break;
        case 'Scat Back':
          key.HB = "cHB";
          break;
        default:
          key.HB = " ";
      }
    } else if (player.position == 'FB') {
      switch (player.archetype) {
        case 'Blocker':
        case 'Special Teamer':
          key.FB = "bFB";
          break;
        case 'Rusher':
          key.FB = "rFB";
          break;
        case 'Scat Back':
          key.FB = "cFB";
          break;
        default:
          key.FB = " ";
      }
    } else if (player.position == 'TE') {
      switch (player.archetype) {
        case 'Blocker':
        case 'Special Teamer':
          if (key.TE) {
            key.BTE = "bTE";
          } else {
            key.TE = "bTE";
          }
          break;
        case 'Receiver':
          if (key.TE) {
            key.BTE = "cTE";
          } else {
            key.TE = "cTE";
          }
          break;
        default:
          if (key.TE) {
            key.BTE = " ";
          } else {
            key.TE = " ";
          }
      }
    }
  });
}

function determineAnalyticValue(play, players) {
  var value = {
    plays: [
      {
        gameId: play.gameId,
        replayId: play.replayId,
        yards: play.yards,
        down: play.down,
        distance: play.distance,
        //type: play.offensivePlay,
        defense: play.defensivePlay,
        outcome: play.outcome
      }
    ],
    yards: {
      loss: 0, // negative gains
      bad: 0, // under 2 yard gains
      normal: 0, // 2 to 4 yard gains
      good: 0, // 4 to 7 yard gains
      great: 0, // 7 to 20 yard gains
      awesome: 0 // 20+ yard gains
    }
  };
  if (players) {
    determinePlayerArchetype(value.plays[0], players);
  }

  if (play.outcome.match(/\[TD\]/)) {
    if (play.yards < 2) {
      play.yards += 2;
    } else {
      play.yards *= 2;
    }
  }
  if (play.yards < 0.5) {
    value.yards.loss++;
  } else if (play.yards < 2.5) {
    value.yards.bad++;
  } else if (play.yards < 4) {
    value.yards.normal++;
  } else if (play.yards < 7) {
    value.yards.good++;
  } else if (play.yards < 20) {
    value.yards.great++;
  } else {
    value.yards.awesome++;
  }

  return value;
}
