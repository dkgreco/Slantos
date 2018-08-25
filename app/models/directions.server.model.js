const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let DirectionSchema = new Schema({
    directions: [
        {   step: {
                val: String,
                description: String
            }
        }
    ]
});

mongoose.model("Directions", DirectionSchema);