var Wishlist = require('../../models/wishlistModel');

module.exports = {

    seedDataIntoDb: (req, res) => {
        var starterWishlist =  [
            {
                username: 'handyana',
                name: 'Samsung Galaxy Note 8',
                isDone: false,
                url: 'https://www.amazon.de/Samsung-Smartphone-Touch-Display-interner-Speicher-midnight-black/dp/B074PBH2P4/ref=sr_1_2?s=telephone&ie=UTF8&qid=1512052020&sr=1-2&keywords=samsung+galaxy+note+8',
                price: 804.95,
                currency: 'EUR'
            }
        ];

        Wishlist.create(starterWishlist, (err, results) => {
            res.send(results);
        });
    }

};