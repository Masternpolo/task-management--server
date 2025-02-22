const mysql = require('mysql');

// SQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB
});

db.connect((err) => {
  if (err) console.error(err);
  else console.log("connected to database");
});

module.exports = db;