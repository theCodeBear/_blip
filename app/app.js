'use strict';


angular.module('blip', ['ionic', 'ui.router', 'ngCordova', 'btford.socket-io'])

.run(function($ionicPlatform, $rootScope, $http, GeolocationService, EventsService, Blips, Socket) {
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
    Blips.getFromDB();

  // start listeners for these events. mapView opens once these events fire.
    EventsService.titleAnimationDone();
    EventsService.initializedCoordinates();
    EventsService.blipsRetrieved();

  // Get the blip stats from the database
    $http.get('http://192.168.1.123:3000/stats').then(function(data) {
      $rootScope.siteStats = data.data.stats;
    });
  // Update stats in app in real time for every blip
    Socket.on('increment blip count', function(data) {
      $rootScope.siteStats.blipCount += data.blips;
      $rootScope.siteStats.tweetCount += data.tweets;
    });
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
  })

  .state('app.stats', {
    url: '/stats',
    views: {
      'menuContent': {
        templateUrl: 'views/stats/stats.html',
        controller: 'StatsCtrl'
      }
    }
  });

});
