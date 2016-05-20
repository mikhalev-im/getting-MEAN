(function() {
  angular
    .module('loc8rApp')
    .service('authentication', ['$window', '$http', authentication]);

  authentication.$inject = ['$window', '$http'];

  function authentication($window, $http) {
    var saveToken = function(token) {
      $window.localStorage['loc8r-token'] = token;
    };

    var getToken = function() {
      return $window.localStorage['loc8r-token'];
    };

    var register = function(user) {
      return $http.post('/api/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    var login = function(user) {
      return $http.post('/api/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    var logout = function(user) {
      $window.localStorage.removeItem('loc8r-token');
    }

    return {
      saveToken: saveToken,
      getToken: getToken,
      register: register,
      login: login,
      logout: logout
    };
  }
})();