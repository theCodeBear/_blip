'use strict';

angular.module('blip')

.controller('mapViewCtrl', ['$scope', function($scope) {
  $scope.getLocation = function(){

    //Get the users location and update the map properties
    if(navigator.geolocation){
	    navigator.geolocation.getCurrentPosition(function(position){
          $scope.map.center.latitude = position.coords.latitude;
          $scope.map.center.longitude = position.coords.longitude;
      	});
     }else{
     	alert('Geolocation not supported by this browser.');
     }
  };

  $scope.map = {
    center: {
      latitude: 45,
      longitude: -73
    },
    zoom: 14
  }

  $scope.options = { zoomControl: false, streetViewControl: false, mapTypeControl: false };

}]);
