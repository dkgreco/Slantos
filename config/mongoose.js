const config = require('./config'),
    mongoose = require('mongoose');

// Override the deprecated promise lib with the regular js engine promise lib
mongoose.Promise = global.Promise;

module.exports = function() {
    let db = mongoose.connect(config.db, {useMongoClient: true});
    require('../app/models/user.server.model');
    return db;
};