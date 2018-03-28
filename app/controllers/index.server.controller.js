exports.render = function(req, res) {
    if (req.session.lastVisit) {
        console.log('User Last Visit: ', req.session.lastVisit);
    }

    req.session.lastVisit = new Date();

    res.render('landing', {
        title: 'Slantos Bread Community',
        userFullName: req.user ? req.user.fullName : ''
    });
};