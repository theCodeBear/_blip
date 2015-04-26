'use strict';

angular.module('blip')

.controller('mapViewCtrl', ['$ionicPlatform', '$scope', '$cordovaGeolocation', '$firebaseArray', function($ionicPlatform, $scope, $cordovaGeolocation, $firebaseArray) {
    var ref = new Firebase('https://blipapp.firebaseio.com/blips');
    var blips = $firebaseArray(ref);

    $scope.typing = false;

    var lat, long, map;
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    var currentIcon = 'img/blue_dot.png';

    ref.on('child_added', function(snapshot) {
      // var current = new Date().getTime();
      // console.log(current - 60000);
      // if (snapshot.val().time < current - 60000) {
      //   console.log('delete');
      //   removeBlip(snapshot.key());
      // } else {
      //   console.log('no delete');
        var heatMapData = []
        heatMapData.push({location: new google.maps.LatLng(snapshot.val().lat, snapshot.val().long)})
        heatMapData ? getHeatmap(heatMapData) : console.log('Oleee');
      // }
    });

    function getHeatmap(data) {
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: data
      });
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
    });

    $scope.blip = function() {
      $scope.typing = true;
    }

    $scope.sendBlip = function(message) {
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
        disableDefaultUI: true
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

}]);
