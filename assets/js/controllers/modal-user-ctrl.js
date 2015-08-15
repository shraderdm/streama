'use strict';

streamaApp.controller('modalUserCtrl', [
	'$scope', '$modalInstance', 'apiService', 'user',
	function ($scope, $modalInstance, apiService, user) {

		$scope.user = angular.copy(user);
		$scope.loading = false;

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

		$scope.checkAvailability = function (email) {
			$scope.error = null;
			$scope.valid = false;

			if(email){
				apiService.user.checkAvailability(email).success(function (data) {
					if(data.error){
						$scope.error = 	data.error;
					}else{
						$scope.valid = true;
					}
				});
			}
		};

    $scope.toggleSelection = function (value, array) {
      if(array.indexOf(value) > -1){
        array.splice(array.indexOf(value), 1);
      }else{
        array.push(value);
      }
    };


		$scope.saveAndInviteUser = function (user) {
			$scope.loading = true;

			var dateObj = angular.copy(user);
			apiService.user.saveAndInviteUser(dateObj)

				.success(function (data) {
					$modalInstance.close(data);
					$scope.loading = false;
				})
				.error(function () {
					$scope.loading = false;
					alertify.error('There was an error saving the user.');
				});
		};

}]);
