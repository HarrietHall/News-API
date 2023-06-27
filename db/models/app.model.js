const db = require("../connection");




exports.selectAllTopics = () => {
  const query = "SELECT * FROM topics ";

  return db.query(query).then(({ rows }) => {
    return rows;
  });
};



