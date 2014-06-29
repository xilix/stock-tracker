define([
  'angular',
  'ngRoute',
  './controllers/index',
  './directives/index',
  './services/index'
], function (angular) {
  'use strict';
  
  return angular.module('appTracker', [
    'ngRoute',
    'app.services',
    'app.controllers',
    'app.directives'
  ]);
});
