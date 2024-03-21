const { connectDB } = require("../db");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }
  try {
    const getUserQuery = "SELECT * FROM students WHERE name = ?";
    const getUserResult = await connectDB.query(getUserQuery, [name]);

    if (getUserResult[0].length > 0) {
      const user = getUserResult[0];
      res.status(409).json({ message: "User Already Exists", user });
    } else {
      const defaultRole = role || "Basic";
      await connectDB.query("INSERT into students (name, email, password, role) VALUES (?, ?, ?, ?)", [
        name,
        email,
        password,
        defaultRole,
      ]);
      res.status(201).json({ message: "User created" });
    }
  } catch (error) {
    console.log("🚀 ~ exports.register= ~ error:", error);
    res.status(500).json({
      message: "User not successful created",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }
  try {
    const [user] = await connectDB.query("SELECT * FROM students WHERE name = ?", [name]);
    if (!user[0]) {
      return res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    }
    
    if (password !== user[0].password) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const { role, id } = req.body;
  if (role && id) {
    if (role === "Admin") {
      await connectDB.query("SELECT * FROM students WHERE id = ?", [id]);
      res.send("Admin Logged in");
    } else {
      res.status(400).json({ message: "Role is not Admin" });
    }
  } else {
    res.status(400).json({ message: "Role or Id not present" });
  }
};
