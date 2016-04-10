(function(angular) {
  var module = angular.module('app.analytics', ['ssNotify', 'util.rest']);

  module.controller('GamePlannerCtrl', function($scope, $uibModal, NotifyService, RestService) {
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
        $scope.games = games;
      });
    };

    $scope.goBack = function() {
      delete $scope.activeTeam;
      delete $scope.games;
      delete $scope.analytics;
      $scope.teams = allTeams;
    };

    $scope.generateReport = function() {
      $scope.$$loadAnalytics = true;
      var gameIds = $scope.games.filter(function(game) {
        return game.$$active;
      }).map(function(game) {
        return game._id;
      });
      rest.$post('/api/offense/ai/playtype', {
        teamId: $scope.activeTeam._id,
        gameIds: gameIds
      }).then(function(analytics) {
        angular.forEach(analytics, function(analyticsList, group) {
          angular.forEach(analyticsList, function(a) {
            a.$$score = a.yards.loss * -2 + a.yards.bad * -1 + a.yards.normal + a.yards.good * 1.5 + a.yards.great * 2 + a.yards.awesome * 3;

            if (a.$$score > 10) {
              a.$$scoreType = "active-primary";
            } else if (a.$$score > 3) {
              a.$$scoreType = "active-success";
            } else if (a.$$score > 1) {
              a.$$scoreType = "active-secondary";
            } else if (a.$$score < 1) {
              a.$$scoreType = "active-warning";
            } else if (a.$$score < -3) {
              a.$$scoreType = "active-danger";
            } else {
              a.$$scoreType = "active-info";
            }
          });

          analyticsList.sort(function(a, b) {
            return b.$$score - a.$$score;
          });
        });

        $scope.analytics = analytics;
        delete $scope.$$loadAnalytics;
      });
    };

    $scope.viewCard = function(analytic) {
      var instance = $uibModal.open({
        size: 'lg',
        templateUrl: 'app/gamePlanner/play-listing.modal.html',
        controller: function($scope, $window) {
          $scope.analytic = analytic;

          $scope.viewReplay = function(play) {
            $window.open('http://glb.warriorgeneral.com/game/replay.pl?game_id=' + play.gameId + '&pbp_id=' + play.replayId, "research");
          };
        }
      }).result;
    };

  });
}(angular));
