const middleware = require('./../../config/middleware'),
    {isLoggedIn, isAuthorizedForComments, confirmDeletion} = middleware;

module.exports = function(app) {
    let comments = require('../controllers/comment.server.controller');

    //New Route - Creates Comment and Redirects to Specific Bread Page
    app.post('/breads/:id/comments', isLoggedIn, comments.getNewRoute);

    //Create Route - Shows the Create Comment Form
    app.get('/breads/:id/comments/new', isLoggedIn, comments.getCreateRoute);

    //Update Route - Shows the Update Comment Form
    app.get('/breads/:id/comments/:cid/edit', isLoggedIn, isAuthorizedForComments, comments.getUpdateFormRoute);
    app.put('/breads/:id/comments/:cid', isLoggedIn, isAuthorizedForComments, comments.getUpdateRoute);

    //Destroy Route - Deletes the User Comment and Redirects to Specific Bread Page
    app.delete('/breads/:id/comments/:cid', isLoggedIn, isAuthorizedForComments, comments.getDestroyRoute);
};