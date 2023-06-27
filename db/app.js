const express = require("express");
const app = express();
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const { handleServerErrors } = require("./errors/errors");

const { getAllTopics } = require("./controllers/app.controller");

app.get("/api/topics", getAllTopics);

app.use(handleServerErrors);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

module.exports = app;
