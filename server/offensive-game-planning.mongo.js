var gameIds = [2762948, 2762937, 2762923, 2762913, 2762918, 2762960];
var teamFocus = 250; // Morning Glory

function mapper() {
  var key = {
    formation: this.formation,
    QB: null,
    HB: null,
    FB: null,
    TE: null,
    BTE: null,
    down: this.down,
    distance: "normal",
    zone: "normal" // redzone, trapped avoiding a safety
  };
  this.players.forEach(function(player) {
    if (player.position == 'QB') {
      switch (player.archetype) {
        case "Deep Passer":
        case "Pocket Passer":
          key.QB = "Passer";
          break;
        case "Scrambler":
        case "Elusive Back":
        case "Returner":
          key.QB = "Rusher";
          break;
        default:
          key.QB = player.archetype;
      }
    } else if (player.position == 'HB') {
      switch (player.archetype) {
        case 'Power Back':
          key.HB = "Power";
          break;
        case 'Scat Back':
          key.HB = "Receiver";
          break;
        case 'Elusive Back':
          key.HB = "Receiver";
          break;
        default:
          key.HB = player.archetype;
      }
    } else if (player.position == 'FB') {
      switch (player.archetype) {
        case 'Blocker':
        case 'Special Teamer':
          key.FB = "Blocker";
          break;
        case 'Rusher':
          key.FB = "Rusher";
          break;
        case 'Scat Back':
          key.FB = "Receiver";
          break;
        default:
          key.FB = player.archetype;
      }
    } else if (player.position == 'TE') {
      switch (player.archetype) {
        case 'Blocker':
        case 'Special Teamer':
          key.TE = "Blocker";
          break;
        case 'Receiver':
          key.TE = "Receiver";
          break;
        default:
          key.TE = player.archetype;
      }
    } else if (player.position == 'BTE') {
      switch (player.archetype) {
        case 'Blocker':
        case 'Special Teamer':
          key.BTE = "Blocker";
          break;
        case 'Receiver':
          key.BTE = "Receiver";
          break;
        default:
          key.BTE = player.archetype;
      }
    }
  });

  if (this.distance < 4) {
    key.distance = "short";
  } else if (this.distance > 10 || (this.down > 2 && this.distance > 4)) {
    key.distance = "long";
  }

  if (this.marker >= 90) {
    key.zone = "safety";
  } else if (this.marker <= 20) {
    key.zone = "redzone";
  }

  var value = {
    plays: [
      { gameId: this.gameId, replayId: this.replayId,
        yards: this.yards, down: this.down, distance: this.distance,
        type: this.offensivePlay, outcome: this.outcome }
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

  if (this.outcome.match(/\[TD\]/)) {
    if (this.yards < 2) {
      this.yards += 2;
    } else {
      this.yards *= 2;
    }
  }
  if (this.yards < 0.5) {
    value.yards.loss++;
  } else if (this.yards < 2.5) {
    value.yards.bad++;
  } else if (this.yards < 4) {
    value.yards.normal++;
  } else if (this.yards < 7) {
    value.yards.good++;
  } else if (this.yards < 20) {
    value.yards.great++;
  } else {
    value.yards.awesome++;
  }

  emit(key, value);
}

function reducer(key, values) {
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

db.play.mapReduce(mapper, reducer, {query: {
  gameId: {$in: gameIds},
  defense: DBRef("team", teamFocus),
  'offensivePlay.type': /Run|Pass/
}, out: "gamePlan"});