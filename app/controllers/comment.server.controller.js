const Bread = require('mongoose').model('Bread'),
    Comment = require('mongoose').model('Comment');

exports.getNewRoute = function(req, res) {
    Bread.findById(req.params.id, function(err, recordFound) {
       if (err) {
            req.flash('errMsg', 'Bread Not Found');
            res.redirect('/breads');
       }
       Comment.create(req.body.comment, function(err, commentCreated) {
           if (err) {
               req.flash('error', 'Unable to create review.');
               res.redirect(`/breads/${req.params.id}`);
           }
           commentCreated.author.userid = req.user.id;
           commentCreated.author.username = req.user.username;
           commentCreated.save();
           recordFound.comments.push(commentCreated);
           recordFound.save();
           req.flash('success', 'Review Added!');
           res.redirect(`/breads/${req.params.id}`);
       });
    });
};

exports.getCreateRoute = function(req, res) {
    Bread.findById(req.params.id, function(err, recordFound) {
        if (err) {
            req.flash('error', 'Database Record Not Found For Bread1');
        }
        res.render('comments/create', {bread: recordFound});
    });
};

exports.getUpdateFormRoute = function(req, res) {
    let data = {
        bread: null,
        cData: null
    };
    Bread.findById(req.params.id, function(err, recordFound) {
        if (err) return console.log(err);
        data.bread = recordFound;
        Comment.findById(req.params.cid, function(err, commentFound) {
            if (err) {
                req.flash('error', 'Review Not Found');
                res.redirect('back');
            }
            data.cData = commentFound;
            res.render('comments/update', data);
        });
    });
};

exports.getUpdateRoute = function(req, res) {
    Comment.update({ _id: req.params.cid }, req.body.comment, function(err, recordUpdated) {
        if (err) {
            req.flash('error', 'Failed To Edit Review');
        }
        req.flash('success', 'Review Successfully Edited');
        res.redirect(`/breads/${req.params.id}`);
    });
};

exports.getDestroyRoute = function(req, res) {
    Comment.findByIdAndRemove(req.params.cid, function(err, recordDeleted) {
        if (err) {
            req.flash('error', 'Failed To Remove Review');
            res.redirect('back');
        }
        req.flash('success', 'Review Successfully Removed');
        res.redirect(`/breads/${req.params.id}`);
    });
};