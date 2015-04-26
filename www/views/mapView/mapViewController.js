'use strict';

angular.module('blip')

.controller('mapViewCtrl', ['$scope', '$cordovaGeolocation', function($scope, $cordovaGeolocation) {
  var lat, long;
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation
  .getCurrentPosition(posOptions)
  .then(function (position) {
    lat  = position.coords.latitude;
    long = position.coords.longitude;
    console.log(JSON.stringify(lat));
    console.log(JSON.stringify(long));

    $scope.map = {
      center: {
        latitude: lat,
        longitude: long
      },
      zoom: 14
    }
  })
  .then(function(err) {
    console.log(JSON.stringify(err));
  });

  $scope.options = { zoomControl: false, streetViewControl: false, mapTypeControl: false };

}]);
