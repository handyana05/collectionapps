'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSaltSchema = new Schema({
    userid: String,
    salt: String
});

module.exports = mongoose.model('usersalt', userSaltSchema);