const Comment = require('mongoose').model('Comment');

module.exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please Log In First!');
    res.redirect('/signin');
};

module.exports.isAuthorizedForComments = function(req, res, next) {
    Comment.findById(req.params.cid, function (err, commentFound) {
        if (err) {
            req.flash('error', 'You are not authorized to perform that action.');
            res.redirect('back');
        }
        if (commentFound.author.userid.equals(req.user._id)) {
            return next();
        }
        res.redirect('back');
    });
};