const config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('passport');

module.exports = function() {
    // Register the Application
    const app = express();

    // Register the Middleware
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json()); //DO NOT PARSE TO XML UNLESS YOU WANT TO WRITE NEW CODE AND HAVE YOUR EYE BLEED
    app.use(methodOverride("_method"));

    app.use(session({
        secret: config.sessionSec,
        resave: true,
        saveUninitialized: true
    }));

    // Register Express Runtime Options
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    // Set the Flash Connect Middleware
    app.use(flash());

    // Set the Passport Middleware
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function(req, res, next) {
       res.locals.user = req.user;
       res.locals.errMsg = req.flash('error');
       res.locals.sucMsg = req.flash('success');
       res.locals.comments = [];
       next();
    });

    // Register Route Handlers
    require('../app/routes/index.server.routes')(app);
    require('../app/routes/users.server.routes')(app);
    require('../app/routes/breads.server.routes')(app);
    require('../app/routes/comments.server.routes')(app);
    require('../app/routes/analytics.server.routes')(app);

    // Register the Static Assets Last for I/O Ops reasons
    app.use(express.static('public'));

    require('../app/routes/pageNotFound.server.routes')(app);

    return app;
};
