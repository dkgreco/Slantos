module.exports = function(app) {
    let index = require('../controllers/pageNotFound.server.controller');
    app.get('*', index.render);
};