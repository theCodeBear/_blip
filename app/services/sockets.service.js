'use strict';

angular.module('blip')

.factory('Socket', function(socketFactory) {

  return socketFactory({
    ioSocket: io.connect('http://192.168.1.123:3000')
  });

});