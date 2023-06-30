const db = require("../connection");

exports.selectAllTopics = () => {
  const query = "SELECT * FROM topics ";

  return db.query(query).then(({ rows }) => {
    return rows;
  });
};

exports.selectArticleById = (article_id) => {
  const query = "SELECT * FROM articles WHERE article_id = $1";

  return db.query(query, [article_id]).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return rows[0];
  });
};



exports.selectArticleComments = (article_id) => {
  const query =
    "SELECT * FROM comments WHERE article_id = $1 ORDER BY comments.created_at DESC";

  return db.query(query, [article_id]).then(({ rows }) => {
    if (!rows.length) {
      return Promise.resolve({ comments: `${rows}`,status: 200, msg: "No comments found" });
    }

    return rows;

  });


exports.insertArticleComments = (article_id, newComment) => {
  const { username, body } = newComment;

  const query =
    "INSERT INTO comments ( body, author, article_id) VALUES ($1, $2, $3) RETURNING *; ";
  const queryValues = [body, username, article_id];

  return db.query(query, queryValues).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return rows[0];
  })