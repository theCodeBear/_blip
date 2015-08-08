'use strict';

angular.module('blip')

.factory('GeolocationService', function($cordovaGeolocation, $state) {

  var _lat, _lon;

  var service = {
    init: init,
    getCoords: getCoords
  };

  return service;



  function init() {
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
      _lat = position.coords.latitude;
      _lon = position.coords.longitude;
      $state.go('app.mapView');
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
      _lat = position.coords.latitude
      _lon = position.coords.longitude
    });
    watch.clearWatch();
  }


  function getCoords() {
    return { lat: _lat, lon: _lon };
  }

});