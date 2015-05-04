(function() {

var myApp = angular.module('myApp-directives', []);

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

})();