'use strict';

angular.module('blip')

.controller('mapViewCtrl', function($scope, $state, $ionicActionSheet, Socket, Blips, Coords) {

  $scope.blipping = false;

  var map;
  var downMouse;
  var geoLocate = Coords;
  var currentIcon = L.icon({
    iconUrl: 'img/blue_dot.png',
    iconSize: [20,20]
  });
  var southWest = L.latLng(-90,-180);
  var northEast = L.latLng(90,180);
  var bounds = L.latLngBounds(southWest, northEast);  // keeps screen from going off map


  var leafletHeatConfig = {
    radius: 0.0006,
    scaleRadius: true,
    maxOpacity: 0.8,
    useLocalExtrema: true,
    lngField: 'lon',
    latField: 'lat',
    valueField: 'count'
  };

  var heatmapLayer = new HeatmapOverlay(leafletHeatConfig);

  var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });


  map = L.map('map', {
    center: [geoLocate.lat, geoLocate.lon],
    zoom: 15,
    minZoom: 2,
    maxZoom: 17,
    zoomControl: false,
    maxBounds: bounds,
    //maxBoundsViscosity: 1.0,  <-- this is a feature of leaflet 1.0 that makes a hard stop against scrolling outside the map
    layers: [baseLayer, heatmapLayer]
  });

  // set the geolocation marker to user's current location
  L.marker([geoLocate.lat, geoLocate.lon]).setIcon(currentIcon).addTo(map);

  if (Blips.getForMap().data.length) heatmapLayer.setData(Blips.getForMap());

  $scope.blip = function() {
    $scope.blipping = true;
    angular.element('#blipActionSheet').animate({'bottom': '0em'}, 300);
  };

  $scope.sendBlip = function(message) {
    var count = 5;
    var hashtags = message.match(/#\w+/g);
    Socket.emit('user blip',
      {
        lat: geoLocate.lat,
        lon: geoLocate.lon,
        count: count,
        hashtags: hashtags,
        sponsored: false,
        message: message
      }
    );
    heatmapLayer.addData({lat: geoLocate.lat, lon: geoLocate.lon, count: count});
    $scope.blipping = false;
    angular.element('#blipActionSheet').animate({'bottom': '-16em'}, 300);
  };

  $scope.tweetBlip = function() {
    $scope.blipping = false;
    angular.element('#blipActionSheet').animate({'bottom': '-16em'}, 300);
  };


  function mouseDown(location) {
    console.log('mousedown', location);
    downMouse = location;
  }

  function mouseUp(location) {
    console.log('mouseup', location);
  }

  function doubleClick(location) {
    console.log('dblclick', location);
    $state.go('app.feed');
  }

  Socket.on('user connected', function() {
    console.log('i am connected');
  });

  Socket.on('blip added', function(blip) {
    heatmapLayer.addData({lat: blip.lat, lon: blip.lon, count: blip.count});
  });

});
