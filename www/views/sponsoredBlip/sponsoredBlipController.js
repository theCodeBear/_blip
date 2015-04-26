'use strict';

angular.module('blip')

.controller('sponsoredBlipCtrl', ['$scope', '$cordovaGeolocation', function($scope, $cordovaGeolocation) {

  var lat, long;
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  $scope.currentIcon = 'img/blue_dot.png';
  $cordovaGeolocation
  .getCurrentPosition(posOptions)
  .then(function (position) {
    lat  = position.coords.latitude;
    long = position.coords.longitude;

    $scope.map = {
      center: {
        latitude: lat,
        longitude: long
      },
      zoom: 14
    }

    $scope.marker = {
      id: 1,
      coords: {
        latitude: lat,
        longitude: long
      },
      options: { draggable: true }
    };
  });

  $scope.options = { zoomControl: false, streetViewControl: false, mapTypeControl: false };

}]);
