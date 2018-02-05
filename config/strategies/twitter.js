const passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = function() {
  passport.use(new TwitterStrategy({
      consumerKey: config.twitter.clientID,
      consumerSecret: config.twitter.clientSecret,
      callbackURL: config.twitter.callbackURL,
      passReqToCallback: true
  }, function(req, token, tokenSecret, profile, done) {
      let providerData = profile._json;
      providerData.token = token;
      providerData.tokenSecret = tokenSecret;

      console.log('twitter profile: ', profile);

      let providerUserProfile = {
          fullName: profile.displayName,
          email: 'ts-oauth@dummy.com',
          username: profile.username,
          provider: 'twitter',
          providerId: profile.id,
          providerData: providerData
      };

      let nameArr = providerUserProfile.fullName.split(' ');
      providerUserProfile.firstName = nameArr[0];
      if (nameArr.length > 2) {
          providerUserProfile.lastName = nameArr[2];
      } else {
          providerUserProfile.lastName = nameArr[1];
      }

      users.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
};