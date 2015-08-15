var Q = require('q');

var validateUploadDirectoryPermissions = function (settingsData) {
	var deferred = Q.defer();
	deferred.resolve(settingsData);
	return deferred.promise;

};

var validateTheMovieDbAPI = function (settingsData) {
	var deferred = Q.defer();
	TheMovieDbService.validateApiKey(settingsData.value)
		.then(function (data) {
			deferred.resolve(data);
		},function (err) {
			deferred.reject(err);
		});
	return deferred.promise;
};


module.exports = {
	validate: function (settingsData) {
		var deferred = Q.defer();

		if (settingsData.settingsKey == 'TheMovieDB API key') {
			validateTheMovieDbAPI(settingsData).then(function (data) {
				deferred.resolve(data);
			}, function (err) {;
				deferred.reject(err);
			});
		}
		else if(settingsData.settingsKey == 'Upload Directory'){
			validateUploadDirectoryPermissions(settingsData).then(function (data) {
				deferred.resolve(data);
			}, function (err) {
				deferred.reject(err);
			});
		}

		return deferred.promise;
	}
};