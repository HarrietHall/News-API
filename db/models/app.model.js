const db = require("../connection");

exports.selectAllTopics = () => {
  const query = "SELECT * FROM topics ";

  return db.query(query).then(({ rows }) => {
    return rows;
  });
};

exports.selectArticleById = (article_id) => {
  const paramValues = [];
  const query = "SELECT * FROM articles WHERE article_id = $1";
  paramValues.push(article_id);

  return db.query(query, paramValues).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return rows;
  });
};
