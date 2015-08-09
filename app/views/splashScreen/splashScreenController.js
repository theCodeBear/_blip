'use strict';

angular.module('blip')

.controller('splashScreenCtrl', function($timeout, $rootScope) {

  var sWid = screen.width;
  var canvasDomElement = angular.element('.heatmap-canvas')[0];
  var config = {
    container: canvasDomElement,
    radius: 9,
  };

  var data = [
    { x: sWid/2-42, y: 15, value: 1 },
    { x: sWid/2-42, y: 17, value: 1 },
    { x: sWid/2-42, y: 20, value: 1 },
    { x: sWid/2-42, y: 22, value: 1 },
    { x: sWid/2-42, y: 25, value: 1 },
    { x: sWid/2-42, y: 27, value: 1 },
    { x: sWid/2-42, y: 30, value: 1 },
    { x: sWid/2-42, y: 32, value: 1 },
    { x: sWid/2-42, y: 35, value: 1 },
    { x: sWid/2-42, y: 37, value: 1 },
    { x: sWid/2-42, y: 40, value: 1 },
    { x: sWid/2-42, y: 42, value: 1 },
    { x: sWid/2-42, y: 45, value: 1 },
    { x: sWid/2-42, y: 47, value: 1 },
    { x: sWid/2-42, y: 50, value: 1 },
    { x: sWid/2-42, y: 52, value: 1 },
    { x: sWid/2-42, y: 55, value: 1 },

    { x: sWid/2-35, y: 30, value: 1 },
    { x: sWid/2-33, y: 30, value: 1 },
    { x: sWid/2-30, y: 30, value: 1 },
    { x: sWid/2-28, y: 30, value: 1 },
    { x: sWid/2-25, y: 30, value: 1 },
    { x: sWid/2-23, y: 30, value: 1 },
    { x: sWid/2-20, y: 30, value: 1 },
    { x: sWid/2-20, y: 33, value: 1 },
    { x: sWid/2-20, y: 35, value: 1 },
    { x: sWid/2-20, y: 38, value: 1 },
    { x: sWid/2-20, y: 40, value: 1 },
    { x: sWid/2-20, y: 43, value: 1 },
    { x: sWid/2-20, y: 45, value: 1 },
    { x: sWid/2-20, y: 48, value: 1 },
    { x: sWid/2-20, y: 50, value: 1 },
    { x: sWid/2-20, y: 53, value: 1 },
    { x: sWid/2-20, y: 55, value: 1 },
    { x: sWid/2-22, y: 55, value: 1 },
    { x: sWid/2-25, y: 55, value: 1 },
    { x: sWid/2-27, y: 55, value: 1 },
    { x: sWid/2-30, y: 55, value: 1 },
    { x: sWid/2-33, y: 55, value: 1 },
    { x: sWid/2-35, y: 55, value: 1 },
    { x: sWid/2-37, y: 55, value: 1 },
    { x: sWid/2-40, y: 55, value: 1 },

    // 'l'
    { x: sWid/2-7, y: 15, value: 1 },
    { x: sWid/2-7, y: 17, value: 1 },
    { x: sWid/2-7, y: 20, value: 1 },
    { x: sWid/2-7, y: 22, value: 1 },
    { x: sWid/2-7, y: 25, value: 1 },
    { x: sWid/2-7, y: 27, value: 1 },
    { x: sWid/2-7, y: 30, value: 1 },
    { x: sWid/2-7, y: 32, value: 1 },
    { x: sWid/2-7, y: 35, value: 1 },
    { x: sWid/2-7, y: 37, value: 1 },
    { x: sWid/2-7, y: 40, value: 1 },
    { x: sWid/2-7, y: 42, value: 1 },
    { x: sWid/2-7, y: 45, value: 1 },
    { x: sWid/2-7, y: 47, value: 1 },
    { x: sWid/2-7, y: 50, value: 1 },
    { x: sWid/2-7, y: 52, value: 1 },
    { x: sWid/2-7, y: 55, value: 1 },

    // 'i'
    { x: sWid/2+7, y: 16, value: 1, radius: 10 },
    { x: sWid/2+7, y: 18, value: 1, radius: 8 },

    { x: sWid/2+7, y: 28, value: 1 },
    { x: sWid/2+7, y: 30, value: 1 },
    { x: sWid/2+7, y: 33, value: 1 },
    { x: sWid/2+7, y: 35, value: 1 },
    { x: sWid/2+7, y: 38, value: 1 },
    { x: sWid/2+7, y: 40, value: 1 },
    { x: sWid/2+7, y: 43, value: 1 },
    { x: sWid/2+7, y: 45, value: 1 },
    { x: sWid/2+7, y: 48, value: 1 },
    { x: sWid/2+7, y: 50, value: 1 },
    { x: sWid/2+7, y: 53, value: 1 },
    { x: sWid/2+7, y: 55, value: 1 },

    // 'p'
    { x: sWid/2+20, y: 28, value: 1 },
    { x: sWid/2+20, y: 30, value: 1 },
    { x: sWid/2+20, y: 33, value: 1 },
    { x: sWid/2+20, y: 35, value: 1 },
    { x: sWid/2+20, y: 38, value: 1 },
    { x: sWid/2+20, y: 40, value: 1 },
    { x: sWid/2+20, y: 43, value: 1 },
    { x: sWid/2+20, y: 45, value: 1 },
    { x: sWid/2+20, y: 48, value: 1 },
    { x: sWid/2+20, y: 50, value: 1 },
    { x: sWid/2+20, y: 53, value: 1 },
    { x: sWid/2+20, y: 55, value: 1 },
    { x: sWid/2+20, y: 58, value: 1 },
    { x: sWid/2+20, y: 60, value: 1 },
    { x: sWid/2+20, y: 63, value: 1 },
    { x: sWid/2+20, y: 65, value: 1 },
    { x: sWid/2+20, y: 68, value: 1 },
    { x: sWid/2+20, y: 69, value: 1 },

    { x: sWid/2+25, y: 30, value: 1 },
    { x: sWid/2+27, y: 29, value: 1 },
    { x: sWid/2+30, y: 28, value: 1 },
    { x: sWid/2+22, y: 28, value: 1 },
    { x: sWid/2+35, y: 28, value: 1 },
    { x: sWid/2+27, y: 30, value: 1 },
    { x: sWid/2+40, y: 30, value: 1 },
    { x: sWid/2+42, y: 31, value: 1 },
    { x: sWid/2+42, y: 33, value: 1 },
    { x: sWid/2+43, y: 36, value: 1 },
    { x: sWid/2+43, y: 38, value: 1 },
    { x: sWid/2+42, y: 40, value: 1 },
    { x: sWid/2+42, y: 43, value: 1 },
    { x: sWid/2+41, y: 45, value: 1 },
    { x: sWid/2+41, y: 48, value: 1 },
    { x: sWid/2+39, y: 50, value: 1 },
    { x: sWid/2+38, y: 53, value: 1 },
    { x: sWid/2+35, y: 53, value: 1 },
    { x: sWid/2+33, y: 53, value: 1 },
    { x: sWid/2+32, y: 53, value: 1 },
    { x: sWid/2+30, y: 53, value: 1 },
    { x: sWid/2+27, y: 52, value: 1 },
    { x: sWid/2+25, y: 50, value: 1 }
  ];

  var heatmap = h337.create(config);

  _.forEach(data, function(elem, i) {
    $timeout(function() {
      heatmap.addData(data[i]);
      if (i === data.length-1) {
        $rootScope.$emit('titleAnimationDone');
        $timeout(function() {
          angular.element('#logo')
            .animate({'top': '30vh'},300)
            .animate({'top': '120vh'}, 500);
        }, 1000);
      }
    }, i*20);
  });

});
