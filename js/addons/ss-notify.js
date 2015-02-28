(function(angular) {
  var module = angular.module("ssNotify", []);

  var notifications = [ /* {message: string, type: string, clear: function } */ ];
  var pollingInterval = 250;
  var dimensions = {width: 300, height: 100}; // without padding
  var nextPlacement = { top: 51, right: 10 };

  module.directive('notifications', function($window) {
    return {
      restrict: 'A',
      controller: function($scope, $interval) {
        $scope.notifications = notifications;

        function updateNotifications() {
          var windowDimensions = { width: $window.innerWidth, height: $window.innerHeight };

          nextPlacement = { top: 51, right: 10 };
          angular.forEach($scope.notifications, function(notification) {
            if (notification.duration && !notification.ui.pause) { // remove expired ones first
              notification.ui.ttl -= pollingInterval;
              if (notification.ui.ttl <= 0) {
                notification.clear();
              }
              var percentage = (notification.ui.ttl / (notification.duration * 1000) * 100);
              notification.ui.percent = Math.round(percentage);
              notification.ui.degree = 360 / 100 * percentage;
            }

            notification.ui.top = nextPlacement.top;
            notification.ui.right = nextPlacement.right;

            nextPlacement.top += dimensions.height + 10;
            if (nextPlacement.top + dimensions.height > windowDimensions.height) {
              nextPlacement.top = 51;
              nextPlacement.right += dimensions.width + 10;
            }

          });
        }

        $interval(updateNotifications, pollingInterval);

        $scope.freeze = function(notification) {
          notification.ui.pause = true;
        };
        $scope.thaw = function(notification) {
          notification.ui.pause = false;
        };
      },
      template: '<div class="animate notify" ng-class="notification.type" ng-repeat="notification in notifications" ng-mouseenter="freeze(notification)" ng-mouseleave="thaw(notification)" ng-style="{top:notification.ui.top+\'px\', right:notification.ui.right+\'px\'}"><div class="notify-bar"><div class="timer" ng-click="notification.clear()" style="cursor: pointer;"><div class="percent"><i class="fa fa-times"></i></div><div class="slice" ng-class="{gt50: notification.ui.percent > 50}"><div class="pie" ng-style="{transform: \'rotate(\'+notification.ui.degree+\'deg)\',webkitTransform: \'rotate(\'+notification.ui.degree+\'deg)\',msTransform: \'rotate(\'+notification.ui.degree+\'deg)\',sandTransform: \'rotate(\'+notification.ui.degree+\'deg)\',oTransform: \'rotate(\'+notification.ui.degree+\'deg)\'}"></div><div class="pie fill" ng-if="notification.ui.percent > 50"></div></div></div></div><div class="notify-body"><div class="title">{{notification.title}}</div><div class="content" bind-html-unsafe="notification.message"></div></div></div>'
    };
  });

  module.service("NotifyService", ['$timeout', '$window', function($timeout, $window) {
    function addNotification(title, message, type, durationInSeconds, category) {
      var notification = {
        title: title,
        category: category,
        message: message,
        duration: durationInSeconds,
        type: type,
        ui: {top: nextPlacement.top, right: nextPlacement.right, pause: false, ttl: +durationInSeconds * 1000},
        clear: function() {
          var index = notifications.indexOf(notification);
          if (index != -1) {
            notifications.splice(index, 1);
          }
        }
      };
      notifications.splice(0, 0, notification);
      return notification;
    }

    var service = {
      info: function(title, message, duration) {
        return addNotification(title, message, 'info', (duration === undefined) ? 10 : +duration);
      },
      success: function(title, message, duration) {
        return addNotification(title, message, 'success', (duration === undefined) ? 10 : +duration);
      },
      warning: function(title, message, duration) {
        return addNotification(title, message, 'warning', (duration === undefined) ? 10 : +duration);
      },
      danger: function(title, message, duration) {
        return addNotification(title, message, 'danger', (duration === undefined) ? 10 : +duration);
      },
      clear: function(category) {
        for (var i in notifications) {
          if (notifications[i].category == category) {
            notifications.splice(i--, 1); // remove and move the index back one to not skip over anything
          }
        }
      },
      clearAll: function() {
        notifications.length = 0;
      }
    };
    return service;
  }]);
}(angular));
