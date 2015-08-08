'use strict';

angular.module('blip')

.factory('EventsService', function($rootScope, $state) {

// private variables
  var _titleDone = false,
      _gotCoords = false;


// private functions
  var _openApp = function() {
    $state.go('app.mapView');
  };


  var service = {
    titleAnimationDone: titleAnimationDone,
    initializedCoordinates: initializedCoordinates,
  };

  return service;


// public service api
  function titleAnimationDone() {
    $rootScope.$on('titleAnimationDone', function() {
      if (_gotCoords) _openApp();
      else _titleDone = true;
    });
  }

  function initializedCoordinates() {
    $rootScope.$on('initializedCoordinates', function() {
      if (_titleDone) _openApp();
      else _gotCoords = true;
    });
  }

});