/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	dash: function (req, res) {
		var currentUser = req.session.User;
		var result = {};
		TvShow.find(function (err, tvShows) {
			result.episodes = tvShows;
			res.send(result);
		});

	}
};

