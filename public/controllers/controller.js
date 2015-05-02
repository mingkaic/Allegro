// angular scripts
var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

	var refresh = function() {
		$http.get('/itemlist').success(function(response) {
			$scope.itemlist = response;
		});
	};

	refresh();

	$scope.addItem = function() {
		console.log($scope.item);
		$http.post('/itemlist', $scope.item).success(function(response) {
			refresh();
		});
	};

	$scope.removeItem = function(id) {
		$http.delete('/itemlist/' + id).success(function(response) {
			refresh();
		});
	};

	$scope.editItem = function(id) {
		$http.get('/itemlist/' + id).success(function(response) {
			$scope.item = response;
		});
	};

	$scope.update = function() {
		$http.put('/itemlist/' + $scope.item._id, $scope.item).success(function(response) {
			refresh();
		});
	};

}]);