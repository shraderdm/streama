'use strict';


streamaApp.controller('loginCtrl', ['$scope', 'apiService', '$state', function ($scope, apiService, $state) {
	console.log('%c loginCtrl', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;');

	$scope.doLogin = function (loginData) {
		apiService.session.login(loginData)
			.success(
				function () {
					$state.go('dash');
				})
			.error(
				function (message) {
					alertify.error(message);
				});
	};

	//$scope.users = apiService.user().query().$promise.then(function(users) {
	//	console.log('%c $scope.users', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', $scope.users);
	//	console.log('%c $scope.users', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', users);
	//})
}]);


