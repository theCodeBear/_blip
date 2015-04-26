'use strict';

angular.module('blip')

.controller('mapViewCtrl', ['$scope', '$cordovaGeolocation', '$firebaseArray', function($scope, $cordovaGeolocation, $firebaseArray) {

  var ref = new Firebase('https://blipapp.firebaseio.com/blips');
  var blips = $firebaseArray(ref);

  $scope.typing = false;

  var lat, long, map;
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  var currentIcon = 'img/blue_dot.png';

  ref.on('value', function(snapshot) {
    console.log('snapshot', snapshot.val());
    var heatMapData = []
    for (var key in snapshot.val()) {
      heatMapData.push({location: new google.maps.LatLng(snapshot.val()[key].lat, snapshot.val()[key].long)})
    }
    heatMapData ? getHeatmap(heatMapData) : console.log('Oleee');
  });

  function getHeatmap(data) {
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: data
    });
    heatmap.setMap(null);
    heatmap.setMap(map);
  }

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
  });

  $scope.blip = function() {
    $scope.typing = true;
  }

  $scope.sendBlip = function(message) {
    var obj = {message: message, lat: lat, long: long, sponsor: false}
    blips.$add(obj).then(function(ref) {
      $scope.typing = false;
    });
  };

  function showMap(myLat, myLong) {
    var mapOptions = {
      zoom: 14,
      center: { lat: myLat, lng: myLong},
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    return map;
  }

}]);
