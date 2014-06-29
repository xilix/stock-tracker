define(
  [ 'require', 'angular', './app']
, function (require, angular) {
  'use strict';

  console.log('Bootstraping...');
  angular.bootstrap(document, ['appTracker']);
});
