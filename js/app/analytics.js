(function(angular) {
  var module = angular.module('app.analytics', ['ssNotify', 'util.rest']);

  module.controller('AnalyticsCtrl', function($scope, $http, $routeParams, $window, NotifyService, RestService) {
    var teamId = $routeParams.teamId;
    var rest = new RestService("Analytics");

    $scope.viewReplay = function(play) {
      $window.open('http://glb.warriorgeneral.com/game/replay.pl?game_id=' + play.gameId + '&pbp_id=' + play.replayId, "research");
    };

    function initialize() {
      rest.$get('/api/team/' + teamId).then(function(team) {
        $scope.team = team;
      });
      rest.$get('/api/offense/ai/' + teamId).then(function(gamePlan) {
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
