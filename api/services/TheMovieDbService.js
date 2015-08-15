// TheMovieDbService

var BASE_URL = "https://api.themoviedb.org/3";
var Q = require('q');
var request = require('request');
var _ = require('lodash');


var getApiKey = function() {
	var deferred = Q.defer();
	Settings.findOne({settingsKey: 'TheMovieDB API key'}, function (err, setting) {
		if(err){
			deferred.reject(err);
		}else{
			deferred.resolve(setting);
		}
	});
	return deferred.promise;
};


module.exports = {

	search: function(type, name){
		var deferred = Q.defer();
		var query = encodeURIComponent(name);
		getApiKey().then(function (apiKey) {
			request(BASE_URL + '/search/' + type + '?query=' + query + '&api_key=' + apiKey, function (error, response, data) {
				var data = JSON.parse(data);

				if(error){
					deferred.reject(error);
					return;
				}

				if(data.status_code == 7){
					deferred.reject(data.status_message);
					return;
				}
				deferred.resolve(data);
			});
		});

		return deferred.promise;
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
				var data = JSON.parse(data);

				if(error){
					deferred.reject(error);
					return;
				}

				if(data.status_code == 7){
					deferred.reject(data.status_message);
					return;
				}

				var genres = data.genres;

				_.forEach(genres, function (genre) {
					genre.apiId = genre.id;
					genre.id = null;
				});

				deferred.resolve(genres);

			});
		}, function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	},


	getTvGenres: function(){
		var deferred = Q.defer();
		getApiKey().then(function (apiKey) {
			request(BASE_URL + "/genre/tv/list?api_key=" + apiKey, function (error, response, data) {
				var data = JSON.parse(data);

				if(error){
					deferred.reject(error);
					return;
				}

				if(data.status_code == 7){
					deferred.reject(data.status_message);
					return;
				}

				var genres = data.genres;

				_.forEach(genres, function (genre) {
					genre.apiId = genre.id;
					genre.id = null;
				});

				deferred.resolve(genres);

			});
		}, function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	},


	seasonForShow: function(apiId, season){
		var deferred = Q.defer();
		getApiKey().then(function (apiKey) {
			request(BASE_URL + '/tv/' + apiId + '/season/' + season + '?api_key=' + apiKey, function (error, response, data) {

				var data = JSON.parse(data);

				if(error){
					deferred.reject(error);
					return;
				}

				if(data.status_code == 7){
					deferred.reject(data.status_message);
					return;
				}
				deferred.resolve(data.episodes);
			});
		});
		return deferred.promise;
	}
};