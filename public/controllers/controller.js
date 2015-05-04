// add closure?

// angular scripts
var myApp = angular.module('myApp', []);
var tab;

// declaring custom directives for expressiveness
myApp.directive('login', function() {
	return {
		restrict: 'E', // new html element
		templateUrl: 'login.html',
	};
});

myApp.directive('browse', function() {
	return {
		restrict: 'E', // new html element
		templateUrl: 'browse.html'
	};
});

myApp.directive('manage', function() {
	return {
		restrict: 'E', // new html element
		templateUrl: 'manage.html'
	};
});

// VIEW CONTROL
myApp.controller('viewCtrl', ['$scope', '$http', function($scope, $http) {
	tab = 1;
/* global tab setting handled by login and signup actions

	$scope.selectTab = function(setTab) {
		tab = setTab; // click Action
	};*/

	$scope.isSelected = function(checkTab) {
		return tab === checkTab;
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
		console.log('sup');
		console.log($scope.user);
		tab = 2;
	};
}]);

myApp.controller('signupCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.signup = function() {
		console.log($scope.newuser);
		tab = 2;
	};
}]);

// BROWSE VIEW
myApp.controller('browseCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.searchItem = function() {

	}
}]);

// MANAGE VIEW
myApp.controller('managerCtrl', ['$scope', '$http', function($scope, $http) {
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