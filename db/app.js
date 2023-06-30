const express = require("express");
const app = express();
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
app.use(express.json());

const {handlePsqlErrors, handleCustomErrors, handleServerErrors } = require("./errors/errors");


const { getAllTopics, getEndpointData , getArticleById, postArticleComments} = require("./controllers/app.controller");



app.get("/api/topics", getAllTopics);
app.get("/api", getEndpointData)
app.get("/api/articles/:article_id", getArticleById)
app.get("/api/articles/:article_id/comments", getArticleComments)

app.post("/api/articles/:article_id/comments", postArticleComments)
app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});
app.use(handlePsqlErrors)
app.use(handleCustomErrors)
app.use(handleServerErrors);




module.exports = app;
