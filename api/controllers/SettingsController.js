/**
 * SettingsController
 *
 * @description :: Server-side logic for managing settings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	validateSettings: function (req, res) {
		SettingsService.validate(req.body)
			.then(function (data) {
				res.send(data);
			}, function (err) {
				console.log(err);
				res.badRequest(err);
			});
	},

	updateMultiple: function (req, res) {

		var settings = req.body;
		_.forEach(settings, function (setting, index) {
			Settings.update({id: setting.id}, setting).exec(function (err, data) {
				if(index+1 == settings.length){
					res.ok();
				}
			});
		});
	}
};

