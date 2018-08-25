const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Schema Definition - BREAD
let BreadSchema = new Schema({
    name: String,
    imgSrc: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    recipeLink: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    },
    directionLink: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Directions"
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model("Bread", BreadSchema);