const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/auth");

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Akses ditolak" });
  }
  next();
};

router.get("/users", verifyToken, isAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT user_id, username, nama_depan, nama_belakang, email, no_telp FROM users"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/paket", verifyToken, isAdmin, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM paket_membership");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/transaksi", verifyToken, isAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT t.*, u.nama_depan, u.nama_belakang, p.nama_paket
       FROM transaksi t
       JOIN subskripsi s ON t.subskripsi_id = s.subskripsi_id
       JOIN users u ON s.user_id = u.user_id
       JOIN paket_membership p ON s.paket_id = p.paket_id
       ORDER BY t.tanggal_transaksi DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;