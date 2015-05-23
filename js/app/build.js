(function(angular) {
  var module = angular.module('app.build', ['ssNotify']);

  module.controller('BuildCtrl', function($scope, $http, NotifyService) {
    $scope.template = {
      physical: {weight: 0, height: 0},
      attributes: {
        STR: {value: 8, alg: 0},
        SPD: {value: 8, alg: 0},
        AGI: {value: 8, alg: 0},
        JMP: {value: 8, alg: 0},
        STA: {value: 8, alg: 0},
        VIS: {value: 8, alg: 0},
        CON: {value: 8, alg: 0}, BLK: {value: 8, alg: 0},
        TKL: {value: 8, alg: 0},
        THR: {value: 8, alg: 0},
        CAT: {value: 8, alg: 0},
        CAR: {value: 8, alg: 0},
        KCK: {value: 8, alg: 0},
        PNT: {value: 8, alg: 0}
      },
      instructions: [
        { season: 0,
          day: 45, sp: 'SPD',
          train: ['SPD', 'AGI'],
          star: 'AGI',
          starAmount: 1,
          unlock: 'AGI'
        },
        { season: 0,
          day: 46,
          sp: 'SPD',
          train: ['SPD', 'AGI', 'JMP'],
          star: 'JMP', starAmount: 2,
          unlock: 'JMP'
        }
      ]
    };
    $scope.positions = ['QB', 'HB', 'FB', 'WR', 'TE', 'OL', 'DT', 'DE', 'LB', 'CB', 'SS', 'FS', 'K', 'P'];
    $scope.attributes = ['STR', 'SPD', 'AGI', 'JMP', 'STA', 'VIS', 'CON', 'BLK', 'TKL', 'THR', 'CAT', 'CAR', 'KCK',
      'PNT'];
    $scope.dayByDayResults = [];

    $scope.viewSeason = 0;

    $scope.$watch("template", function(template) {
      console.log("Template updated with " + angular.toJson(template));
      if (angular.isObject(template)) {
        $scope.instructions = angular.copy(template.instructions);
        $scope.initAttr = template.attributes;
        angular.forEach($scope.initAttr, function(attr, name) {
          attr.star = 0;
          attr.train = 0;
        });
      }
    });

    $scope.addInstruction = function() {
      $scope.instructions.push({ season: 0,
        day: -8,
        sp: null,
        train: [],
        trainStyle: 'intense',
        star: null,
        unlock: null
      });
    };

    $scope.evaluate = function(season) {
      $scope.viewSeason = season;
      $scope.instructions.sort(function(a, b) {
        var diff = a.season - b.season;
        if (!diff) {
          diff = a.day - b.day;
        }
        return diff;
      });
      $scope.dayByDayResults = generateDayByDayResults(angular.copy($scope.instructions));
    };

    $scope.isMultiTraining = function(instruction) {
      var count = 0;
      angular.forEach(instruction.train, function(train) {
        if (train) {
          count++;
        }
      });
      return count > 1;
    };

    $scope.removeInstruction = function(index) {
      $scope.instructions.splice(index, 1);
    };
    $scope.reloadTemplates = function() {
      $http.get("api/builds").success(function(builds) {
        $scope.templates = builds;
      });
    };
    $scope.removeTemplate = function() {
      $http.delete("api/build/" + $scope.template._id).success(function(build) {
        if (build._id) {
          NotifyService.success("Guide Deleted", build._id + " was successfully removed");
        } else {
          NotifyService.danger("Deletion Failure", "Build guide could not be removed");
        }
      });
    };
    $scope.saveTemplate = function() {
      var data = {
        _id: $scope.template._id,
        position: $scope.template.position,
        physical: $scope.template.physical,
        instructions: $scope.instructions,
        attributes: $scope.initAttr
      };
      $http.post("api/build", data).success(function(build) {
        console.log("Build saved as " + angular.toJson(build));
        NotifyService.success("Guide Saved", build._id + " was successfully saved");
      });
    };

    function generateDayByDayResults(instructions) {
      var state = {
        skillPoint: 15,
        bonusToken: 12,
        trainingPoint: 8,
        attributes: angular.copy($scope.initAttr),
        season: 0,
        day: 40,
        level: 1, xp: 0,
        vxp: 0,
        age: 0,
        alg: [0, 0],
        notifications: {}
      };
      calculateAlg(state);

      var nextInstruction = instructions.shift();
      var instruction;
      var results = [];
      for (var i = 0; i < 418; i++) {
        if (nextInstruction && nextInstruction.season <= state.season && nextInstruction.day <= state.day) {
          instruction = nextInstruction;
          nextInstruction = instructions.shift();
        }

        dailyActivity(state, instruction);
        // Boosting days based on even game days only
        if (((state.season == 0 || state.season == 1) && state.day == 48) || (state.level == 21) || ((state.season == 3 || state.season == 4 || state.season == 6 || state.season == 8) && state.day == 0) || ((state.season == 5 || state.season == 7) && state.day == 2) || (state.season == 8 && state.day == 1)) {
          for (var x = 0; x < 3; x++) {
            levelUp(state, 6, instruction);
            state.notifications.boost = true;
          }
        }
        if (state.season == $scope.viewSeason) {
          results.push(angular.copy(state));
        }
        advanceDay(state, instruction);
      }
      return results;
    }

    function dailyActivity(state, instruction) {
      if (angular.isUndefined(instruction)) {
        instruction = {
          train: []
        }
      }
      resetNotifications(state);
      unlockAttribute(state, instruction.unlock);
      starAttribute(state, instruction.star, instruction.starAmount);
      train(state, instruction);
      investSkillPoints(state, instruction);
    }

    function advanceDay(state, instruction) {
      state.day++;
      if (state.day > 48) {
        state.season++;
        state.day = -8;
      }

      if (state.day > 0 && state.day < 41) {
        state.age++;
        state.xp += dailyXp(state.level);
        state.vxp += dailyVxp(state.level);
        if (state.day % 2 == 0 && state.day <= 32) { // regular season games only
          state.xp += gameXp(state.level);
        }
        if (state.xp >= 1000) {
          state.xp -= 1000;
          levelUp(state, 5, instruction);
        }
      }
      if (state.age <= 281) {
        state.trainingPoint += 2;
      }
    }

    function calculateAlg(state) {
      var countPrimary = 0;
      var countSecondary = 0;
      for (var key in $scope.initAttr) {
        var attr = $scope.initAttr[key];
        if (attr.alg == 1) {
          countPrimary++;
        } else if (attr.alg == 2) {
          countSecondary++;
        }
      }
      state.alg[0] = 2 / countPrimary;
      state.alg[1] = 1 / countSecondary;
    }

    function dailyXp(level) {
      if (level < 41) {
        return 50;
      } else if (level < 73) {
        return 25;
      }
      return 0;
    }

    function dailyVxp(level) {
      if (level < 25) {
        return 0;
      } else if (level < 30) {
        return 150;
      } else if (level < 35) {
        return 250;
      } else if (level < 40) {
        return 300;
      }
      return 325;
    }

    function gameXp(level) {
      if (level < 16) {
        return 625;
      } else if (level < 32) {
        return 500;
      } else if (level < 53) {
        return 375;
      } else if (level < 69) {
        return 250;
      } else if (level < 70) {
        return 125;
      }
      return 0;
    }

    function levelUp(state, points, instruction) {
      var primary = state.alg[0];
      var secondary = state.alg[1];
      if (state.level > 21) {
        primary *= 0.75;
        secondary *= 0.75;
      }
      if (state.level > 29) {
        primary *= 0.75;
        secondary *= 0.75;
      }
      if (state.level > 37) {
        primary *= 0.75;
        secondary *= 0.75;
      }

      state.level++;
      angular.forEach(state.attributes, function(attr) {
        if (attr.alg == 1) {
          attr.value += primary;
        } else if (attr.alg == 2) {
          attr.value += secondary;
        }
      });
      if (state.level == 73) { // special frequent boosting rewards
        state.skillPoint += 20;
      }
      state.skillPoint += points;
      investSkillPoints(state, instruction);
    }

    function unlockAttribute(state, attribute) {
      if (attribute && !state.attributes[attribute].unlocked) {
        var unlockedAlready = 1;
        for (var index in state.attributes) {
          if (state.attributes[index].unlocked) {
            unlockedAlready++;
          }
        }
        if (state.bonusToken >= unlockedAlready * 6) {
          state.attributes[attribute].unlocked = true;
          state.bonusToken -= unlockedAlready * 6;
          state.notifications[attribute].push({icon: 'unlock'});
        }
      }
    }

    function resetNotifications(state) {
      state.notifications.boost = false;
      angular.forEach(state.attributes, function(attr, key) {
        state.notifications[key] = [];
      })
    }

    function starAttribute(state, attribute, max) {
      var attr = state.attributes[attribute];
      while (attribute && attr.star < max && state.bonusToken >= (attr.star + 1) * 6) {
        attr.star++;
        state.bonusToken -= attr.star * 6;
        state.notifications[attribute].push({icon: 'star'});
      }
    }

    function train(state, instruction) {
      var multiTraining = 0;
      angular.forEach(instruction.train, function(attr) {
        if (attr) {
          multiTraining++;
        }
      });
      if (multiTraining == 0 || state.trainingPoint < multiTraining * 2) {
        return;
      }
      var adjustment = 1.2;
      if ('light' == instruction.trainStyle) {
        adjustment = 0.4;
      } else if ('normal' == instruction.trainStyle) {
        adjustment = 0.85;
      }

      while (state.trainingPoint >= multiTraining * 2) {
        state.trainingPoint -= multiTraining * 2;
        if (multiTraining == 1) {
          state.bonusToken += 2;
          if ('normal' == instruction.trainStyle) {
            state.bonusToken += 2;
          } else if ('light' == instruction.trainStyle) {
            state.bonusToken += 4;
          }
        } else {
          state.bonusToken += (multiTraining - 1) * 4;
        }

        angular.forEach(instruction.train, function(attrKey) {
          var attr = state.attributes[attrKey];
          if (angular.isUndefined(attr)) {
            return;
          }
          var baseGains = Math.round(1.6 * 75 * Math.exp(-0.038 * (attr.value - 1)));
          if (attr.value > 100) {
            baseGains = 1;
          }

          var gain = Math.round(baseGains * adjustment);
          if (gain == 0) {
            gain = 1;
          }

          if (multiTraining == 2) {
            gain = Math.round(gain * 1.05 * (1 + attr.star / 10));
          } else if (multiTraining == 3) {
            gain = Math.round(gain * 1.2 * (1 + attr.star / 10));
          } else if (multiTraining == 4) {
            gain = Math.round(gain * 1.3 * (1 + attr.star / 10));
          } else {
            gain = Math.round(gain * (1 + attr.star / 10));
          }
          if (gain == 0) {
            gain = 1;
          }

          attr.train += Math.round(gain);
          state.notifications[attrKey].push({message: gain + "%"});
          while (attr.train >= 100) {
            attr.train -= 100;
            attr.value++;
          }
        });
      }
    }

    function investSkillPoints(state, instruction) {
      if (angular.isUndefined(instruction.sp)) {
        return;
      }
      var attr = state.attributes[instruction.sp];
      if (angular.isUndefined(attr)) {
        return;
      }
      var attr = state.attributes[instruction.sp];
      if (angular.isUndefined(attr)) {
        return;
      }
      var initial = attr.value;
      while (state.skillPoint >= spToNextCap(attr.value)) {
        state.skillPoint -= spToIncrease(attr.value);
        attr.value++;
      }
      if (attr.value > initial) {
        state.notifications[instruction.sp].push({icon: 'plus'});
      }
    }

    function spToNextCap(value) {
      if (value < 48.07) {
        return Math.ceil(48.07 - value) * 1;
      } else if (value < 60.52) {
        return Math.ceil(60.52 - value) * 2;
      } else if (value < 67.98) {
        return Math.ceil(67.98 - value) * 3;
      } else if (value < 73.25) {
        return Math.ceil(73.25 - value) * 4;
      } else if (value < 77.29) {
        return Math.ceil(77.29 - value) * 5;
      } else if (value < 80.54) {
        return Math.ceil(80.54 - value) * 6;
      } else if (value < 83.26) {
        return Math.ceil(83.26 - value) * 7;
      } else if (value < 85.59) {
        return Math.ceil(85.59 - value) * 8;
      } else if (value < 87.61) {
        return Math.ceil(87.61 - value) * 9;
      } else if (value < 89.41) {
        return Math.ceil(89.41 - value) * 10;
      } else if (value < 91.02) {
        return Math.ceil(91.02 - value) * 11;
      } else if (value < 92.47) {
        return Math.ceil(92.47 - value) * 12;
      } else if (value < 93.80) {
        return Math.ceil(93.80 - value) * 13;
      } else if (value < 95.01) {
        return Math.ceil(95.01 - value) * 14;
      } else if (value < 96.14) {
        return Math.ceil(96.14 - value) * 15;
      } else if (value < 97.19) {
        return Math.ceil(97.19 - value) * 16;
      } else if (value < 98.16) {
        return Math.ceil(98.16 - value) * 17;
      } else if (value < 99.07) {
        return Math.ceil(99.07 - value) * 18;
      } else if (value < 99.93) {
        return Math.ceil(99.93 - value) * 19;
      }
      return 1000;
    }

    function spToIncrease(value) {
      if (value < 48.07) {
        return 1;
      } else if (value < 60.52) {
        return 2;
      } else if (value < 67.98) {
        return 3;
      } else if (value < 73.25) {
        return 4;
      } else if (value < 77.29) {
        return 5;
      } else if (value < 80.54) {
        return 6;
      } else if (value < 83.26) {
        return 7;
      } else if (value < 85.59) {
        return 8;
      } else if (value < 87.61) {
        return 9;
      } else if (value < 89.41) {
        return 10;
      } else if (value < 91.02) {
        return 11;
      } else if (value < 92.47) {
        return 12;
      } else if (value < 93.80) {
        return 13;
      } else if (value < 95.01) {
        return 14;
      } else if (value < 96.14) {
        return 15;
      } else if (value < 97.19) {
        return 16;
      } else if (value < 98.16) {
        return 17;
      } else if (value < 99.07) {
        return 18;
      } else if (value < 99.93) {
        return 19;
      }
      return 1000;
    }
  });
}(angular));
