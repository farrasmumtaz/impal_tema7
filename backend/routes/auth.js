// routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, nama_depan, nama_belakang, email, password, no_telp } = req.body;

  try {
    const [check] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (check.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.execute(
      `INSERT INTO users (username, nama_depan, nama_belakang, email, password, no_telp)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [username, nama_depan, nama_belakang, email, hashed, no_telp || null]
    );

    res.json({ message: "Register berhasil" });
  } catch (err) {
    console.error("ERROR REGISTER:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Email tidak ditemukan" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...safeUser } = user;

    res.json({
      message: "Login berhasil",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);  
    console.log("JWT:", process.env.JWT_SECRET);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;