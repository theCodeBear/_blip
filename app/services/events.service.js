'use strict';

angular.module('blip')

.factory('EventsService', function($rootScope, $state) {

/* private variables */
  var _titleDone = false,
      _gotCoords = false,
      _gotBlips = false;


/* private functions */
  var _openApp = function() {
    $state.go('app.mapView');
  };

/* the service */
  var service = {
    titleAnimationDone: titleAnimationDone,
    initializedCoordinates: initializedCoordinates,
    blipsRetrieved: blipsRetrieved
  };
  return service;


/* public service api */

  // handles when the title is done animating
  function titleAnimationDone() {
    $rootScope.$on('titleAnimationDone', function() {
      if (_gotCoords && _gotBlips) _openApp();
      else _titleDone = true;
    });
  }

  // handles when user's geolocation has been found on app start up
  function initializedCoordinates() {
    $rootScope.$on('initializedCoordinates', function() {
      if (_titleDone&& _gotBlips) _openApp();
      else _gotCoords = true;
    });
  }

  // handles when client has retrieved the blips from the API on app start up
  function blipsRetrieved() {
    $rootScope.$on('blipsRetrieved', function() {
      if (_titleDone && _gotCoords) _openApp();
      else _gotBlips = true;
    });
  }

});