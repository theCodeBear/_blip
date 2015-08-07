'use strict';

angular.module('blip')

.controller('mapViewCtrl', ['$scope', '$cordovaGeolocation', '$rootScope', '$state', '$http', function($scope, $cordovaGeolocation, $rootScope, $state, $http) {

  // var ref = new Firebase('https://blipapp.firebaseio.com/blips');
  // var blips = $firebaseArray(ref);
  // $rootScope.blips = blips;

  $scope.typing = false;

  var lat, lon, map;
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  var currentIcon = 'img/blue_dot.png';
  var downMouse;

  

  // function getHeatmap(data) {
  //   var heatmap = new google.maps.visualization.HeatmapLayer({
  //     data: data
  //   });
  //   // heatmap.set('radius', 20);
  //   heatmap.setMap(null);
  //   heatmap.setMap(map);
  // }


  $cordovaGeolocation
  .getCurrentPosition(posOptions)
  .then(function (position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    map = L.map('map', {
      center: [lat, lon],
      zoom: 14,
      zoomControl: false
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map); 

    // google.maps.event.addDomListener(window, 'load', showMap(lat,lon))

    // var currentPos = new google.maps.Marker({
    //   position: { lat: lat, lng: lon },
    //   map: map,
    //   icon: currentIcon
    // });

    // google.maps.event.addListener(map, 'mousedown', function(event) {
    //   mouseDown(event.latLng);
    // });

    // google.maps.event.addListener(map, 'mouseup', function(event) {
    //   mouseUp(event.latLng);
    // });

    // google.maps.event.addListener(map, 'dblclick', function(event) {
    //   doubleClick(event.latLng);
    // });
  });

  $scope.blip = function() {
    $scope.typing = true;
  }

  $scope.sendBlip = function(message) {
    $http.post('http://192.168.1.123:3000/blip', { message: message, lat: lat, lon: lon })
    .then(function(response) {
      console.log(response);
    });
  };

  // function showMap(myLat, myLong) {
  //   var mapOptions = {
  //     zoom: 14,
  //     center: { lat: myLat, lng: myLong},
  //     mapTypeId: google.maps.MapTypeId.ROADMAP,
  //     disableDefaultUI: true,
  //     disableDoubleClickZoom: true
  //   };
  //   map = new google.maps.Map(document.getElementById('map'), mapOptions)
  //   return map;
  // }

  var watchOptions = {
    frequency : 1000,
    timeout : 10000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      console.log(position);
      lat  = position.coords.latitude
      lon = position.coords.longitude
    }
  );

  watch.clearWatch();

  // function mouseDown(location) {
  //   console.log('mousedown', location);
  //   downMouse = location;
  // }

  // function mouseUp(location) {
  //   console.log('mouseup', location);
  // }

  function doubleClick(location) {
    console.log('dblclick', location);
    $state.go('app.feed');
  }

}]);
