(function() {
  angular.module('loc8rApp', ['ngRoute']);

  angular
    .module('loc8rApp')
    .config(['$routeProvider', config]);
  
  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
  }
  
})();