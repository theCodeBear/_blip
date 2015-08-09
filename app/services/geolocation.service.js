'use strict';

angular.module('blip')

.factory('GeolocationService', function($cordovaGeolocation, $state, $rootScope) {

/* private variables */
  var _lat, _lon;


/* the service */
  var service = {
    init: init,
    getCoords: getCoords
  };
  return service;


/* public service api */

  // initialize geolocation
  function init() {
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
      _lat = position.coords.latitude;
      _lon = position.coords.longitude;
      $rootScope.$emit('initializedCoordinates');
    });

    var watchOptions = {
      frequency : 1000,
      timeout : 10000,
      enableHighAccuracy: false // may cause errors if true
    };
    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(null, function(err) {
        // error
    }, function(position) {
      _lat = position.coords.latitude;
      _lon = position.coords.longitude;
    });
    watch.clearWatch();
  }

  // get user's coordinates, as stored from geolocation
  function getCoords() {
    return { lat: _lat, lon: _lon };
  }

});