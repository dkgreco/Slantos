const Bread = require('mongoose').model('Bread'),
    Recipe = require('mongoose').model('Recipe'),
    Directions = require('mongoose').model('Directions'),
    virtual = require('./../../config/virtuals');

function _buildItemObj(data) {
    let itemArr = [];
    for (let i = 0; i < data.length; i += 1) {
        let itemObj = {};
        itemObj.item = {};
        itemObj.item.unit = data[i];
        itemObj.item.amtType = data[++i];
        itemObj.item.name = data[++i];

        itemArr.push(itemObj);
    }
    return itemArr;
}

function _buildDirectionObj(data) {
    let directionArr = [];
    for (let i = 0; i < data.length; i += 1) {
        let directionsObj = {};
        directionsObj.step = {};
        directionsObj.step.val = i;
        directionsObj.step.description = data[i];
        directionArr.push(directionsObj);
    }
    return directionArr;
}

exports.getIndexRoute = function(req, res) {
    Bread.find({}, function(err, allBreads) {
         if (err) return console.log(err);
         let data = {
             title: 'Slantos',
             userFullName: req.user ? req.user.fullName : '',
             breadsList: allBreads
         };
         res.render('breads/index', data);
    });
};

exports.getNewRoute = function(req, res) {
    req.body.recipe.ingredients = _buildItemObj(req.body.recipe.ingredients);
    req.body.recipe.directions = _buildDirectionObj(req.body.recipe.directions);
    let breadObj = {
        name: req.body.recipe.name,
        imgSrc: req.body.recipe.imgSrc,
        description: req.body.recipe.description,
        comments: [],
        recipeLink: null,
        directionLink: null
    };

    Bread.create(breadObj, function(err, addedBread){
        if (err) return console.log(err);
        let recipeObj = {
            recipeFor: addedBread._id,
            sAmt: req.body.recipe.sAmt,
            ingredients: req.body.recipe.ingredients
        };
        Recipe.create(recipeObj, function(err, addedRecipe) {
            if (err) return console.log(err);
            addedBread.recipeLink = addedRecipe._id;
            addedBread.save();
            let directionObj = {
                directions: req.body.recipe.directions
            };
            Directions.create(directionObj, function(err, addedDirections) {
                if (err) return console.log(err);
                addedBread.directionLink = addedDirections._id;
                addedBread.save();
                res.redirect('/breads');
            });
        });
    });
};

exports.getCreateRoute = function(req, res) {
    res.render('breads/create');
};

exports.getShowRoute = function(req, res) {
    Bread.findById(req.params.id, function(err, recordExists) {
        if (recordExists === null) return res.render('pageNotFound');
        Bread.findById(req.params.id)
            .populate('recipeLink')
            .populate('directionLink')
            .populate('comments')
            .exec(function (err, recordFound) {
                if (err) {
                    req.flash('error', err);
                    return res.render('pageNotFound');
                }
                recordFound.generalRating = virtual.getGeneralRating(recordFound.comments);
                recordFound.comments = virtual.getDaysElapsed(recordFound.comments);
                res.render('breads/show', {user: req.user, inq: recordFound});
            });
    });
};

exports.getDestroyPost = function(req, res) {
    Bread.findByIdAndRemove(req.params.id, function(err, recordDeleted) {
        if (err) {
            req.flash('error', 'Failed To Remove Post');
            res.redirect('/breads');
        }
        req.flash('success', 'Post Successfully Removed');
        res.redirect(`/breads`);
    });
};