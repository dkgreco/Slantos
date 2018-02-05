const passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = function() {
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        passReqToCallback: true
    }, function(req, accessToken, refreshToken,  profile, done) {
        let providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        let providerUserProfile = {
            firstName: '',
            lastName: '',
            fullName: '',
            email: '',
            username: '',
            provider: 'facebook',
            providerId: profile.id,
            providerData: providerData
        };

        // Build the values but perform null checks in the instance a custom object needs to be built.
        try {
            providerUserProfile.firstName = profile.name.givenName ? profile.name.givenName : '';
            providerUserProfile.lastName = profile.name.familyName ? profile.name.familyName : '';
            providerUserProfile.fullName = profile.displayName ? profile.displayName : '';
            providerUserProfile.email = profile.emails[0].value ? profile.emails[0].value : '';
            providerUserProfile.username = profile.username ? profile.username : '';
        } catch (e) {
            if (
                (providerUserProfile.firstName === '' || providerUserProfile.familyName === '') &&
                providerUserProfile.fullName !== ''
            ) {
                let nameArr = providerUserProfile.fullName.split(' ');
                providerUserProfile.firstName = nameArr[0];
                if (nameArr.length > 2) {
                    providerUserProfile.lastName = nameArr[2];
                } else {
                    providerUserProfile.lastName = nameArr[1];
                }
                providerUserProfile.username =
                    `${providerUserProfile.firstName.charAt(0).toLowerCase()}${providerUserProfile.lastName}_fs`;
                providerUserProfile.email = 'fb-oauth@dummy.com';
            }
        }

        users.saveOAuthUserProfile(req, providerUserProfile, done);
    }));
};