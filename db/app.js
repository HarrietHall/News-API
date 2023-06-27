const express = require("express");
const app = express();
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const { handleServerErrors } = require("./errors/errors");

const { getAllTopics, getEndpointData } = require("./controllers/app.controller");

app.get("/api/topics", getAllTopics);
app.get("/api", getEndpointData)


app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});
app.use(handleServerErrors);





module.exports = app;
