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

exports.insertArticleComments = (article_id, newComment) => {
  const { username, body } = newComment;
const queryValues = []
  const query =
"INSERT INTO comments ( body, author, article_id) VALUES ($1, $2, $3) RETURNING *; "
queryValues.push(body, username, article_id);


  return db.query(query, queryValues).then(({ rows }) => {
     return rows[0];
  });
};
