const express = require("express");
const app = express();
const db = require("../db/connection");
const seed = require("../db/seeds/seed");


const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors/errors");

const {
  getAllTopics,
  getEndpointData,
  getArticleById,
  getAllArticles,
  getArticleComments,
  postArticleComments,
  patchArticleVotes,
  deleteCommentById
} = require("./controllers/app.controller");

app.use(express.json());
app.get("/api/topics", getAllTopics);





app.get("/api", getEndpointData);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.get("/api/articles", getAllArticles);
app.post("/api/articles/:article_id/comments", postArticleComments);
app.patch("/api/articles/:article_id", patchArticleVotes);
app.post("/api/articles/:article_id/comments", postArticleComments);
app.delete("/api/comments/:comment_id", deleteCommentById)
app.get("/api/users", getUsers)

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
