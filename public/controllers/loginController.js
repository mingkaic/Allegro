(function() {

var myApp = angular.module('myApp-login', []);

// LOGIN VIEW
myApp.controller('panelCtrl', ['$scope', '$http', 'mySharedService', function($scope, $http, sharedService) {
	$http.get('/login').success(function(response) {
		if (response.user) {
			if (response.user.manager)
				sharedService.prepForBroadcast(2);
			else
				sharedService.prepForBroadcast(1);
		}
		//$scope.err = response.error;
	})

	$scope.browse = function() {
		sharedService.prepForBroadcast(1);
	};

	$scope.tab = 1;

	$scope.selectTab = function(setTab) {
		$scope.tab = setTab; // click Action
	};

	$scope.isSelected = function(checkTab) {
		return $scope.tab === checkTab;
	}
}]);

myApp.controller('loginCtrl', ['$scope', '$http', 'mySharedService', function($scope, $http, sharedService) {
	$scope.user = {
		id: "",
		password: "",
		manager: false
	};

	$scope.login = function() {
		console.log($scope.user);
		// authentication
		$http.post('/login', $scope.user).success(function(response) {
			if (response.manager) sharedService.prepForBroadcast(2);
			else sharedService.prepForBroadcast(1);
		});
	};
}]);

myApp.controller('signupCtrl', ['$scope', '$http', 'mySharedService', function($scope, $http, sharedService) {
	$scope.signup = function() {
		// authentication
		$http.post('/signup', $scope.user).success(function(response) {
			if (response.manager) sharedService.prepForBroadcast(2);
			else sharedService.prepForBroadcast(1);
		});
	};
}]);

})();