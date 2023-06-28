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

exports.selectAllArticles = () => {
 
  const query = "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.author_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC "; 

  return db.query(query).then(({ rows }) => {
    console.log(rows)


    return rows;
  });
};
