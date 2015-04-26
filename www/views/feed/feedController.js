'use strict';

angular.module('blip')

.controller('feedCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

  $scope.blips = $rootScope.blips;

  $scope.isSponsor = function(sponsored) {
    if (sponsored) {
      return {'color': 'rgb(0,255,0)', 'background-color': 'rgb(0,0,0)'}
    }
    return;
  };

}]);
