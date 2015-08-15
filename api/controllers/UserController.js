/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	save: function (req, res) {
		if(req.body.id){
			UserService.updateExistingUser(req.body).then(function (data) {
				res.json(data);
			});
		}else{
			UserService.createNewUserAndInvite(req.body).then(function (data) {
				res.json(data);
			});
		}
	},

	checkAvailability: function (req, res) {
		var email = req.param('email');
		User.findOne({email: email}, function (err, user) {
			if(user && user.id != req.session.User.id){
				return res.json({error: "Email address is already taken by another user."});
			}else{
				return res.send();
			}
		});
	}

};

