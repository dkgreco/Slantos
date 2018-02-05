process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('./config/express'),
    mongoose = require('./config/mongoose'),
    passport = require('./config/passport'),
    db = mongoose(),
    pp = passport(),
    app = express();

app.listen(3000, () => console.log(`Slantos Server Started in ${process.env.NODE_ENV} mode.`));
module.exports = app;
