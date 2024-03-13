const express = require("express");
const app = express();
const PORT = 5000;
const { connectDB } = require("./db");

app.get('/', async (req, res) => {
  // const [data] = await connectDB.query("INSERT into students (name, email, password, role) VALUES ('david', 'dave@gmail.co', '12345', 'Admin')");
  // const [data] = await connectDB.query("SELECT * FROM students");
  console.log({data: data});
  res.send("Welcome bro");
})



const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)

process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})