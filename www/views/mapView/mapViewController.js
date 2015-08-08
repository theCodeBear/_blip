'use strict';

angular.module('blip')

.controller('mapViewCtrl', ['$scope', '$state', 'Coords', function($scope, $state, Coords) {

  $scope.typing = false;

  var map;
  var downMouse;
  var geoLocate = Coords;
  var currentIcon = L.icon({
    iconUrl: 'img/blue_dot.png',
    iconSize: [20,20]
  });
  var mapBound1 = L.latLng(-90,-180);
  var mapBound2 = L.latLng(90,180);
  var bounds = L.latLngBounds(mapBound1, mapBound2);


  var testData = {
    data: [
      { lat: 33.686770, lon: -117.879721, count: 1 },
      { lat: 33.685570, lon: -117.879741, count: 8 }
    ]
  };

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

  heatmapLayer.setData(testData);


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

}]);
