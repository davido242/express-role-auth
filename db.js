const mysql = require("mysql2");
require("dotenv").config();

const connectDB = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE
  }, 
  console.log("MySQL Connected")
  ).promise();

module.exports = { connectDB };
