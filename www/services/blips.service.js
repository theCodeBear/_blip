'use strict';

angular.module('blip')

.factory('Blips', function($http) {

/* private variables */
  var _blips;


/* private functions */
  var _store = function(blips) {
    _blips = blips;
  }


/* the service */
  var service = {
    get: get
  };
  return service;


/* public service api */

  function get() {
    return $http.get('http://192.168.1.123:3000/blip');
  }


});