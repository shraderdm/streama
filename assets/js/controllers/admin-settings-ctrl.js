'use strict';

streamaApp.controller('adminSettingsCtrl', ['$scope', 'apiService', '$sce', function ($scope, apiService, $sce) {

  apiService.settings.list().success(function (data) {
    $scope.settings = data;
    $scope.loading = false;
  });

  $scope.autoLinkDescription = function (description) {
    return $sce.trustAsHtml(Autolinker.link(description, { newWindow: "true" } ));
  };

  $scope.updateMultipleSettings = function (settings) {
    settings.invalid = false;
    var rawSettings = angular.copy(settings);

    apiService.settings.updateMultiple(rawSettings)
      .success(function () {
        window.location.reload();
      })
  };


  $scope.validateSettings = function (settings) {
    $scope.changeValue(settings);
    $scope.loading = true;

    apiService.settings.validateSettings(settings)
      .success(function (data) {
        alertify.success(data.message || 'validation successful');
        settings.valid = true;
        $scope.loading = false;
      })
      .error(function (data) {
        alertify.error(data);
        settings.invalid = true;
        $scope.loading = false;
      });
  };

  $scope.changeValue = function (settings) {
    settings.valid = undefined;
    settings.invalid = undefined;
    settings.dirty = settings.value;
  };


  $scope.anySettingsInvalid = function () {
    return _.find($scope.settings, function (setting) {
        return setting.invalid || (setting.dirty && !setting.valid) || !setting.value;
   });
  };

}]);
