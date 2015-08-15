

streamaApp.controller('adminUsersCtrl', ['$scope', 'apiService', 'modalService', '$rootScope', function ($scope, apiService, modalService, $rootScope) {
	$scope.loading = true;

	apiService.user.list().success(function (data) {
		$scope.users = data;
		$scope.loading = false;

	});

	$scope.openUserModal = function (user) {
		modalService.userModal(user, function (data) {
			console.log('%c data', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', data);
			if(!_.find($scope.users, {id: data.id})){
				$scope.users.push(data);
			}else{

        var index = $scope.users.indexOf(user);

				if(user.isAdmin != data.isAdmin || user.isContentManager != data.isContentManager){
					if(data.id != $rootScope.currentUser.id){
						alertify.alert('Because you changed this users permissions, lease make sure to inform them that they have to log out of the application and log back in for the changes to take effect.');
					}else{
						alertify.alert('Because you changed your permissions, please log out of the application and log back in for the changes to take effect.');
					}
				}

				$scope.users[index] = data;
      }
		});
	};

	$scope.delete = function (user) {
		alertify.confirm('Are you sure you want to delete ' + user.username + '?', function (confirmed) {
			if(confirmed){
				apiService.user.delete(user.id).success(function (data) {
          _.remove($scope.users, {id: user.id})
				});
			}
		})
	};

	$scope.isAdmin = function (user) {
		return _.find(user.authorities, {authority: 'ROLE_ADMIN'});
	};


}]);
