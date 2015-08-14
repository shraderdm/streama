/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
	 * Check the provided email address and password, and if they
	 * match a real user in the database, sign in to Activity Overlord.
	 */
	login: function (req, res) {
		var Passwords = require('machinepack-passwords');

		// Try to look up user using the provided email address
		User.findOne({
			email: req.param('email')
		}, function foundUser(err, user) {
			if (err) return res.negotiate(err);
			if (!user) return res.send(404, 'A User with that Email does not exist.');

			// Compare password attempt from the form params to the encrypted password
			// from the database (`user.password`)
			Passwords.checkPassword({
				passwordAttempt: req.param('password'),
				encryptedPassword: user.encryptedPassword
			}).exec({

				error: function (err){
					return res.negotiate(err);
				},

				// If the password from the form params doesn't checkout w/ the encrypted
				// password from the database...
				incorrect: function (){
					return res.notFound();
				},

				success: function (){

					// Store user id in the user session
					req.session.authenticated = true;
					req.session.User = user;

					// All done- let the client know that everything worked.
					return res.send(user);
				}
			});
		});

	},

	/**
	 * Sign up for a user account.
	 */
	signup: function(req, res) {
		var Passwords = require('machinepack-passwords');

		// Encrypt a string using the BCrypt algorithm.
		Passwords.encryptPassword({
			password: req.param('password'),
			difficulty: 10,
		}).exec({
			// An unexpected error occurred.
			error: function(err) {
				return res.negotiate(err);
			},
			// OK.
			success: function(encryptedPassword) {
				// Create a User with the params sent from
				// the sign-up form --> signup.ejs
				User.create({
					name: req.param('name'),
					email: req.param('email'),
					encryptedPassword: encryptedPassword,
					lastLoggedIn: new Date()
				}, function userCreated(err, newUser) {
					if (err) {

						console.log("err: ", err);
						console.log("err.invalidAttributes: ", err.invalidAttributes)

						// If this is a uniqueness error about the email attribute,
						// send back an easily parseable status code.
						if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
							&& err.invalidAttributes.email[0].rule === 'unique') {
							return res.emailAddressInUse();
						}

						// Otherwise, send back something reasonable as our error response.
						return res.negotiate(err);
					}

					// Log user in
					req.session.authenticated = true;
					req.session.User = newUser;

					// Send back the new user
					return res.json(newUser);
				});
			}
		});
	},

	/**
	 * Log out of Activity Overlord.
	 * (wipes `me` from the sesion)
	 */
	logout: function (req, res) {

		req.session.destroy();
		return res.json({message: "Logged out"});

		//// Look up the user record from the database which is
		//// referenced by the id in the user session (req.session.me)
		//User.findOne(req.session.me, function foundUser(err, user) {
		//	if (err) return res.negotiate(err);
		//
		//	// If session refers to a user who no longer exists, still allow logout.
		//	if (!user) {
		//		sails.log.verbose('Session refers to a user who no longer exists.');
		//		return res.backToHomePage();
		//	}
		//
		//	// Wipe out the session (log out)
		//	req.session.me = null;
		//
		//	// Either send a 200 OK or redirect to the home page
		//	return res.backToHomePage();
		//
		//});
	},


	currentUser: function (req, res) {
		res.send(req.session.User);
	}
};

