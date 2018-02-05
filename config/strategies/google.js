const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = function() {
    passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        passReqToCallback: true
    }, function(req, accessToken, refreshToken,  profile, done) {
        let providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        console.log('google returned profile: ', profile);

        let providerUserProfile = {
            firstName: '',
            lastName: '',
            fullName: '',
            email: '',
            username: '',
            provider: 'google',
            providerId: profile.id,
            providerData: providerData
        };

        // Build the values but perform null checks in the instance a custom object needs to be built.
        try {
            providerUserProfile.firstName = profile.name.givenName ? profile.name.givenName : '';
            providerUserProfile.lastName = profile.name.familyName ? profile.name.familyName : '';
            providerUserProfile.fullName = profile.displayName ? profile.displayName : '';
            providerUserProfile.email = 'gs-oauth@dummy.com';
            providerUserProfile.username = profile.username ? profile.username : '';
            if (providerUserProfile.username === '' &&
                (providerUserProfile.firstName !== '' && providerUserProfile.lastName !== '')) {
                providerUserProfile.username =
                    `${providerUserProfile.firstName.charAt(0).toLowerCase()}${providerUserProfile.lastName.toLowerCase()}_gs`;
            }

            console.log('providerUserProfile: ', providerUserProfile);
        } catch (e) {
            console.log('error: ', e);
        }

        users.saveOAuthUserProfile(req, providerUserProfile, done);
    }));
};