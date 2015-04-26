'use strict';

angular.module('blip')

.controller('mapViewCtrl', ['$scope', '$cordovaGeolocation', function($scope, $cordovaGeolocation) {
  var lat, long;
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  $scope.currentIcon = 'img/blue_dot.png';
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

    $scope.marker = {
      id: 0,
      coords: {
        latitude: lat,
        longitude: long
      },
      options: { draggable: false }
    };
  })
  .then(function(err) {
    console.log(JSON.stringify(err));
  });

  $scope.options = { zoomControl: false, streetViewControl: false, mapTypeControl: false };

}]);
