const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let RecipeSchema = new Schema({
    recipeFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bread"
    },
    sAmt: {
        type: String
    },
    ingredients: [
        {
            item: {
                unit: String,
                name: String,
                amtType: String
            }
        }
    ],
    wash: {
        type: String
    },
    extraInstructions: {
        type: String
    }
});

mongoose.model("Recipe", RecipeSchema);