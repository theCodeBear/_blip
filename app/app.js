'use strict';


angular.module('blip', ['ionic', 'ui.router', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $http, GeolocationService, EventsService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams){ 
      $rootScope.stateView = toState.name;
    });

    GeolocationService.init();

  // app routes passed splashscreen after these events fire
    EventsService.titleAnimationDone();
    EventsService.initializedCoordinates();

  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/app/splashScreen');

  $stateProvider

  .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "views/menu/menu.html",
      controller: 'MenuCtrl'
  })

  .state('app.splashScreen', {
    url: "/splashScreen",
    views: {
      'menuContent': {
        templateUrl: "views/splashScreen/splashScreen.html",
        controller: 'splashScreenCtrl'
      }
    }
  })

  .state('app.mapView', {
    url: "/mapView",
    views: {
      'menuContent': {
        templateUrl: "views/mapView/mapView.html",
        controller: 'mapViewCtrl'
      }
    },
    resolve: {
      Coords: function(GeolocationService) {
        return GeolocationService.getCoords();
      }
    }
  })

  .state('app.feed', {
    url: '/feed',
    views: {
      'menuContent': {
        templateUrl: 'views/feed/feed.html',
        controller: 'feedCtrl'
      }
    }
  })

  .state('app.friendFeed', {
    url: "/friendFeed",
    views: {
      'menuContent': {
        templateUrl: "views/friendFeed/friendFeed.html",
        controller: 'friendFeedCtrl'
      }
    }
  })

  .state('app.socialLogins', {
    url: "/socialLogins",
    views: {
      'menuContent': {
        templateUrl: "views/socialLogins/socialLogins.html",
        controller: 'socialLoginsCtrl'
      }
    }
  })

  .state('app.sponsoredBlip', {
    url: "/sponsoredBlip",
    views: {
      'menuContent': {
        templateUrl: "views/sponsoredBlip/sponsoredBlip.html",
        controller: 'sponsoredBlipCtrl'
      }
    }
  });

});
