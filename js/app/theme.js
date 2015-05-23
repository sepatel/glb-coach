(function(angular) {
  var module = angular.module('app.theme', ['ssNotify']);

  module.controller('ThemeCtrl', function($scope, NotifyService) {
    $scope.addNotify = function() {
      switch (Math.floor(Math.random() * 4)) {
        case 0:
          NotifyService.info('Informational', "This message is a very <b>big</b> and long <a href='javascript:alert(\"Doh!\")'>message</a> that should wrap if I am lucky and such with long thing");
          break;
        case 1:
          NotifyService.success('Success', "This message is a very <b>big</b> and long message that should wrap if I am lucky and such with aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa long thing");
          break;
        case 2:
          NotifyService.warning('Warning', "This message is a very <b>big</b> and long message that should wrap if I am lucky and such with aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa long thing");
          break;
        case 3:
          NotifyService.danger('Danger', "This message is a very <b>big</b> and long message that should wrap if I am lucky and such with aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa long thing");
          break;
      }
    }
  });
}(angular));

