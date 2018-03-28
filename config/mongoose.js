const config = require('./config'),
    mongoose = require('mongoose');

// Override the deprecated promise lib with the regular js engine promise lib
mongoose.Promise = global.Promise;

module.exports = function() {
    let db = mongoose.connect(config.db, {useMongoClient: true});
    require('../app/models/user.server.model');
    require('../app/models/bread.server.model');
    require('../app/models/comment.server.model');
    require('../app/models/recipe.server.model');
    require('../app/models/directions.server.model');

    return db;
};