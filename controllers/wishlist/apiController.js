var Wishlist = require('../../models/wishlistModel');

module.exports = {

    getAllWishesByUsername: (req, res) => {
        Wishlist.find({ username: req.params.username }, (err, wishes) => {
            if(err) {
                throw err;
            }

            res.send(wishes);
        });
    },
    getWishById: (req, res) => {
        Wishlist.findById({ _id: req.params.id }, (err, wish) => {
            if(err) {
                throw err;
            }

            res.send(wish);
        })
    },
    postWish: (req, res) => {
        // If the id is exist on the request body, it means it is an update request
        if(req.body.id) {
            Wishlist.findByIdAndUpdate(req.body.id, {
                name: req.body.name,
                size: req.body.size,
                price: req.body.price,
                currency: req.body.currency,
                url: req.body.url,
                isDone: req.body.isDone
            }, (err, wish) => {
                if(err) {
                    throw err;
                }

                res.send('A wish with id "' + req.body.id + '" is successfully updated.');
            });
        }
        // Otherwise it is a new wish
        else {
            var newWish = Wishlist({
                username: 'handyana',
                name: req.body.name,
                size: req.body.size,
                price: req.body.price,
                currency: req.body.currency,
                url: req.body.url,
                isDone: req.body.isDone
            });

            newWish.save((err) => {
                if(err) {
                    throw err;
                }

                res.send('A new wish is successfully added.');
            });
        }
    },
    deleteWishById: (req, res) => {
        Wishlist.findByIdAndRemove(req.body.id, (err) => {
            if(err) {
                throw err;
            }

            res.send('A wish with id "' + req.body.id + '" is successfully removed.');
        });
    }
};