define(
  ['./module', 'd3', 'settings']
, function (module, d3, settings) {
  "use strict";


  module.controller(
    'CtrlStockTracker', 
    ['$scope', '$interval', '$timeout', 'stockManager'
  , function ($scope, $interval, $timeout, stockManager) {

    var runningId;

    function setIndexsFromSettings(scope) {
      var i = 0, iMax = settings.miner.length;

      for (i = 0; i < iMax; i += 1) {
        scope.stocks = stockManager.add(scope.stocks, settings.miner[i].nom);
      };

      return scope.stocks;
    }

    $scope.stocks = [];

    $scope.stocks = setIndexsFromSettings($scope.stocks);
    $scope.frecuency = settings.tracker.frecuency;

    runningId = $interval(
      function () {
        $timeout(function () {
          $scope.stocks= stockManager.refresh($scope.stocks);
          $scope.$apply();
        });
      },
      $scope.frecuency
    );
  }]);
});
