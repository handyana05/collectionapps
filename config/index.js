var configValues = require('./config');

module.exports = {

    getDbConnectionString: () => {
    // Use mlab server
    //return 'mongodb://' + configValues.username + ':' + configValues.password + '@ds151014.mlab.com:51014/wishlist';
    return 'mongodb://localhost/db_wishlist';
}

}