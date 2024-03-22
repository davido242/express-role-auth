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
  try {
    const { role, id } = req.body;
    if (role && id) {
      if (role === "Admin") {
        const [user] = await connectDB.query("SELECT * FROM students WHERE id = ?", [id]);
        const userData = user[0];
        if (userData.role !== "Admin") {
          userData.role = role;
          await connectDB.query("UPDATE students SET role = ? WHERE id = ?", [role, id]);
          res.send(userData);
        } else {
          res.json({ message: "User is already and Admin" });
        }
      } else {
        res.status(401).json({ message: "Role is not Admin" });
      }
    } else {
      res.status(400).json({ message: "Role or Id not present" });
    }
  } catch (error) {
    console.log("🚀 ~ exports.update= ~ error:", error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const [user] = await connectDB.query("SELECT * FROM students WHERE id = ?", [id]);
    if (user.length > 0) {
      const userData = user[0];
      await connectDB.query("DELETE FROM students WHERE id = ?", [userData.id]);
      res.status(204).json({ message: "User successfully deleted", userData });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("🚀 ~ exports.deleteUser ~ error:", error);
    res.status(400).json({ message: "An error occurred", error: error.message });
  }
};
