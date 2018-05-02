const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const itemRouter = require("./routes/item-routes");

    // for deploying to Heroku
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

//middleware
app.use(bodyParser.json());

// for deploying to Heroku
app.use(express.static(path.join(__dirname, "client", "build")));

//routes
app.use("/items", itemRouter);




// database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/advice", err => {
    if(err) throw (err);
    console.log(`Connected to MongoDB via Mongoose on port 27017.`)
});

// default for Router per Redux docs

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/public/index.html'), (err) => {
//         if (err) {
//           res.status(500).send(err)
//         }
//       })
// })

    // for deploying to Heroku
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(port, () => console.log(`Server running on port ${port}`));
