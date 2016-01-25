(function(angular) {
  var module = angular.module("ssTile", []);

  module.directive('tileable', function($timeout) {
    return {
      require: '?ngModel',
      link: function postLink(scope, element, attrs) {
        var pk = null;

        function init() {
          $timeout(function() {
            if (pk) {
              pk = null;
              element.packery('destroy');
            }
            pk = element.packery({
              itemSelector: '.tile',
              columnWidth: 20,
              rowHeight: 20,
              gutter: 10
            });
          }, 0);
        }

        scope.$watch(attrs.ngModel, init, true);

        scope.$on('destroy', function() {
          element.packery('destroy');
          pk = null;
        });
      }
    };
  });

  module.directive("tile", function() {
    return {
      restrict: 'A',
      transclude: true,
      replace: true,
      scope: {
        heading: '@',
        type: '@'
      },
      templateUrl: 'template/tile.html',
      controller: function() {
        this.setHeading = function(element) {
          this.heading = element;
        }
      },
      link: function(scope, element) {
        scope.$watch('type', function(newValue) {
          scope.panelType = newValue || 'panel-default';
        });
        if (!element.hasClass('tilew1') && !element.hasClass('tilew2')) {
          element.addClass('tilew1');
        }
        if (!element.hasClass('tileh1') && !element.hasClass('tileh2')) {
          element.addClass('tileh1');
        }
      }
    };
  });

  module.directive('tileHeading', function() {
    return {
      restrict: 'A',
      transclude: true,
      template: '',
      replace: true,
      require: '^tile',
      link: function(scope, element, attr, tileCtrl, transclude) {
        tileCtrl.setHeading(transclude(scope, function() {
        }));
      }
    }
  });

  module.directive('tileHeaderTransclude', function() {
    return {
      require: '^tile',
      restrict: 'A',
      link: function(scope, element, attribute, controller) {
        scope.$watch(function() {
          return controller[attribute.tileHeaderTransclude];
        }, function(heading) {
          if (heading) {
            element.html('');
            element.append(heading);
          }
        })
      }
    }
  });

  module.run(function($templateCache) {
    $templateCache.put("template/tile.html",
      "<div class='panel tile' ng-class='panelType'>" +
      " <div class='panel-heading'>" +
      "  <h2 class='panel-title text-center' tile-header-transclude='heading'><strong>{{heading}}</strong></h2>" +
      " </div>" +
      " <div class='panel-body' ng-transclude></div>" +
      "</div>"
    );
  });
}(angular));

