(function(angular) {
  angular.module("ssFlippable", []).directive('flippable', function() {
    return {
      restrict: 'A',
      scope: {
        flipped: '='
      },
      transclude: true,
      template: '<div class="flippable-mask"><div class="flippable-card" ng-class="{flipped: flipped}" ng-transclude></div></div>'
    };
  }).directive('flippableFront', function() {
    return {
      require: '^flippable',
      restrict: 'A',
      scope: {},
      compile: function compile(element, attrs, transclude) {
        element.addClass('face front');
      }
    };
  }).directive('flippableBack', function() {
    return {
      require: '^flippable',
      restrict: 'A',
      scope: {},
      compile: function compile(element, attrs, transclude) {
        element.addClass('face back');
      }
    };
  });
}(angular));
