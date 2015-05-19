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
	});

	$scope.browse = function() {
		sharedService.prepForBroadcast(1);
	};

	$scope.tab = 1;

	$scope.selectTab = function(setTab) {
		$scope.tab = setTab; // click Action
	};

	$scope.isSelected = function(checkTab) {
		return $scope.tab === checkTab;
	};
}]);

myApp.controller('loginCtrl', ['$scope', '$http', 'mySharedService', function($scope, $http, sharedService) {
	$scope.user = {
		id: "",
		password: "",
		manager: false
	};

	$scope.login = function() {
		// authentication
		$http.post('/login', $scope.user).success(function(response) {
			if (!response) {
				$scope.error = "incorrect username/email or password";
				return;
			}
			if (response.manager && $scope.manager) sharedService.prepForBroadcast(2);
			else sharedService.prepForBroadcast(1);
		}).error(function(response) {
			$scope.error = response;
		});
	};
}]);

myApp.controller('signupCtrl', ['$scope', '$http', 'mySharedService', function($scope, $http, sharedService) {
	$scope.newuser = {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		manager: false
	};

	$scope.signup = function() {
		// authentication
		$http.post('/signup', $scope.newuser).success(function(response) {
			console.log(response);
			if (typeof response === "string") {
				$scope.error = response;
				return;
			}

			if (response.manager) sharedService.prepForBroadcast(2);
			else sharedService.prepForBroadcast(1);
		}).error(function(response) {
			$scope.error = response;
		});
	};
}]);

})();