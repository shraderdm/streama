var Passwords = require('machinepack-passwords');
var Q = require('q');

module.exports = {
	createNewUserAndInvite: function (data) {
		var deferred = Q.defer();
		// Encrypt a string using the BCrypt algorithm.
		Passwords.encryptPassword({
			password: req.param('password')
		}).exec({

			error: function (err){
				return res.negotiate(err);
			},

			success: function (encryptedPassword){
				User.create({
					name: data.name,
					email: data.email,
					encryptedPassword: encryptedPassword,
					lastLoggedIn: new Date()
				}, function userCreated(err, newUser) {
					if(err){
						deferred.reject(err);
					}

					deferred.resolve(newUser);
				})
			}
		});
		return deferred.promise;
	},

	updateExistingUser: function (data) {
		var deferred = Q.defer();
		console.log("new data", data);
		User.update({id: data.id}, data).exec(function (err, updated) {
			console.log("updated to", updated[0]);
			deferred.resolve(updated[0]);
		});
		return deferred.promise;
	}
};