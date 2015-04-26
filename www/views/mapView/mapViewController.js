'use strict';

angular.module('blip')

.controller('mapViewCtrl', ['$scope', '$cordovaGeolocation', '$firebaseArray', function($scope, $cordovaGeolocation, $firebaseArray) {

  var ref = new Firebase('https://blipapp.firebaseio.com/blips');
  var blips = $firebaseArray(ref);
  var blipArray = [];

  $scope.typing = false;

  var lat, long, map;
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  var currentIcon = 'img/blue_dot.png';
  var heatMapData = [];

  $cordovaGeolocation
  .getCurrentPosition(posOptions)
  .then(function (position) {
    // lat  = position.coords.latitude;
    // long = position.coords.longitude;
    // console.log(JSON.stringify(lat));
    // console.log(JSON.stringify(long));

    // $scope.map = {
    //   center: {
    //     latitude: lat,
    //     longitude: long
    //   },
    //   zoom: 14
    // }

    // $scope.marker = {
    //   id: 0,
    //   coords: {
    //     latitude: lat,
    //     longitude: long
    //   },
    //   options: { draggable: false }
    // };

    lat = position.coords.latitude;
    long = position.coords.longitude;
    map = showMap(lat,long);

    var currentPos = new google.maps.Marker({
      position: { lat: lat, lng: long },
      map: map,
      icon: currentIcon
    });

    blips.$loaded().then(function() {
      blips.forEach(function(e) {
        blipArray.push({ location: new google.maps.LatLng(e.lat, e.long) });
      });
    });

    // blipArray.push({ location: new google.maps.LatLng(37.78, -122.4)});
    // blipArray.push({ location: new google.maps.LatLng(37.79, -122.4)});
    console.log(blipArray);
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: blipArray
    });
    heatmap.setMap(map);


  })
  .then(function(err) {
    console.log(JSON.stringify(err));
  });

  // $scope.options = { zoomControl: false, streetViewControl: false, mapTypeControl: false };

  $scope.blip = function() {
    $scope.typing = true;
  }

  $scope.sendBlip = function(message) {
    var obj = {message: message, lat: lat, long: long}
    blips.$add(obj).then(function(ref) {
      $scope.typing = false;
      blips.$loaded().then(function() {
        // blipArray = [];
        // console.log(blips);
        // blips.forEach(function(e) {
          // console.log(e.lat, e.long, e.message);
          // blipArray.push({ location: new google.maps.LatLng(e.lat, e.long) });
        // });
        
        return map;
      });
    });
  };

  // var heatMapData = [
  //   { location: new google.maps.LatLng(37.78, -122.4)},
  //   { location: new google.maps.LatLng(37.79, -122.4)}
  // ];

  function showMap(myLat, myLong) {
    var mapOptions = {
      zoom: 14,
      center: { lat: myLat, lng: myLong},
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
    // var heatmap = new google.maps.visualization.HeatmapLayer({
    //   data: heatMapData
    // });
    console.log('blipArray in showmap', blipArray);
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // heatmap.setMap(map);
    return map;
  }

}]);
