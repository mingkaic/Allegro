(function() {

var myApp = angular.module('myApp-browse', []);

// BROWSE VIEW
myApp.controller('browseCtrl', ['$scope', '$http', 'mySharedService', function($scope, $http, sharedService) {
	var refresh = function() {
		$http.get('/itemlist').success(function(response) {
			if (response) {
				$scope.userMessage = 'Welcome '+response;
				$scope.loginAccessMessage = 'log out'
			} else {
				$scope.userMessage = 'Please Sign in';
				$scope.loginAccessMessage = 'sign in'
			}
		})
	};

	refresh();

	$scope.logOut = function() {
		sharedService.prepForBroadcast(0);
	}

	$scope.searchItem = function() {
		$scope.itemlist = [item1, item2, item3];
	}

	var item1 = {title: "Concerto no 1", 
				author: "Bach", 
				price: 10, 
				stock: 20, 
				category: "Classic",
				taxable: false};

	var item2 = {title: "Concerto no 2", 
				author: "Bach", 
				price: 11, 
				stock: 22, 
				category: "Classic",
				taxable: false};

	var item3 = {title: "Crazy in Love", 
				author: "Beyonce", 
				price: 12, 
				stock: 30, 
				category: "?",
				taxable: true};
}]);

})();