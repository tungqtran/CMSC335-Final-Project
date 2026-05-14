"use strict";

const express = require("express");
const app = express();
const path = require("path");
const portNumber = 4000;
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

const session = require("express-session"); // new package, npm i express-session

require("dotenv").config({
   path: path.resolve(__dirname, "public/.env"),
   quiet: true,
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


app.use(session({
    secret: process.env.SESSION_SECRET || "fallback-secret-change-me",
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({ mongoUrl: process.env.MONGO_CONNECTION_STRING }),
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));



app.get("/", async (req, res) => {
    res.render("homepage", { });
});

app.get("/register", (req, res) => {
    res.render("register", { error: null });
});

app.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.render("register", { error: "already existing user"});
        }

        const user = await User.create({email, password});
        req.session.userId = user._id;
        res.redirect("/homepage");
    } catch (err) {
        console.error(err);
        res.render("register", { error: "bad registrarion ertoer (error)"});
    }
});

app.get("/login", (req, res) => {
    if (req.session.userId) { return res.redirect("/game"); }
    res.render("login", { error: null });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if (!user || user.password !== password) {
            return res.render("login", {error: "invalid login test"});
        }
        req.session.userId = user._id;
        res.redirect("/game");
    } catch (err) {
        console.log(err);
        res.render("login", { error: "another catch error"});
    }
});

app.get("/game", (req, res) => {
    res.render("gameScreen", {});
});

app.get("/profile", (req, res) => {
    res.render("profile", {})
})

app.get("/leaderboard", (req, res) => {
    res.render("leaderboard", {})
})

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