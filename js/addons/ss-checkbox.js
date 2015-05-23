(function(angular) {
  var module = angular.module("ssCheckbox", []);

  module.directive('ssCheckbox', function() {
    return {
      restrict: 'A',
      transclude: true,
      scope: {
        model: '=',
        onClick: '&'
      },
      template: '<label class="form-control input-sm" style="border: 0px; cursor: pointer;"><i class="fa" ng-class="{\'text-success\': model, \'fa-circle-o\': !model, \'fa-check-circle-o\': model}"></i> <input ng-model="model" ng-change="onClick()" type="checkbox" style="visibility: hidden;"><span ng-transclude></span></label>'
    };
  });
}(angular));
