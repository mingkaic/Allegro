(function (){

// angular scripts
var myApp = angular.module('myApp', ['myApp-browse', 'myApp-manager', 'myApp-directives']);
var view;

// VIEW CONTROL
myApp.controller('viewCtrl', ['$scope', '$http', function($scope, $http) {
	view = 1;

	$scope.isSelected = function(checkTab) {
		return view === checkTab;
	}
}]);

// LOGIN VIEW
myApp.controller('panelCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.tab = 1;

	$scope.selectTab = function(setTab) {
		$scope.tab = setTab; // click Action
	};

	$scope.isSelected = function(checkTab) {
		return $scope.tab === checkTab;
	}
}]);

myApp.controller('loginCtrl', ['$scope', '$http', function($scope, $http) {
	this.login = function() {
		console.log($scope.user);
		view = 2;
	};
}]);

myApp.controller('signupCtrl', ['$scope', '$http', function($scope, $http) {
	this.signup = function() {
		console.log($scope.newuser);
		view = 3;
	};
}]);

})();