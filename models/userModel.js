'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema =  new Schema({
    firstname: String,
    lastname: String,
    email: String,
    username: String,
    password: String,
    activate: Boolean,
    registerdate: Date,
    lastlogin: Date
});

module.exports = mongoose.model('user', userSchema);

