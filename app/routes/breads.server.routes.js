const middleware = require('./../../config/middleware'),
    breads = require('../controllers/breads.server.controller'),
    {isLoggedIn} = middleware;
module.exports = function(app) {
    //Index Route - Show List of Breads
    app.get('/breads', breads.getIndexRoute);

    //New Route - Creates Bread and Redirects to Index
    app.post('/breads', isLoggedIn, breads.getNewRoute);

    //Create Route - Show Form to Add New Bread
    app.get('/breads/new', isLoggedIn, breads.getCreateRoute);

    //Show Route - Shows Info about Specific Bread
    app.get('/breads/:id', breads.getShowRoute);

    //Destroy Route - Deletes the Post
    app.delete('/breads/:id', isLoggedIn, breads.getDestroyPost);
};