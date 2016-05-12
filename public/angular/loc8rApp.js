(function(){

  angular.module('loc8rApp', []);

  angular
    .module('loc8rApp')
    .controller('locationList', ['$scope', 'loc8rData', 'geolocation', locationListCtrl])
    .filter('formatDistance', [formatDistance])
    .directive('ratingStars', [ratingStars])
    .service('loc8rData', ['$http', loc8rData])
    .service('geolocation', [geolocation]);

  function locationListCtrl($scope, loc8rData, geolocation) {
    $scope.message = "Checking your location";

    $scope.getData = function(position) {
      var lat = position.coords.latitude,
          lng = position.coords.longitude;

      $scope.message = "Searching for nearby places";
      loc8rData.locationByCoords(lat, lng)
        .success(function(data) {
          $scope.message = data.length > 0 ? "" : "No locations found";
          $scope.data = { locations: data };
        })
        .error(function(e) {
          $scope.message = "Sorry, something's gone wrong";
        });
    };

    $scope.showError = function(error) {
      $scope.$apply(function() {
        $scope.message = error.message;
      });
    };

    $scope.noGeo = function() {
      $scope.$apply(function() {
        $scope.message = "Geolocation not supported by this browser";
      });
    };

    geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
  };

  function _isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  function formatDistance() {
    return function(distance) {
      var numDistance, unit;
      if (distance && _isNumeric(distance)) {
        if (distance > 1) {
          numDistance = parseFloat(distance).toFixed(1);
          unit = 'km';
        } else {
          numDistance = parseInt(distance * 1000, 10);
          unit = 'm';
        }
        return numDistance + unit;
      } else {
        return '?';
      }
    }
  }

  function ratingStars() {
    return {
      scope: {
        thisRating: '=rating'
      },
      templateUrl: "/angular/rating-stars.html"
    }
  }

  function loc8rData($http) {
    function locationByCoords(lat, lng) {
      return $http.get('/api/locations?lng=' + lng + '&lat='+ lat + '&maxDistance=20');
    };
    return {
      locationByCoords: locationByCoords
    };
  }

  function geolocation() {
    function getPosition(cbSuccess, cbError, cbNoGeo) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
      } else {
        cbNoGeo();
      }
    };
    return {
      getPosition: getPosition
    };
  }

})();