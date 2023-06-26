const db = require("../connection")


exports.selectAllTopics = () => {
    console.log('in model ')

    let query =
    "SELECT * FROM topics ";


    return db.query(query).then(({ rows }) => {

        return rows;
        
      });

}