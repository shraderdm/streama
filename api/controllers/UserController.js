/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	save: function (req, res) {
		var Passwords = require('machinepack-passwords');

		// Encrypt a string using the BCrypt algorithm.
		Passwords.encryptPassword({
			password: req.param('password'),
		}).exec({

			error: function (err){
				return res.negotiate(err);
			},

			success: function (encryptedPassword){
				User.create({
					name: req.param('name'),
					email: req.param('email'),
					encryptedPassword: encryptedPassword,
					lastLoggedIn: new Date()
				}, function userCreated(err, newUser) {
					if(err){
						return res.negotiate(err);
					}

					return res.json(newUser);
				})
			}
		});

	}
};

