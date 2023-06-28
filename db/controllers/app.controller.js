const db = require("../connection");
const endpointData = require("../../endpoints.json");

const {
  selectAllTopics,
  selectArticleById,
  insertArticleComments,
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

exports.postArticleComments = (req, res, next) => {
  const newComment = req.body;
  const { article_id } = req.params;

  const promises = [selectArticleById(article_id)];
  if (article_id) {
    promises.push(insertArticleComments(newComment));
  }
  Promise.all(promises)

    .then((resolvedPromises) => {
      console.log(resolvedPromises);
      const comment = resolvedPromises[1]
      res.status(201).send({ comment });
    })

    .catch(next);
};
