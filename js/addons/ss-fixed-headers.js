(function(angular) {
  angular.module("ssFixedHeaders", []).directive("fixedHeaders", ['$timeout', '$window', function($timeout, $window) {
    return {
      restrict: 'EA',
      replace: false,
      scope: {
        rows: '=watch'
      },
      transclude: true,
      template: '<div><div class="fixedHeaderContainer"><div class="fixedHeader" style="white-space: nowrap; z-index: 1; overflow: hidden; position: absolute;"></div></div> <div ng-transclude></div></div>',
      link: function(scope, elem, attr, ctrl) {
        // TODO: Left and Top should be dynamic. top is whatever the top of the thead is. left is depending on the scroll amount?
        var table = elem.find("table").one();
        var thead = table.find("thead").one();
        var tr = thead.find("tr").one();
        var fixedContainer = elem.find(".fixedHeaderContainer");

        var headerDiv = elem.find("div.fixedHeader").one();
        var positionOffset = null;

        elem.parent().on('scroll', function() {
          headerDiv.scrollLeft($(this).scrollLeft());
          //headerDiv.css('top', positionOffset.top);
        });

        function initialize(oldValue, newValue, scope) {
          $timeout(function() {
            thead.height(thead.outerHeight());

            headerDiv.empty();
            headerDiv.height(thead.innerHeight());
            headerDiv.width(fixedContainer.width());
            headerDiv.css('background-color', tr.css('background-color'));

            if (positionOffset == null) {
              positionOffset = thead.position();
              console.info("Reset the top to ", positionOffset);
              headerDiv.scrollLeft($(this).scrollLeft());
              headerDiv.css('top', positionOffset.top);
            }

            // wrap the the contents of th for ease of use
            tr.find("th").filter(":not(span.fixedHeaderWrapping)").each(function(index, th) {
              th = angular.element(th);
              if (th.find("span.fixedHeaderWrapping").length == 0) {
                th.wrapInner('<span class="fixedHeaderWrapping">');
              }
            });

            tr.find("th").each(function(index, th) {
              th = angular.element(th);
              var wrapping = th.find("span.fixedHeaderWrapping").one();
              var span = wrapping.clone(true);
              span.width(th.outerWidth()).height(th.outerHeight()).css('display', 'inline-block').css('white-space', th.css('white-space'));
              angular.forEach(['top', 'bottom', 'left', 'right'], function(direction) {
                span.css('padding-' + direction, th.css('padding-' + direction));
                span.css('margin-' + direction, th.css('margin-' + direction));
                span.css('border-' + direction, th.css('border-' + direction));
              });
              headerDiv.append(span);
            });
          });
        }

        angular.element($window).bind('resize', initialize);

        if (attr.watch) { // don't watch if not set
          scope.$watch('rows', initialize, true);
        }
      }
    }
  }]);
}(angular));

