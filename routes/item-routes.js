const express = require("express");
const itemRouter = express.Router();
const ItemModel = require("../models/item-model");

itemRouter.route("/")
    .get((req, res) => {
        ItemModel.find(req.query, (err, foundItem) => {
            if (err) res.send(err);
            else res.status(200).send(foundItem);
        })
    })
    .post((req, res) => {
        const newItem = new ItemModel(req.body);
        newItem.save((err, addedItem) => {
            if (err) res.send(err);
            else res.status(201).send(addedItem);
        })
    });

itemRouter.route("/:id")
    .get((req, res) => {
        ItemModel.findOne({ _id: req.params.id }, (err, foundItem) => {
            if (err) return res.send(err);
            if (!foundItem) return res.status(404).send({ message: "Not found" });
            res.status(200).send(foundItem);
        })
    })
    .delete((req, res) => {
        ItemModel.findOneAndRemove({ _id: req.params.id }, (err, deletedItem) => {
            if (err) return res.send(err);
            if (!deletedItem) return res.status(404).send({ message: "Not found" });
            res.status(200).send(`${deletedItem.title} was deleted.`);
        })
    })
    .put((req, res) => {
        ItemModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedItem) => {
            if (err) return res.send(err);
            if (!updatedItem) return res.status(404).send({ message: "Not found" });
            res.status(200).send(updatedItem);
        });
    })

itemRouter.route("/:id/comments")
    .put((req, res) => {
        ItemModel.findOneAndUpdate({ _id: req.params.id }, {$set: {comments: req.body.comments}}, { new: true }, (err, updatedItem) => {
            if (err) return res.send(err);
            if (!updatedItem) return res.status(404).send({ message: "Not found" });
            res.status(200).send(updatedItem);
        });
    })

module.exports = itemRouter;