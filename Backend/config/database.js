const mysql2 = require('mysql2');

const database = mysql2.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

database.connect(err => {
  if (err)
    console.log("Error connecting to database: " + err);
  console.log("Connected to database");
});

module.exports = database;