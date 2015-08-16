/**
 * TvShowController
 *
 * @description :: Server-side logic for managing tvshows
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	save: function (req, res) {
		var data = req.body;

		if(data.apiId){
			TheMovieDbService.getExternalLinks(data.apiId).then(function (externalLinkData) {
				data.imdb_id = externalLinkData.imdb_id;

				TvShow.create(data).exec(function (err, data) {
					if(!err){
						res.send(data);
					}else{
						console.log(arguments);
						res.badRequest(err);
					}
				});
			})
		}

	}
};

