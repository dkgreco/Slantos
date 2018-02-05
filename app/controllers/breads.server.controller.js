exports.renderIndex = function(req, res) {
    let mockData = [
        {title: 'Challah', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Challah_Bread_Six_Braid_1.JPG/1280px-Challah_Bread_Six_Braid_1.JPG'},
        {title: 'Brioche', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Brioche.jpg'},
        {title: 'Poolish', image: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Pain-poolish1.JPG'},
    ];

    if (req.session.lastVisit) {
        console.log('User Last Visit: ', req.session.lastVisit);
    }

    req.session.lastVisit = new Date();

    res.render('breadsIndex', {
        title: 'Slantos',
        userFullName: req.user ? req.user.fullName : '',
        user: req.user,
        breadsList: mockData
    });
};

exports.addBread = function(req, res) {
    res.send('hit the post route');
};

exports.renderNewBreadForm = function(req, res) {
    res.render('newBreadForm');
};