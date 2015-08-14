/**
 * TheMovieDbController
 *
 * @description :: Server-side logic for managing themoviedbs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	search: function (req, res) {
		TheMovieDbService.search('tv', 'Firefly');
		res.send('ok');
	},

	seasonForShow: function (req, res) {
		TheMovieDbService.seasonForShow(1396, 1);
		res.send('ok');
	},

	availableGenres: function (req, res) {
		var genres = [];
		TheMovieDbService.getMovieGenres().then(function (movieGenres) {
			genres = genres.concat(movieGenres);
			TheMovieDbService.getTvGenres().then(function (tvGenres) {
				genres = genres.concat(tvGenres);
				res.json(genres);
			});
		});


	}
};

