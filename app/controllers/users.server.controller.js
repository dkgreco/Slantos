let User = require('mongoose').model('User'),
    passport = require('passport');

const _getErrorMessage = function(err) {
    let message = '';
    console.log('inside _getErrorMessage(err): ', err);

    try {
        if (err.code) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists.';
                    break;
                default:
                    message = 'Indeterminate Auth Error. Please contact the sys admin.';
            }
        } else {
            for (let errName in err.errors) {
                if (err.errors[errName].message) {
                    message = err.errors[errName].message;
                }
            }
            return message;
        }
    } catch (e) {
        console.log('error caught, returning empty string');
        return '';
    }

};

// AUTH Ops - OAUTH Strategy For Facebook and Google
exports.saveOAuthUserProfile = function(req, res, next) {
    let profile = res;
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function (err, user, res){
        if (err) {
            return next(err);
        } else {
            if (!user) {
                let possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
                if (possibleUserName = '') {
                    console.log('try to build a username from the fullname, as well as a full user profile');
                }

                User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
                    profile.username = availableUsername;
                    profile.role = 'user';

                    user = new User(profile);

                    user.save(function(err) {
                        //let message = _getErrorMessage(err);
                        //req.flash('error', message);
                        return next(err, user);
                    });
                    return next(err, user);
                });
            } else {
                return next(err, user);
            }
        }
    });
};

// AUTH Ops - Local Strategy
exports.renderSignin = function(req, res, next) {
    if (!req.user) {
        res.render('signin', {
            title: 'Sign-In Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderSignup = function(req, res, next) {
    if (!req.user) {
        res.render('signup', {
            title: 'Sign Up Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

exports.signup = function(req, res, next) {
    if (req.user === undefined) {
        let user = new User(req.body),
            message = null;

        user.provider = 'local';

        user.save(function(err) {
            if (err) {
                console.log('error encountered.', err);
                message = _getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/');
            }
            req.login(user, function(err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.signout = function(req, res) {
    req.logOut();
    res.redirect('/');
};

// CRUD OPS
exports.create = function(req, res, next) {
    let user = new User(req.query);
    user.save(function(err){
        if(err) {
            return next(err);
        } else {
            res.json(user);
        }
    })
};

exports.list = function(req, res, next) {
    User.find({}, '-password -salt', function(err, users) {
       if(err) {
           return next(err);
       } else {
           res.json(users);
       }
    });
};

exports.read = function(req, res, next) {
    res.json(req.user);
};

exports.userByID = function(req, res, next) {
    User.findOne({
        _id: req.params.userId
    }, '-password -salt', function(err, user) {
        if(err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user._id, req.query, function(err, user) {
        if(err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.delete = function(req, res, next) {
    req.user.remove(function(err) {
        if(err) {
            return next(err);
        } else {
            res.json(req.user);
        }
    });
};