var _ = require('lodash');
var Video = require('./Video.js');

module.exports = {

  attributes: {
    deleted: {
      type: 'boolean',
      defaultsTo: false
    },
    name: {
      type: 'string',
      required: true
    },
    overview: {
      type: 'string',
      minLength: 1,
      maxLength: 5000
    },
    apiId: 'string',

    backdrop_path: 'string',
    poster_path: 'string',
    first_air_date: 'string',
    original_language: 'string',
    imdb_id: 'string',
    vote_average: 'float',
    vote_count: 'integer',
    popularity: 'float',

    episodes: {
      collection: 'Video',
      via: 'show'
    }
  }
};
