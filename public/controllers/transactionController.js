(function() {

var myApp = angular.module('myApp-transaction', []);

// TRANSACTION VIEW
myApp.controller('transactionCtrl', ['$scope', '$http', 'mySharedService', 'cartShareService', function($scope, $http, sharedService) {
	$scope.cart = [];

	$scope.$on('handleCartBroadcast', function () {
		$scope.cart = sharedService.cart;
	});
}]);

});