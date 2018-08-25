module.exports = function(app) {
    let index = require('../controllers/analytics.server.controller');
    app.get('/analyticsDrive', index.render);
};