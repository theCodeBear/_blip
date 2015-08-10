'use strict';

angular.module('blip')

.factory('Blips', function($http, $rootScope) {

/* private variables */
  var _blips = [];
  var _blipsForMap = { data: [] };


/* private functions */

  // save blips to this service
  var _store = function(blips) {
    _blips = blips;
  };

  // cuts blips down to the format needed to put in the heatmap, save in service
  var _transformForMap = function(blips) {
    blips.forEach(function(blip) {
      _blipsForMap.data.push({lat: blip.lat, lon: blip.lon, count: blip.count});
    });
  };


/* the service */
  var service = {
    getFromDB: getFromDB,
    get: get,
    getForMap: getForMap
  };
  return service;


/* public service api */

  // gets all blips from database, emits event for the EventService
  function getFromDB() {
    $http.get('http://192.168.1.123:3000/blip').then(function(blips) {
      if (blips.data) {
        _store(blips.data);
        _transformForMap(blips.data);
      }
      $rootScope.$emit('blipsRetrieved');
    });
  }

  // returns full blips data
  function get() {
    return _blips;
  }

  // returns blips for display on map (coords and count only)
  function getForMap() {
    return _blipsForMap;
  }


});