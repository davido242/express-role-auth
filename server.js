const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api/auth', require("./Auth/Route"));

app.get('/', async (req, res) => {
  res.send("Welcome to role Auth server");
})

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})