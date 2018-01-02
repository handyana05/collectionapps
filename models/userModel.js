'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema =  new Schema({
    firstname: String,
    lastname: String,
    email: String,
    username: String,
    password: String,
    block: Boolean
});

module.exports = mongoose.model('user', userSchema);

