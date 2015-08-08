'use strict';

angular.module('blip')

.controller('mapViewCtrl', ['$scope', '$cordovaGeolocation', '$rootScope', '$state', '$http', 'Coords', function($scope, $cordovaGeolocation, $rootScope, $state, $http, Coords) {

  $scope.typing = false;

  var map;
  var currentIcon = 'img/blue_dot.png';
  var downMouse;
  var geoLocate = Coords;
  

/*  function getHeatmap(data) {
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: data
    });
    // heatmap.set('radius', 20);
    heatmap.setMap(null);
    heatmap.setMap(map);
  }*/


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
    zoomControl: false,
    layers: [baseLayer, heatmapLayer]
  });

  heatmapLayer.setData(testData);

/*    google.maps.event.addDomListener(window, 'load', showMap(lat,lon))

    var currentPos = new google.maps.Marker({
      position: { lat: lat, lng: lon },
      map: map,
      icon: currentIcon
    });

    google.maps.event.addListener(map, 'mousedown', function(event) {
      mouseDown(event.latLng);
    });

    google.maps.event.addListener(map, 'mouseup', function(event) {
      mouseUp(event.latLng);
    });

    google.maps.event.addListener(map, 'dblclick', function(event) {
      doubleClick(event.latLng);
    });*/

  $scope.blip = function() {
    $scope.typing = true;
  }

  $scope.sendBlip = function(message) {
    // $http.post('http://192.168.1.123:3000/blip', { message: message, lat: lat, lon: lon })
    // .then(function(response) {
    //   console.log(response);
    // });
  };

/*  function showMap(myLat, myLong) {
    var mapOptions = {
      zoom: 14,
      center: { lat: myLat, lng: myLong},
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      disableDoubleClickZoom: true
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions)
    return map;
  }*/

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
