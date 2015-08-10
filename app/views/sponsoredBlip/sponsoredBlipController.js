'use strict';

angular.module('blip')

.controller('sponsoredBlipCtrl', function($scope, $cordovaGeolocation, $state) {

  var lat, long, map, marker;
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  var currentIcon = 'img/blue_dot.png';

  $cordovaGeolocation
  .getCurrentPosition(posOptions)
  .then(function (position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;

  });


  // when submit payment is called one thing that needs to happen is what is inside this function,
  // that is: if marker hasn't been changed then it just takes the current position.
  $scope.submitPayment = function(message) {
    if (!$scope.markerPosition) {
      $scope.markerPosition = { latitude: lat, longitude: long };
    }
    var hashTag = message.match(/#\w+/g)[0];
    console.log('marker position', $scope.markerPosition);
    console.log('message', message);
    var obj = {message: message, lat: $scope.markerPosition.latitude, long: $scope.markerPosition.longitude, sponsor: true, hashTag: hashTag };
  };

});
