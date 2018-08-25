const users = require('../../app/controllers/users.server.controller');

exports.render = function(req, res) {
    if (req.session.lastVisit) {
        console.log('User Last Visit: ', req.session.lastVisit);
    }

    req.session.lastVisit = new Date();

    res.render('landing', {
        title: 'Slantos Bread Community',
        userFullName: req.user ? req.user.fullName : ''
    });
};

exports.renderAbout = function(req, res) {
    res.render('about');
};

exports.renderACHome = function(req, res) {
    res.render('accountConfig/home', {u: req.user});
};

exports.deleteAccount = function(req, res) {
    users.delete(req, res);
};