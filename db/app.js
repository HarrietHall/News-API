const express = require("express");
const app = express();
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const {handlePsqlErrors, handleCustomErrors, handleServerErrors } = require("./errors/errors");

const { getAllTopics, getEndpointData , getArticleById, getAllArticles, getUsers} = require("./controllers/app.controller");

app.get("/api/topics", getAllTopics);
app.get("/api", getEndpointData)
app.get("/api/articles/:article_id", getArticleById)
app.get("/api/articles", getAllArticles)
app.get("/api/users", getUsers)



app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});
app.use(handlePsqlErrors)
app.use(handleCustomErrors)
app.use(handleServerErrors);





module.exports = app;
