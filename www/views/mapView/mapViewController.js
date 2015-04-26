'use strict';

angular.module('blip')

.controller('mapViewCtrl', ['$scope', '$cordovaGeolocation', '$firebaseArray', function($scope, $cordovaGeolocation, $firebaseArray) {

  var ref = new Firebase('https://blipapp.firebaseio.com/blips');
  var blips = $firebaseArray(ref);

  $scope.typing = false;

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

  $scope.blip = function() {
    $scope.typing = true;
  }

  $scope.sendBlip = function(message) {
    var obj = {message: message, lat: lat, long: long}
    blips.$add(obj).then(function(ref) {
      $scope.typing = false;
    });
  }

}]);
