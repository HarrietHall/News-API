const db = require("../connection");
const endpointData = require("../../endpoints.json");

const { selectAllTopics, selectArticleById, selectAllArticles } = require("../models/app.model");

exports.getAllTopics = (req, res, next) => {
  selectAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.getEndpointData = (req, res, next) => {
  res.status(200).send({ endpointData });
};



exports.getArticleById = (req, res, next) => {

const {article_id} = req.params

selectArticleById(article_id)
.then((article) => {
  res.status(200).send({ article });
})
.catch(next);
};



exports.getAllArticles = (req, res, next) => {
  selectAllArticles()
    .then((article) => {
    res.status(200).send({ article });
  })
  .catch(next);
  };



