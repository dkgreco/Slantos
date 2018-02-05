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

    app.use(bodyParser.json()); //DO NOT PARSE TO XML UNLESS YOU WANT TO WRITE NEW CODE AND BLEEDING EYES
    app.use(methodOverride());

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

    // Register Route Handlers
    require('../app/routes/index.server.routes')(app);
    require('../app/routes/users.server.routes')(app);
    require('../app/routes/breads.server.routes')(app);

    // Register the Static Assets Last for I/O Ops reasons
    app.use(express.static('./public'));

    return app;
};
