var User = require('../../models/userModel');
var UserSalt = require('../../models/userSaltModel');
var bcrypt = require('bcryptjs');

var getServerSalt = (userId, callback) => {
    console.log(userId);
    UserSalt.findOne({userid: userId}, (err, usersalt) => {
        callback(err, usersalt);
    });
};

var loginUser = (res, user, candidatePassword) => {
    getServerSalt(user._id, (err, usersalt) => {
        if(err) {
            res.send(JSON.stringify({ errors: err }));
        }
        else {
            var password = candidatePassword + usersalt.salt;
            bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
                if(bcryptErr) {
                    res.send(JSON.stringify({ success: false, message: 'Error on finding the user (3).' }));
                }
                else {
                    if(isMatch) {
                        User.findByIdAndUpdate(user._id, { $set: { lastlogin: Date.now() } }, (updateUserErr, updatedUser) => {
                            if(updateUserErr) {
                                res.send(JSON.stringify({ success: false, message: 'Error on finding the user (4).' }));
                            }
                            else{
                                res.send(JSON.stringify({ success: true, message: 'The user is successfully logged in.', user: {
                                    username: updatedUser.username,
                                    firstname: updatedUser.firstname,
                                    lastname: updatedUser.lastname,
                                    email: updatedUser.email
                                }}));
                            }
                        });
                    }
                    else {
                        res.send(JSON.stringify({ errors: [
                            { param: 'username', msg: 'Invalid username or password.' },
                            { param: 'password', msg: 'Invalid username or password.' }
                        ]}));
                    }
                }
            });
        }
    });
};

module.exports = {

    register: (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');

        // Validator
        req.check('firstname', 'First name field is required').notEmpty();
        req.check('lastname', 'Last name field is required').notEmpty();
        req.check('username', 'Username field is required').notEmpty();
        req.check('email', 'Email field is required').notEmpty();
        req.check('email', 'Email is not valid').isEmail();
        req.check('password', 'Password field is required').notEmpty();

        // Check Errors
        var errors = req.validationErrors();

        if(errors) {
            res.send(JSON.stringify({ errors: errors }));
        }
        else {
            // Validate by Username
            User.find({ username: req.body.username }, (userNameError, userNameUsers) => {
                if(userNameUsers.length > 0) {
                    res.send(JSON.stringify({ errors: [{ param: 'username', msg: 'Username is already used.' }] }));
                }
                else {
                    // Validate by Email
                    User.find({ email: req.body.email }, (emailError, emailUsers) => {
                        if(emailUsers.length > 0) {
                            res.send(JSON.stringify({ errors: [{ param: 'email', msg: 'Email is already used.' }] }));
                        }
                        else {
                            var newUser = User({
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                email: req.body.email,
                                username: req.body.username,
                                password: req.body.password,
                                registerdate: Date.now()
                            });

                            bcrypt.genSalt(10, function(serverSaltError, serverSalt) {
                                bcrypt.genSalt(10, function(hashSaltError, hashSalt) {
                                    var password = newUser.password + serverSalt;
                                    bcrypt.hash(password, hashSalt, function(hashError, hash) {
                                        newUser.password = hash;
                                        newUser.save((saveError) => {
                                            if(saveError) {
                                                res.send(JSON.stringify({ success: false, message: 'Error on creating user.' }));
                                            }

                                            User.findOne({ username: newUser.username }, (findOneError, user) => {
                                                var newUserSalt = UserSalt({
                                                    userid: user._id,
                                                    salt: serverSalt
                                                });

                                                newUserSalt.save((saltSaveError) => {
                                                    if(saltSaveError) {
                                                        res.send(JSON.stringify({ success: false, message: 'Error on creating user.' }));
                                                    }

                                                    res.send(JSON.stringify({ success: true, message: 'The user is successfully created.' }));
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        }
                    });
                }
            });
        }
    },
    login: (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');

        // Validator
        req.check('username', 'Username field is required').notEmpty();
        req.check('password', 'Password field is required').notEmpty();

        // Check Errors
        var errors = req.validationErrors();

        if(errors) {
            res.send(JSON.stringify({ errors: errors }));
        }
        else {
            User.findOne({ username: req.body.username }, (usernameError, usernameUser) => {
                if(usernameError) {
                    res.send(JSON.stringify({ success: false, message: 'Error on finding the user. (1)' }));
                } else {
                    if(!usernameUser) {
                        User.findOne({ email: req.body.username }, (emailError, emailUser) => {
                            if(emailError) {
                                res.send(JSON.stringify({ success: false, message: 'Error on finding the user. (2)' }));
                            }
                            else {
                                if(!emailUser) {
                                    res.send(JSON.stringify({ errors: [
                                        { param: 'username', msg: 'Invalid username or password.' },
                                        { param: 'password', msg: 'Invalid username or password.' }
                                    ]}));
                                }
                                else {
                                    loginUser(res, emailUser, req.body.password);
                                }
                            }
                        });
                    } else {
                        loginUser(res, usernameUser, req.body.password);
                    }
                }
            });
        }
    }

};