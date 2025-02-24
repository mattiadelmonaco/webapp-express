const mysql = require("mysql2");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  name: DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to mysql database");
});

module.exports = connection;
