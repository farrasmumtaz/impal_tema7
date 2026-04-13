const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/auth");

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT user_id, username, nama_depan, nama_belakang, email, no_telp FROM users WHERE user_id = ?",
      [req.user.id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/subskripsi", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT s.subskripsi_id, p.nama_paket, p.harga, p.batas_materi,
              s.tanggal_mulai, s.tanggal_berakhir, s.status
       FROM subskripsi s
       JOIN paket_membership p ON s.paket_id = p.paket_id
       WHERE s.user_id = ?`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/transaksi", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT t.transaksi_id, p.nama_paket, t.jumlah_bayar,
              t.metode_pembayaran, t.status_pembayaran, t.tanggal_transaksi
       FROM transaksi t
       JOIN subskripsi s ON t.subskripsi_id = s.subskripsi_id
       JOIN paket_membership p ON s.paket_id = p.paket_id
       WHERE s.user_id = ?
       ORDER BY t.tanggal_transaksi DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;