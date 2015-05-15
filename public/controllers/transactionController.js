(function() {

var myApp = angular.module('myApp-transaction', []);

// TRANSACTION VIEW
myApp.controller('transactionCtrl', ['$scope', '$http', 'mySharedService', function($scope, $http, sharedService) {
	$scope.cart = [];

	$scope.$on('handleBroadcast', function () {
		if (typeof sharedService.message !== 'number') $scope.cart = sharedService.message.cart;
	});
}]);

});