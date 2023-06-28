const db = require("../connection");
const endpointData = require("../../endpoints.json");

const {
  selectAllTopics,
  selectArticleById,
  selectArticleComments,
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
  const promises = [selectArticleComments(article_id)];

  if (article_id) {
    promises.push(selectArticleById(article_id));
  }
  Promise.all(promises)

    .then((resolvedPromises) => {
      const comments = resolvedPromises[0];

      res.status(200).send({ comments });
    })

    .catch(next);
};
