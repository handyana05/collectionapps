'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.models = {};
mongoose.modelSchemas = {};

var wishlistSchema = new Schema({
    username: String,
    name: String,
    size: String,
    price: Number,
    currency: String,
    url: String,
    isDone: Boolean
});

// Getter
wishlistSchema.path('price').get((num) => {
    return (num / 100).toFixed(2);
});

// Setter
wishlistSchema.path('price').set((num) => {
    return num * 100;
});

module.exports = mongoose.model('wishlist', wishlistSchema);