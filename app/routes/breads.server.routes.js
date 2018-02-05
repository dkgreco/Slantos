module.exports = function(app) {
    let breads = require('../controllers/breads.server.controller');
    app.get('/breads', breads.renderIndex);

    app.post('/breads', breads.addBread);

    app.get('/breads/new', breads.renderNewBreadForm);
};