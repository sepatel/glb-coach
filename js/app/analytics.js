(function(angular) {
  var module = angular.module('app.analytics', ['ssNotify', 'util.rest']);

  module.controller('GamePlannerCtrl', function($scope, NotifyService, RestService) {
    var rest = new RestService("Game Planner");
    var allTeams = [];
    rest.$get('/api/teams').then(function(teams) {
      $scope.teams = allTeams = teams;
    });

    $scope.chooseTeam = function(team) {
      $scope.activeTeam = team;
      rest.$get('/api/games/vs/' + team._id).then(function(games) {
        angular.forEach(games, function(game) {
          game.$$active = true;
          if (game.team.home.$id == team._id) {
            game.vs = {
              road: false,
              teamId: game.team.away.$id,
              name: allTeams.filter(function(t) {
                return t._id == game.team.away.$id;
              })[0].name
            };
          } else {
            game.vs = {
              road: true,
              teamId: game.team.home.$id,
              name: allTeams.filter(function(t) {
                return t._id == game.team.home.$id;
              })[0].name
            };
          }
        });
        // TODO: show the "vs" team team and that team's logo as well
        $scope.games = games;
      });
    };

    $scope.goBack = function() {
      delete $scope.activeTeam;
      delete $scope.games;
      $scope.teams = allTeams;
    };
  });

  module.controller('AnalyticsCtrl', function($scope, $routeParams, $window, NotifyService, RestService) {
    var teamId = $routeParams.teamId;
    var rest = new RestService("Analytics");

    $scope.viewReplay = function(play) {
      $window.open('http://glb.warriorgeneral.com/game/replay.pl?game_id=' + play.gameId + '&pbp_id=' + play.replayId, "research");
    };

    function initialize() {
      rest.$get('/api/team/' + teamId).then(function(team) {
        $scope.team = team;
      });

      rest.$post('/api/offense/ai/formation', {teamId: teamId}).then(function(analytics) {
        console.info("Analytics", analytics);
        angular.forEach(analytics, function(analyticsList, group) {
          angular.forEach(analyticsList, function(a) {
            a.$$score = a.loss * -2 + a.bad * -1 + a.normal + a.good * 1.5 + a.great * 2 + a.awesome * 3;

            if (a.$$score > 10) {
              a.$$scoreType = "panel-primary";
            } else if (a.$$score > 3) {
              a.$$scoreType = "panel-success";
            } else if (a.$$score > 1) {
              a.$$scoreType = "panel-secondary";
            } else if (a.$$score < 1) {
              a.$$scoreType = "panel-warning";
            } else if (a.$$score < -3) {
              a.$$scoreType = "panel-danger";
            } else {
              a.$$scoreType = "panel-default";
            }
          });

          analyticsList.sort(function(a, b) {
            return b.$$score - a.$$score;
          });
        });

        $scope.analytics = analytics;
      });
    }

    initialize();
  });

  module.controller('GamePlanCtrl', function($scope, $routeParams, $window, NotifyService, RestService) {
    var teamId = $routeParams.teamId;
    var rest = new RestService("Game Planner");

    $scope.viewReplay = function(play) {
      $window.open('http://glb.warriorgeneral.com/game/replay.pl?game_id=' + play.gameId + '&pbp_id=' + play.replayId, "research");
    };

    function initialize() {
      rest.$get('/api/team/' + teamId).then(function(team) {
        $scope.team = team;
      });
      rest.$post('/api/offense/ai/gameplan', {teamId: teamId}).then(function(gamePlan) {
        console.info("Game Plan", gamePlan);
        angular.forEach(gamePlan, function(stats, group) {
          stats.sort(function(a, b) {
            if (a.formation > b.formation) {
              return 1;
            } else if (a.formation < b.formation) {
              return -1;
            }
            return 0;
          });

          angular.forEach(stats, function(stat) {
            var yd = stat.yards;
            var score = yd.loss * -2 + yd.bad * -1 + yd.normal + yd.good * 1.5 + yd.great * 2 + yd.awesome * 3;

            if (score > 10) {
              stat.$$score = "panel-primary";
            } else if (score > 3) {
              stat.$$score = "panel-success";
            } else if (score > 1) {
              stat.$$score = "panel-secondary";
            } else if (score < 1) {
              stat.$$score = "panel-warning";
            } else if (score < -3) {
              stat.$$score = "panel-danger";
            } else {
              stat.$$score = "panel-default";
            }
          });
        });

        $scope.gamePlan = gamePlan;
      });
    }

    initialize();
  });
}(angular));
