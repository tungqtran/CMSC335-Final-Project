"use strict";

const express = require("express");
const app = express();
const path = require("path");
const portNumber = 7003;
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/game", (req, res) => {
    res.render("gameScreen", {});
});

app.listen(portNumber, () => {
    console.log(`Server running on http://localhost:${portNumber}`);
});