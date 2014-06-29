require.config({
  baseUrl: 'app',
  paths: {
    settings:  'configs/settings',
    angular:  'vendors/angular/angular',
    ngRoute:  'vendors/angular-route/angular-route',
    d3:  'vendors/d3/d3',
  },
  shim: {
    angular: {
      exports: 'angular',
    },
    ngRoute: {
      deps: ['angular'],
      exports: 'ngRoute',
    },
    d3: {
      exports: 'd3',
    },
  },
  waitSeconds: 10,
});


require(['angular', './bootstrap'], function () {
  console.log("ready!");
});
