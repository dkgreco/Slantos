const users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
    // Auth Pages - Twitter Strategy
    app.get('/oauth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }));

    app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));

    // Auth Pages - Google Strategy
    app.get('/oauth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile'
        ]
    }));

    app.get('/oauth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));

    // Auth Pages - Facebook Strategy
    app.get('/oauth/facebook', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }));

    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));

    // Auth Pages - Local Strategy
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);

    app.route('/signin')
        .get(users.renderSignin)
        .post(
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/signin',
                failureFlash: true
            })
        );

    app.get('/signout', users.signout);

    // CRUD API - Use Postman
    app.route('/users')
        .get(users.list);

    app.route('/users/new')
        .post(users.create);

    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);

      app.param('userId', users.userByID);
};