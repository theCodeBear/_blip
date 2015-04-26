'use strict';

angular.module('blip')

.controller('sponsoredBlipCtrl', ['$scope', '$cordovaGeolocation', function($scope, $cordovaGeolocation) {

  var lat, long, map, marker;
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  var currentIcon = 'img/blue_dot.png';
  $cordovaGeolocation
  .getCurrentPosition(posOptions)
  .then(function (position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    map = showMap(lat,long);

    var currentPos = new google.maps.Marker({
      position: { lat: lat, lng: long },
      map: map,
      icon: currentIcon
    });

    marker = new google.maps.Marker({
      position: { lat: lat, lng: long },
      map: map
    });

    google.maps.event.addListener(map, 'click', function(event) {
      placeMarker(event.latLng);
    });
  });

  function showMap(myLat, myLong) {
    var mapOptions = {
      zoom: 14,
      center: { lat: myLat, lng: myLong},
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById('sponsorMap'), mapOptions);
    return map;
  }

  function placeMarker(location) {
    marker.setMap(null);
    marker = new google.maps.Marker({ position: location });
    marker.setMap(map);
    $scope.markerPosition = { latitude: location.k, longitude: location.D };
  };

  // when submit payment is called one thing that needs to happen is what is inside this function,
  // that is: if marker hasn't been changed then it just takes the current position.
  $scope.submitPayment = function() {
    if (!scope.markerPosition) {
      $scope.markerPosition = { latitude: lat, longitude: long };
    }
  }

}]);
