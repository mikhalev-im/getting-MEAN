(function() {
  angular
    .module('loc8rApp')
    .filter('formatDistance', formatDistance);

  function _isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  function formatDistance() {
    return function(distance) {
      var numDistance, unit;
      if (distance && _isNumeric(distance)) {
        if (distance > 1000) {
          numDistance = (parseFloat(distance) / 1000).toFixed(1);
          unit = 'km';
        } else {
          numDistance = parseInt(distance);
          unit = 'm';
        }
        return numDistance + unit;
      } else {
        return '?';
      }
    };
  }
})();