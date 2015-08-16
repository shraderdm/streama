/**
 * EpisodeController
 *
 * @description :: Server-side logic for managing episodes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	listForShow: function (req, res) {
		var showId = req.param('showId');
		Video.find({videoType: 'tvShow',show: showId}).populate('show').exec(function (err, data) {
			if(!err){
				res.send(data);
			}else{
				res.badRequest(err);
			}
		});
	}

};

