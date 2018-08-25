const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let CommentSchema = new Schema({
    text: String,
    rating: String,
    author: {
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model("Comment", CommentSchema);