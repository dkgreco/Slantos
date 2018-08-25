module.exports = function(app) {
    let index = require('../controllers/index.server.controller');
    app.get('/', index.render);
    app.get('/about', index.renderAbout);
    app.get('/accountConfigHome', index.renderACHome);
    app.delete('/accountConfigHome/deleteAccount/:id', index.deleteAccount);
};