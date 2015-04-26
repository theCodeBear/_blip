'use strict';

angular.module('blip')

.controller('splashScreenCtrl', ['$scope', '$state', function($scope, $state) {

  setTimeout(function() {
    $state.go('app.mapView');
  }, 4000);

}]);
