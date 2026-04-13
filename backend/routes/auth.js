const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();


router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  try {
    const [userCheck] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (userCheck.length > 0) {
      return res.status(400).json({
        message: "Email sudah terdaftar",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    res.json({
      message: "Register berhasil",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  try {
    const [result] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (result.length === 0) {
      return res.status(401).json({
        message: "Email tidak ditemukan",
      });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Password salah",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login berhasil",
      token,
      user,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

  const authMiddleware = require("../middleware/auth");

  router.get("/profile", authMiddleware, (req, res) => {
    res.json({
      message: "Ini data profile",
      user: req.user,
    });
  });
});

module.exports = router;