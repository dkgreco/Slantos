module.exports = {
    // Development Configuration Options
    db: 'mongodb://localhost/slantos-dev',
    sessionSec: 'd3VeL0PM3Nt-1711',
    facebook: {
        clientID: '1768165826821819',
        clientSecret: 'e09e832202aeb06baad3359748c432ac',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
    google: {
        clientID: '179961357504-or7hqdf342h1cv7r5fr9r8qkccr17lgd.apps.googleusercontent.com',
        clientSecret: 'XOTOHAB0brFIHcApgrfJBCAR',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    },
    twitter: {
        clientID: 'clientID',
        clientSecret: 'ClientSecret',
        callbackURL: 'http://localhost:3000/oauth/twitter/callback'
    }
};