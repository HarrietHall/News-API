const express = require("express");
const app = express();
const db = require("../db/connection");
const seed = require("../db/seeds/seed");

const { getAllTopics } = require("./controllers/app.controller");

app.get("/api/topics", getAllTopics);

module.exports = app;
