'use strict';

angular.module('blip')

.controller('mapViewCtrl', function($scope, $state, $ionicActionSheet, Socket, Blips, Coords) {

  $scope.blipping = false;

  var map;
  var downMouse;
  $scope.charLimit = 140;
  $scope.charactersLeft = $scope.charLimit;
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

  $scope.calcCharsLeft = function(message) {
    $scope.charactersLeft = $scope.charLimit - message.length;
    if ($scope.charactersLeft === 0) {
      angular.element('#characterCount').css('color', 'red');
    } else if ($scope.charactersLeft === 1) {
      angular.element('#characterCount').css('color', 'gray');
    }
  };

  $scope.blip = function(event) {
    // $scope.blipping = true;
    angular.element('#btn-blip')
    .animate({'height':'90px', 'width': '90px', 'margin-top': '-=10px'}, 100)
    .animate({'height': '0px', 'width': '0px', 'margin-top': '+=45px'}, 150,
      function() {
        angular.element('#btn-blip').css({'display': 'none'});
        angular.element('#blipActionSheet').animate({'bottom': '0em'}, 300);
      }
    );
    angular.element('#map, ion-header-bar').on('click', function() {
      $scope.closeBlip();
    });
  };

  $scope.cancelBlip = function(event) {
    $scope.closeBlip(event);
  };

  $scope.closeBlip = function(event) {
    if (!event) var event = {currentTarget: angular.element('#cancelBlip')};
    $scope.blipping = false;
    angular.element(event.currentTarget).animate({'font-size': '0em'}, 200,
      function() {
        angular.element('#blipActionSheet').animate({'bottom': '-30em'}, 300,
          function() {
            angular.element('#btn-blip').css({'display': 'initial'});
            angular.element('#btn-blip')
            .animate({'height':'90px', 'width': '90px', 'margin-top': '-=45px'}, 100)
            .animate({'height': '70px', 'width': '70px', 'margin-top': '+=10px'}, 100);
            angular.element('#blipMessage').val('');
            $scope.message = '';
            angular.element('#map, ion-header-bar').off('click');
            angular.element(event.currentTarget).css('font-size', '4em');
            $scope.charactersLeft = $scope.charLimit;
          }
        );
      }
    );
  };

  $scope.sendBlip = function(event, message) {
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
    $scope.closeBlip(event);
  };

  $scope.tweetBlip = function(event, message) {
    // send tweet

    // $scope.sendBlip(event, message);
    $scope.closeBlip(event);
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
