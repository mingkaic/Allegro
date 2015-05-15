(function() {

var myApp = angular.module('myApp-browse', []);

// BROWSE VIEW
myApp.controller('browseCtrl', ['$scope', '$http', 'mySharedService', function($scope, $http, sharedService) {
	var clear = function() {
		$scope.criteria = {title: "",
						author: "",
						priceMin: NaN,
						priceMax: NaN,
						category: ""};
	};

	var refresh = function() {
		// use jquery to dynamically find and place new categories in html

		$http.get('/itemlist').success(function(response) {
			$scope.itemlist = response;
		});

		var signedIn = true;
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
	clear();
	$scope.cart = [];
	$scope.total_price = 0;

	$scope.refresh = function() {
		refresh();
		clear();
	};

	$scope.logOut = function() {
		sharedService.prepForBroadcast(0);
	};

	$scope.searchItem = function() {
		var jsonData = JSON.stringify($scope.criteria);
		$http.get('/search_itemlist/'+jsonData).success(function(response) {
			$scope.itemlist = response;
		});
	};

	$scope.select = function(item) {
		if (isNaN(item.desiredAmount) || item.desiredAmount <= 0 || item.desiredAmount > item.stick) return;
		$scope.cart.push(item);
		$scope.total_price += item.price*item.desiredAmount;
	};

	$scope.buyCart = function() {
		sharedService.prepForBroadcast({view: 3, cart: $scope.cart});
	};
}]);

})();