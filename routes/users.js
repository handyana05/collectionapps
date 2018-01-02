var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* API Route */
var userController = require('../controllers/user/userController');
router.route('/api/register').post(userController.register);
router.route('/api/login').post(userController.login);

module.exports = router;
