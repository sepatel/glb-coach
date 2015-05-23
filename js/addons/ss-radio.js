(function(angular) {
  var module = angular.module("ssRadio", []);

  module.directive('ssRadio', function() {
    return {
      restrict: 'A',
      transclude: true,
      scope: {
        model: '=',
        value: '=',
        onClick: '&'
      },
      template: '<label class="ss-radio" ng-model="model" btn-radio="value" ng-change="onClick()" ng-class="{\'active\': model == value}"><span ng-transclude></span></label>'
    };
  });
}(angular));
