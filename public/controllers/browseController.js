(function() {

var myApp = angular.module('myApp-browse', []);

// BROWSE VIEW
myApp.controller('browseCtrl', ['$scope', '$http', 'mySharedService', function($scope, $http, sharedService) {
	$scope.logOut = function() {
		sharedService.prepForBroadcast(0);
	}

	$scope.searchItem = function() {
		$scope.itemlist = itemlist;
	}
}]);

})();