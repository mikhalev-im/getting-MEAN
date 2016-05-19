(function() {
  angular.module('loc8rApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

  angular
    .module('loc8rApp')
    .config(['$routeProvider', '$locationProvider', config]);
  
  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: '/about/about.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'
      })
      .when('/location/:locationid', {
        templateUrl: '/locationDetail/locationDetail.view.html',
        controller: 'locationDetailCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
  }
  
})();