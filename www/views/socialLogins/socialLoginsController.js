'use strict';

angular.module('blip')

.controller('socialLoginsCtrl', ['$scope', '$firebaseObject', function($scope, $firebaseObject) {

  $scope.facebookLogin = function() {
    var ref = new Firebase("https://blipapp.firebaseio.com");
    ref.authWithOAuthRedirect("facebook", function(error) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        // We'll never get here, as the page will redirect on success.
      }
    });
  };

  $scope.twitterLogin = function() {
    var ref = new Firebase("https://blipapp.firebaseio.com");
    ref.authWithOAuthPopup("twitter", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  };

}]);