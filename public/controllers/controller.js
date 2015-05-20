(function (){

// angular scripts
var myApp = angular.module('myApp', 
	[
		'myApp-directives', 
		'myApp-browse', 
		'myApp-manager', 
		'myApp-login', 
		/*'myApp-transaction'*/
	]);
var views = [{article: '<login></login>'},
			{article: '<browse></browse>'},
			{article: '<manage></manager>'},
			{article: '<transaction></transaction>'}];

myApp.factory('mySharedService', function($rootScope) {
	var sharedService = {};

	sharedService.view = 0;

	sharedService.prepForBroadcast = function(msg) {
		this.view = msg;
		this.broadcastItem();
	};

	sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

	return sharedService;
});

myApp.factory('cartShareService', function($rootScope) {
	var sharedService = {};

	sharedService.cart = [];

	sharedService.prepForBroadcast = function(msg) {
		this.cart = msg;
		this.broadcastItem();
	};

	sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleCartBroadcast');
    };

	return sharedService;
});

// VIEW CONTROL
myApp.controller('viewCtrl', ['$scope', '$http', 'mySharedService', function($scope, $http, sharedService) {
	$scope.data = views[0];
	$scope.$on('handleBroadcast', function () {
		$scope.data = views[sharedService.view];
	});
}]);

myApp.controller('navCtrl', ['$scope', '$http', 'mySharedService', function($scope, $http, sharedService) {
	$scope.changeView = function(view) {
		sharedService.prepForBroadcast(view);
	};
}]);

})();