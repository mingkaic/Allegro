(function (){

var myApp = angular.module('myApp-manager', []);

// MANAGE VIEW
myApp.controller('managerCtrl', ['$scope', '$http', 'mySharedService', function($scope, $http, sharedService) {

	$scope.logOut = function() {
		sharedService.prepForBroadcast(0);
	}

	var validate = function() {
		if (($scope.item.title === "") || ($scope.item.author === "") || isNaN($scope.item.price)) 
			return false;

		if (isNaN($scope.item.stock)) $scope.item.stock = 0;
		if ($scope.item.category === "") $scope.item.category = "None";

		return true;
	};

	var clear = function() {
		$scope.item = {title: "", 
						author: "", 
						price: NaN, 
						stock: NaN, 
						category: "",
						taxable: false};
	};

	var refresh = function() {
		$http.get('/itemlist').success(function(response) {
			$scope.itemlist = response;
		});
	};

	refresh();
	clear();

	$scope.addItem = function() {
		if (!validate()) return;

		$http.post('/itemlist', $scope.item).success(function(response) {
			if (response) console.log(response);
			refresh();
		});
		clear();
	};

	$scope.removeItem = function(id) {
		$http.delete('/itemlist/' + id).success(function(response) {
			if (response) console.log(response);
			refresh();
		});
	};

	$scope.editItem = function(id) {
		$http.get('/itemlist/' + id).success(function(response) {
			$scope.item = response;
		});
	};

	$scope.update = function() {
		debugger;
		if (!validate()) return;
		
		$http.put('/itemlist/' + $scope.item._id, $scope.item).success(function(response) {
			refresh();
		});
		clear();
	};
}]);

})();