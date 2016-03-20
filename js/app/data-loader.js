(function(angular) {
  var module = angular.module('app.dataLoader', ['ngRoute', 'util.rest']);

  module.controller('DataLoaderCtrl', function($scope, $q, NotifyService, RestService) {
    var rest = new RestService("Data Loader");

    console.info("DataLoaderCtrl has been loaded");

    var form = $scope.form = {
      teamId: null,
      teamLoading: null,
      gameId: null,
      gameLoading: null,
    };

    $scope.loadTeam = function() {
      form.teamLoading = true;
      rest.$get('/api/team/' + form.teamId).then(function(team) {
        NotifyService.info("Team " + team._id, "<strong>" + team.name + "</strong> was successfully loaded");
      }).finally(function() {
        form.teamLoading = false;
      });
    };

    $scope.loadGame = function() {
      form.gameLoading = true;
      rest.$get('/api/game/' + form.gameId).then(function(game) {
        NotifyService.info("Game " + game._id, game.team.away.$id + " vs. " + game.team.home.$id + " was successfully loaded");
      }).finally(function() {
        form.gameLoading = false;
      });
    };
  });
}(angular));

