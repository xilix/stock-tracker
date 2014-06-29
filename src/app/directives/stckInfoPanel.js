define(
  ['./module', 'd3', 'settings']
, function (module, d3, settings) {
  "use strict";

  module.directive('stckInfoPanel', function () {
    return {
      restrict: 'E',
      scope: {
        stock: '=stockinfo',
      },
      templateUrl: 'app/templates/info-panel.html',
      link: function (scope, element, attr) {
        scope.$watch('stock.variation', function () {
          scope.increase = false;
          if (scope.stock.variation > settings.tracker.treshold) {
            scope.increase = true;
          }

          scope.decrease = false;
          if (scope.stock.variation < settings.tracker.treshold) {
            scope.decrease = true;
          }
        }, true);
      },
    };
  });
});
