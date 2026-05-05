// routes/user.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/auth");

router.get("/profile", auth, async (req, res) => {
  const [rows] = await db.execute(
    "SELECT user_id, username, email FROM users WHERE user_id = ?",
    [req.user.id]
  );

  res.json(rows[0]);
});

router.get("/membership", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.execute(`
      SELECT 
        pm.nama_paket,
        pm.batas_materi,
        s.tanggal_mulai,
        s.tanggal_berakhir
      FROM subskripsi s
      JOIN paket_membership pm ON s.paket_id = pm.paket_id
      WHERE s.user_id = ?
      AND s.status = 1
      AND s.tanggal_berakhir >= NOW()
      LIMIT 1
    `, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Membership tidak ditemukan"
      });
    }

    const membership = rows[0];

    const [count] = await db.execute(`
      SELECT COUNT(*) as total
      FROM user_course_access
      WHERE user_id = ?
    `, [userId]);

    const totalCourse = count[0].total;

    res.json({
      membership: membership.nama_paket,
      batas: membership.batas_materi,
      digunakan: totalCourse,
      sisa:
        membership.batas_materi === null
          ? "Unlimited"
          : membership.batas_materi - totalCourse,
      expired: membership.tanggal_berakhir
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;