// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('blip', ['ionic', 'ui.router', 'uiGmapgoogle-maps'])
.run(function($ionicPlatform) {
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
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/app/mapView');

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

  // .state('app.search', {
  //   url: "/search",
  //   views: {
  //     'menuContent': {
  //       templateUrl: "templates/search.html"
  //     }
  //   }
  // })

  // .state('app.browse', {
  //   url: "/browse",
  //   views: {
  //     'menuContent': {
  //       templateUrl: "templates/browse.html"
  //     }
  //   }
  // })

  // .state('app.playlists', {
  //   url: "/playlists",
  //   views: {
  //     'menuContent': {
  //       templateUrl: "templates/playlists.html",
  //       controller: 'PlaylistsCtrl'
  //     }
  //   }
  // })

  // .state('app.single', {
  //   url: "/playlists/:playlistId",
  //   views: {
  //     'menuContent': {
  //       templateUrl: "templates/playlist.html",
  //       controller: 'PlaylistCtrl'
  //     }
  //   }
  // });
  // if none of the above states are matched, use this as the fallback

});
