const connectDB = require('../db');

exports.register = async (req, res) => {
  const { name, password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" })
  }
  try {
    await connectDB.query("INSERT into students (name, password) VALUES (?, ?)", [username, password])
    .then(user => {
      res.status(200).json({  message: "User successfully created", user})
    })
  } catch (error) {
    console.log("🚀 ~ exports.register= ~ error:", error);
    res.status(401).json({
      message: "User not successful created",
      error: error.mesage,
    })
  }
}