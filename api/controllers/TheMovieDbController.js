/**
 * TheMovieDbController
 *
 * @description :: Server-side logic for managing themoviedbs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	search: function (req, res) {
		var type = req.params.apiId || 'tv';
		var name = req.params.season || 'Firefly';
		TheMovieDbService.search(type, name).then(function (data) {
			res.json(data);
		}, function (err) {
			res.badRequest(err);
		});
		res.send('ok');
	},

	seasonForShow: function (req, res) {
		var apiId = req.params.apiId || 1396;
		var season = req.params.season || 1;
		TheMovieDbService.seasonForShow(apiId, season)
			.then(function (data) {
				res.json(data);
			}, function (err) {
				res.badRequest(err);
			});
	},

	availableGenres: function (req, res) {
		var genres = [];
		TheMovieDbService.getMovieGenres()
			.then(function (movieGenres) {
				genres = genres.concat(movieGenres);

				TheMovieDbService.getTvGenres().then(function (tvGenres) {
					genres = genres.concat(tvGenres);
					res.json(genres);
				});
			},
			function (err) {
				res.badRequest(err);
			});
	}
};

