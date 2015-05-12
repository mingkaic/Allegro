(function() {

var myApp = angular.module('myApp-browse', []);

// BROWSE VIEW
myApp.controller('browseCtrl', ['$scope', '$http', 'mySharedService', function($scope, $http, sharedService) {
	var refresh = function() {
		// use jquery to dynamically find and place new categories in html

		$http.get('/itemlist').success(function(response) {
			$scope.itemlist = response;
		});

		var signedIn = false;
		var username = "Admin"
		if (signedIn) {
			$scope.userMessage = 'Welcome '+username;
			$scope.loginAccessMessage = 'log out';
		} else {
			$scope.userMessage = 'Please Sign in';
			$scope.loginAccessMessage = 'sign in';
		}
	};

	refresh();

	$scope.logOut = function() {
		sharedService.prepForBroadcast(0);
	}

	$scope.searchItem = function() {
		console.log($scope.criteria);
	}
}]);

})();