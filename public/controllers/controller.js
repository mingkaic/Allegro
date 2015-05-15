(function (){

// angular scripts
var myApp = angular.module('myApp', 
	[
		'myApp-directives', 
		'myApp-browse', 
		'myApp-manager', 
		'myApp-login', 
		/*'myApp-transaction',*/
	]);
var views = [{article: '<login></login>'},
			{article: '<browse></browse>'},
			{article: '<manage></manager>'},
			{article: '<transaction></transaction>'}];

myApp.factory('mySharedService', function($rootScope) {
	var sharedService = {};

	sharedService.message = 0;

	sharedService.prepForBroadcast = function(msg) {
		this.message = msg;
		this.broadcastItem();
	};

	sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

	return sharedService;
});

// VIEW CONTROL
myApp.controller('viewCtrl', ['$scope', '$http', 'mySharedService', function($scope, $http, sharedService) {
	$scope.data = views[0];
	$scope.$on('handleBroadcast', function () {
		if (typeof sharedService.message === 'number')
			$scope.data = views[sharedService.message];
		else
			$scope.data = views[sharedService.message.view];
	});
}]);

})();