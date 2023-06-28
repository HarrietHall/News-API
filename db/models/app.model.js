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

exports.insertArticleComments = (newComment) => {
  const query = "SELECT * FROM articles WHERE article_id = $1";

  return db.query(query, [article_id]).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
 

  const { username, body } = newComment;

  return db
    .query(
      "INSERT INTO comments (username, body VALUES ($1, $2 RETURNING *; ",
      [username, body]
    )

    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }

      return response.rows[0];
    });
};
