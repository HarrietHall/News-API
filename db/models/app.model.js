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
  const query =
    "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC ";

  return db.query(query).then(({ rows }) => {
    return rows;
  });
};


exports.selectArticleComments = (article_id) => {
  const query =
  "SELECT * FROM comments WHERE article_id = $1 ORDER BY comments.created_at DESC";
  
  
  return db.query(query, [article_id]).then(({ rows }) => {
  if (!rows.length) {
  return Promise.resolve({ comments: `${rows}`, status: 200, msg: "No comments found" });
  }
  
  
  return rows;
  });
  };
  



exports.insertArticleComments = (article_id, newComment) => {

  const { username, body } = newComment;

  const query =
    "INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *; ";
  const queryValues = [body, username, article_id];

  return db.query(query, queryValues).then(({ rows }) => {
   
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return rows[0];
  });
};

exports.selectArticleVotes = (article_id, inc_votes) => {
  const query =
    "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *; ";

  return db.query(query, [inc_votes, article_id]).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }

    return rows[0];
  });
};
exports.selectCommentById = (comment_id) => {
  const query = "SELECT * FROM comments WHERE comment_id = $1 ";
  const deleteQuery = "DELETE FROM comments WHERE comment_id = $1 ";
  return db.query(query, [comment_id]).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }

    return db.query(deleteQuery, [comment_id]).then(({ rows }) => {
      return rows;
    });
  });
};
