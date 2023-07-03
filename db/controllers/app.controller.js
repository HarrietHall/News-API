

const db = require("../connection");
const endpointData = require("../../endpoints.json");


const {
selectAllTopics,
selectArticleById,
selectAllArticles,
selectArticleComments,
insertArticleComments,
selectArticleVotes,
selectCommentById,
selectAllUsers
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

exports.getAllArticles = (req, res, next) => {
    const {topic, sort_by, order} = req.query

selectAllArticles(topic, sort_by, order)
.then((article) => {
res.status(200).send({ article });
})
.catch(next);
};


exports.getArticleComments = (req, res, next) => {
const { article_id } = req.params;
const promises = [
selectArticleById(article_id),
selectArticleComments(article_id),
];


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
.catch(next);
};


exports.patchArticleVotes = (req, res, next) => {
const { article_id } = req.params;
const { inc_votes } = req.body.newVotes;


selectArticleVotes(article_id, inc_votes)
.then((article) => {
res.status(200).send({ article });
})
.catch(next);
};


exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;


selectCommentById(comment_id)
.then(() => {
res.status(204).send({ msg: "No Content" });
})
.catch(next);
};

exports.getUsers = (req, res, next) => {

  selectAllUsers()
  .then((users) => {
  res.status(200).send({ users });
  })
  .catch(next);
  };
  
  
  