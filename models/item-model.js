const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
    author: String,
    title: String,
    summary: String,
    type: String,
    votes: Number,
    comments: [String]
});

const ItemModel = mongoose.model("items", itemSchema);
module.exports = ItemModel;
