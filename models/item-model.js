const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
    author: {
        required: true,
        type: String
    },
    title: String,
    summary: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    refUrl: String,
    imgUrl: String,
    flagged: Boolean,
    votes: Number,
    comments: [String]
},{timestamps: true});

const ItemModel = mongoose.model("items", itemSchema);
module.exports = ItemModel;
