const express = require("express");
const app = express();
const PORT = 5000;
const { connectDB } = require("./db");

app.use(express.json());
app.use('/api/auth', require("./Auth/Route"));

app.get('/', async (req, res) => {
  res.send("Welcome bro");
})

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})