/**
 * TheMovieDbController
 *
 * @description :: Server-side logic for managing themoviedbs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	search: function (req, res) {
		var type = req.param('type');
		var name = req.param('name');

		if(!type || !name){
			res.badRequest("The parameters 'type' and 'name' are required.");
		}

		TheMovieDbService.search(type, name).then(function (data) {
			console.log(data);
			res.json(data.results);
		}, function (err) {
			res.badRequest(err);
		});
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

