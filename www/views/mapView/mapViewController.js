'use strict';

angular.module('blip')

.controller('mapViewCtrl', ['$scope', '$cordovaGeolocation', '$firebaseArray', '$rootScope', '$state', function($scope, $cordovaGeolocation, $firebaseArray, $rootScope, $state) {

  var ref = new Firebase('https://blipapp.firebaseio.com/blips');
  var blips = $firebaseArray(ref);
  $rootScope.blips = blips;

  // $rootScope.stateView = 'app.mapView';

  $scope.typing = false;

  var lat, long, map;
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  var currentIcon = 'img/blue_dot.png';
  var downMouse;

  ref.on('child_added', function(snapshot) {
    var current = new Date().getTime();
    if (snapshot.val().time < current - 10800000 && !snapshot.val().sponsor) {
      console.log('delete');
      removeBlip(snapshot.key());
    } else {
      console.log('no delete');
      var heatMapData = []
      heatMapData.push({location: new google.maps.LatLng(snapshot.val().lat, snapshot.val().long)})
      heatMapData ? getHeatmap(heatMapData) : console.log('Oleee');
    // }
  });

  function getHeatmap(data) {
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: data
    });
    // heatmap.set('radius', 20);
    heatmap.setMap(null);
    heatmap.setMap(map);
  }

  function removeBlip(key) {
    ref.child(key).remove();
  }

  $cordovaGeolocation
  .getCurrentPosition(posOptions)
  .then(function (position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    google.maps.event.addDomListener(window, 'load', showMap(lat,long))

    var currentPos = new google.maps.Marker({
      position: { lat: lat, lng: long },
      map: map,
      icon: currentIcon
    });

    // google.maps.event.addListener(map, 'mousedown', function(event) {
    //   mouseDown(event.latLng);
    // });

    // google.maps.event.addListener(map, 'mouseup', function(event) {
    //   mouseUp(event.latLng);
    // });

    google.maps.event.addListener(map, 'dblclick', function(event) {
      doubleClick(event.latLng);
    });
  });

  $scope.blip = function() {
    $scope.typing = true;
  }

  $scope.sendBlip = function(message) {
    // var hashTags = message.match(/#\w+/g);
    var obj = {message: message, lat: lat, long: long, sponsor: false, time: Firebase.ServerValue.TIMESTAMP }
    blips.$add(obj).then(function(ref) {
      $scope.typing = false;
    });
  };

  function showMap(myLat, myLong) {
    var mapOptions = {
      zoom: 14,
      center: { lat: myLat, lng: myLong},
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      disableDoubleClickZoom: true
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions)
    return map;
  }

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
      long = position.coords.longitude
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
