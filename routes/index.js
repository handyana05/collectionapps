var express = require('express');
var router = express.Router();

var wishlist = {
    setupController: require('../controllers/wishlist/setupController'),
    apiController: require('../controllers/wishlist/apiController')
};

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
});

/* API Route */

/* Wishlist */
router.route('/wishlist/api/wishes/:username').get(wishlist.apiController.getAllWishesByUsername);
router.route('/wishlist/api/wish/:id').get(wishlist.apiController.getWishById);
router.route('/wishlist/api/wish').post(wishlist.apiController.postWish);
router.route('/wishlist/api/wish').delete(wishlist.apiController.deleteWishById);
/* Seed Data into DB */
router.route('/wishlist/api/setupWishlist').get(wishlist.setupController.seedDataIntoDb);

module.exports = router;
