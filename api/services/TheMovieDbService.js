// TheMovieDbService

var BASE_URL = "https://api.themoviedb.org/3";
var Q = require('q');
var request = require('request');
var _ = require('lodash');


var getApiKey = function() {
	var deferred = Q.defer();
	Settings.findOne({settingsKey: 'TheMovieDB API key'}, function (err, setting) {
		deferred.resolve(setting || 'e1584c7cc0072947d4776de6df7b8822');
	});
	return deferred.promise;
};


module.exports = {

	search: function(type, name){
		var query = encodeURIComponent(name);
		getApiKey().then(function (apiKey) {
			request(BASE_URL + '/search/' + type + '?query=' + query + '&api_key=' + apiKey, function (error, response, data) {
				if (!error && response.statusCode == 200) {
					console.log(JSON.parse(data));
				}
			});
		});

	},

	validateApiKey: function(apiKey){
		request(BASE_URL + '/configuration?api_key=' + apiKey, function (error, response, data) {
			if (!error && response.statusCode == 200) {
				console.log(JSON.parse(data));
			}
		});
	},


	getExternalLinks: function(showId){
		getApiKey().then(function (apiKey) {
			request(BASE_URL + "/tv/"+showId+"/external_ids?api_key=" + apiKey, function (error, response, data) {
				if (!error && response.statusCode == 200) {
					console.log(JSON.parse(data));
				}
			});
		});
	},


	getFullMovieMeta: function(movieId){
		getApiKey().then(function (apiKey) {
			request(BASE_URL + "/movie/"+movieId+"?api_key=" + apiKey, function (error, response, data) {
				if (!error && response.statusCode == 200) {
					console.log(JSON.parse(data));
				}
			});
		});
	},


	getMovieGenres: function(){
		var deferred = Q.defer();
		getApiKey().then(function (apiKey) {
			request(BASE_URL + "/genre/movie/list?api_key=" + apiKey, function (error, response, data) {
				if (!error && response.statusCode == 200) {

					var genres = JSON.parse(data).genres;

					_.forEach(genres, function (genre) {
						genre.apiId = genre.id;
						genre.id = null;
					});

					deferred.resolve(genres);
				}
			});
		});
		return deferred.promise;
	},


	getTvGenres: function(){
		var deferred = Q.defer();
		getApiKey().then(function (apiKey) {
			request(BASE_URL + "/genre/tv/list?api_key=" + apiKey, function (error, response, data) {
				if (!error && response.statusCode == 200) {

					var genres = JSON.parse(data).genres;

					_.forEach(genres, function (genre) {
						genre.apiId = genre.id;
						genre.id = null;
					});

					deferred.resolve(genres);
				}
			});
		});
		return deferred.promise;
	},


	seasonForShow: function(apiId, season){
		getApiKey().then(function (apiKey) {
			request(BASE_URL + '/tv/' + apiId + '/season/' + season + '?api_key=' + apiKey, function (error, response, data) {
				if (!error && response.statusCode == 200) {
					console.log(JSON.parse(data).episodes);
				}
			});
		});
	}
};