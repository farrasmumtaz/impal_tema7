// routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  const { username, nama_depan, nama_belakang, email, password, no_telp } = req.body;

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // 1. cek email
    const [check] = await conn.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (check.length > 0) {
      await conn.rollback();
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    if (password.length < 6) {
      await conn.rollback();
      return res.status(400).json({ message: "Password minimal 6 karakter" });
    }

    if (username.length < 3) {
      await conn.rollback();
      return res.status(400).json({ message: "Username minimal 3 karakter" });
    }

    if (email.length < 5 || !email.includes("@")) {
      await conn.rollback();
      return res.status(400).json({ message: "Email tidak valid" });
    }

    if (nama_depan.length < 2) {
      await conn.rollback();
      return res.status(400).json({ message: "Nama depan minimal 2 karakter" });
    }

    if (nama_belakang.length < 2) {
      await conn.rollback();
      return res.status(400).json({ message: "Nama belakang minimal 2 karakter" });
    }
    
    // 2. hash password
    const hashed = await bcrypt.hash(password, 10);

    // 3. insert user
    const [userResult] = await conn.execute(
      `INSERT INTO users (username, nama_depan, nama_belakang, email, password, no_telp)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [username, nama_depan, nama_belakang, email, hashed, no_telp || null]
    );

    const userId = userResult.insertId;

    // 4. insert subskripsi (Basic / Free)
    const [subResult] = await conn.execute(`
      INSERT INTO subskripsi 
      (user_id, paket_id, tanggal_mulai, tanggal_berakhir, status)
      VALUES (?, 1, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 1)
    `, [userId]);

    const subskripsiId = subResult.insertId;

    // 5. insert transaksi (gratis)
    await conn.execute(`
      INSERT INTO transaksi 
      (subskripsi_id, jumlah_bayar, metode_pembayaran, status_pembayaran, tanggal_transaksi)
      VALUES (?, 0, 'Free', 'sukses', NOW())
    `, [subskripsiId]);

    await conn.commit();

    res.json({ message: "Register berhasil + dapat paket Basic" });

  } catch (err) {
    await conn.rollback();
    console.error("ERROR REGISTER:", err);
    res.status(500).json({ message: "Server error" });
  } finally {
    conn.release();
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0 && !rows[0]) {
      return res.status(401).json({ message: "Email tidak ditemukan dan Password salah" });
    }
    if (rows.length === 0) {
      return res.status(401).json({ message: "Email tidak ditemukan" });
    }

    const user = rows[0];

    // compare bcrypt
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Password salah" });
    }

    // generate token
    const token = jwt.sign(
      {
        id: user.user_id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // hapus password dari response
    const { password: _, ...safeUser } = user;

    res.json({
      message: "Login berhasil",
      token,
      user: safeUser,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;