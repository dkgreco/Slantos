let mongoose = require("mongoose");
let Bread = mongoose.model("Bread");
let Comment = mongoose.model("Comment");

let data = [
    {
        name: "Challah",
        imageSource: "https://bigoven-res.cloudinary.com/image/upload/t_recipe-256/challah-4.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Brioche",
        imageSource: "https://bigoven-res.cloudinary.com/image/upload/t_recipe-256/light-brioche-hamburger-buns-00e58008af606980f35acbcf.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "French Baguette",
        imageSource: "http://images.bigoven.com/image/upload/t_recipe-256/cayenne-corn-bread-sticks-2.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

function seedDB(){
    //Remove all breads
    Bread.remove({}, function(err){
        if(err){
            console.log(err);
        }
        /*console.log("removed all bread recipes!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed all comments!");
            //add a few breads
            data.forEach(function(seed){
                Bread.create(seed, function(err, breadRecipe){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a recipe");
                        //create a comment
                        Comment.create(
                            {
                                text: "This bread was delicious...",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    breadRecipe.comments.push(comment._id);
                                    breadRecipe.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });*/
    });
    //add a few comments
}

module.exports = seedDB;