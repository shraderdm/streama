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
			//console.log(data);
			res.json(data.results);
		}, function (err) {
			res.badRequest(err);
		});
	},

	seasonForShow: function (req, res) {
		var apiId = req.param('apiId');
		var season = req.param('season');
		var showId = req.param('showId');
		var result = [];

		TheMovieDbService.seasonForShow(apiId, season)
			.then(function (episodes) {

				_.forEach(episodes, function (episodeData, index) {
					episodeData.videoType = "tvShow";
					episodeData.show = showId;

					Video.create(episodeData).exec(function (err, episode) {
						result.push(episode);

						if(index+1 == episodes.length){
							res.json(result);
						}
					});
				});

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

