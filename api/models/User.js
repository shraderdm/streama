/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Passwords = require('machinepack-passwords');

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    encryptedPassword: {
      type: 'string',
      required: true
    },
    lastLoggedIn: {
      type: 'date',
      required: true,
			defaultsTo: new Date(0)
    },
    enabled: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    uuid: {
      type: 'string'
    },
    invitationSent: {
      type: 'boolean',
      required: true,
      defaultsTo: false,
      columnName: 'invitation_sent'
    },
    favoriteGenres: {
      collection: 'genre',
      via: 'users'
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    isContentManager: {
      type: 'boolean',
      defaultsTo: false
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
  },



  beforeValidate: function(values, cb) {
    Passwords.encryptPassword({
      password: values.password
    })
      .exec({
        error: function (err){
          cb(err);
        },

        success: function (encryptedPassword){
          values.encryptedPassword = encryptedPassword;
          cb();
        }
    });
  }
};

