// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('blip', ['ionic', 'ui.router', 'ngCordova'])
.run(function($ionicPlatform, $state, $rootScope, $http, GeolocationService) {
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

    // $http.get('http://192.168.1.123:3000/blip').then(function(data) {
    //   console.log('response from api', data);
    // });

    GeolocationService.init();

  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/app/splashScreen');

  $stateProvider

  .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "views/menu.html",
      controller: 'AppCtrl'
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
