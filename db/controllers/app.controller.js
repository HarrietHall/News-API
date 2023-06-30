const db = require("../connection");
const endpointData = require("../../endpoints.json");

const {
  selectAllTopics,
  selectArticleById,
  selectArticleComments,
  insertArticleComments

} = require("../models/app.model");

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
  const { article_id } = req.params;

  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};



exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  const promises = [selectArticleById(article_id), selectArticleComments(article_id)];

  Promise.all(promises)

    .then((resolvedPromises) => {
      const comments = resolvedPromises[1];

      res.status(200).send({ comments });
    })


    .catch(next);
};

exports.postArticleComments = (req, res, next) => {
  const newComment = req.body;
  const { article_id } = req.params;

  insertArticleComments(article_id, newComment)
    .then((comment) => {
      res.status(201).send({ comment });
    })