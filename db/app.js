const express = require("express");
const app = express();
const db = require("../db/connection");
const seed = require("../db/seeds/seed");


const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors/errors");

app.use(express.json());

const {handlePsqlErrors, handleCustomErrors, handleServerErrors } = require("./errors/errors");


const { getAllTopics, getEndpointData , getArticleById, getArticleComments, postArticleComments} = require("./controllers/app.controller");




const {
  getAllTopics,
  getEndpointData,
  getArticleById,
  getAllArticles,
  patchArticleVotes,
} = require("./controllers/app.controller");
app.use(express.json());
app.get("/api/topics", getAllTopics);
app.get("/api", getEndpointData);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getAllArticles);
app.patch("/api/articles/:article_id", patchArticleVotes);

app.post("/api/articles/:article_id/comments", postArticleComments)
app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
