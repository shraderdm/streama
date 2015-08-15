var Q = require('q');


module.exports = {
	createDefaultSettings: function () {
		var promises = [];

		var settings = [
			{
				settingsKey: 'Upload Directory',
				description: 'This setting provides the application with your desired upload-path for all files. ' +
				'The default so far has been /data/streama. Remember: if you change this path, copy all the files (that were previously added) into the new directory.',
				settingsType: 'string',
				required: true
			},
			{
				settingsKey: 'TheMovieDB API key',
				description: 'This API-key is required by the application to fetch all the nice Movie/Episode/Show data for you. Get one for free at https://www.themoviedb.org/',
				settingsType: 'string',
				required: true
			},
			{
				settingsKey: 'Base URL',
				value: 'http://localhost:8080/streama',
				description: 'The Base-URL is used for the videos and the link in the invitation-email.',
				settingsType: 'string',
				required: true
			}
		];

		_.forEach(settings, function (settingData) {
			var deferred = Q.defer();

			Settings.findOne({settingsKey: settingData.settingsKey}, function (err, setting) {
				if(!setting){
					Settings.create(settingData).exec(function (err, createdSetting) {
						deferred.resolve(createdSetting);
					});
				}
				else{
					deferred.resolve();
				}
			});

			promises.push(deferred.promise);
		});

		return Q.all(promises);
	},


	createDefaultUsers: function () {
		var promises = [];
		var users = [
			{
				email: 'admin@localhost.com',
				password: 'admin',
				enabled: true,
				isAdmin: true,
				isContentManager: true
			}
		];

		_.forEach(users, function (userData) {
			var deferred = Q.defer();

			User.findOne({email: userData.email}, function (err, user) {
				if(!user){
					User.create(userData).exec(function (err, created) {
						console.log("err", err);
						console.log("created user: ", userData.email);
						deferred.resolve(created);
					});
				}
				else{
					deferred.resolve();
				}
			});

			promises.push(deferred.promise);
		});

		return Q.all(promises);
	}

};