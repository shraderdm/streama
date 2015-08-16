var _ = require('lodash');

module.exports = {

  attributes: {
    overview: {
      type: 'string'
    },
    apiId: {
      type: 'string',
      columnName: 'api_id'
    },
    original_language: 'string',
    vote_average: 'float',
    vote_count: 'integer',
    popularity: 'float',
    imdb_id: 'string',
    videoType: 'string',

    files: {
      collection: 'file',
      via: 'videos'
    },



    // SHOW
    name: {
      type: 'string'
    },
    air_date: 'string',
    season_number: 'integer',
    episode_number: 'integer',
    episode_string: 'string',
    still_path: 'string',
    show: {
      model: 'TvShow'
    },


    // MOVIE
    title: 'string',
    release_date: 'string',
    backdrop_path: 'string',
    poster_path: 'string'
  },

  beforeUpdate: function(values, callback) {
    if(values.type == "tvShow"){
      values.episodeString = 's' + _.padLeft(values.seasonNumber.toString(), 2, '0') + 'e' + _.padLeft(values.episodeNumber.toString(), 2, '0');
    }
    callback();
  }
};
