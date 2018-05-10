// Dependencies
var mysql = require("mysql");

connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "burger_db"
});


// Make connection.
connection.connect();
console.log(connection);

// Export connection for our ORM to use.
module.exports = connection;