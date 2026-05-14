"use strict";

const express = require("express");
const app = express();
const path = require("path");
const portNumber = 7003;
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

require("dotenv").config({
   path: path.resolve(__dirname, "credentialsDontPost/.env"),
});

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    score: Number,
    pokemon: [{name: String, sprite: String}]
});

const User = mongoose.model("User", userSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/game", (req, res) => {
    res.render("gameScreen", {});
});

app.post("/addPokemon", (req, res) => {
    // check the user session
    if (req.session.user != undefined) {
        let data = JSON.parse(req.body);
        // add to DB based on the session user
    } else {
        // redirect to login
    }
    
})

app.listen(portNumber, () => {
    console.log(`Server running on http://localhost:${portNumber}`);
});