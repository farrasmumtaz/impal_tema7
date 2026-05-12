const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/auth");
const { getUserLimit } = require("../utils/membership");
const checkCourseLimit = require("../middleware/checkCourseLimit");

router.get("/packages", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM paket_membership");
  res.json(rows);
});

router.get("/active", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const [data] = await db.execute(`
      SELECT s.*, p.nama_paket, p.harga, p.batas_materi
      FROM subskripsi s
      JOIN paket_membership p ON s.paket_id = p.paket_id
      WHERE s.user_id = ?
      AND s.status = true
      AND s.tanggal_berakhir >= CURDATE()
      ORDER BY s.tanggal_berakhir DESC
      LIMIT 1
    `, [userId]);

    res.json(data[0] || null);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/create-transaction", auth, async (req, res) => {
  const userId = req.user.id;
  const { paketId } = req.body;

  try {
    const [paket] = await db.execute(
      "SELECT * FROM paket_membership WHERE paket_id=?",
      [paketId]
    );

    if (!paket.length) {
      return res.status(404).json({ message: "Paket tidak ditemukan" });
    }

    const [sub] = await db.execute(
      `INSERT INTO subskripsi (user_id, paket_id, status, tanggal_mulai, tanggal_berakhir)
      VALUES (?, ?, false, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY))`,
      [userId, paketId]
    );

    const subId = sub.insertId;

    await db.execute(
      `INSERT INTO transaksi 
      (subskripsi_id, jumlah_bayar, metode_pembayaran, status_pembayaran, tanggal_transaksi)
      VALUES (?, ?, 'manual', 'pending', NOW())`,
      [subId, paket[0].harga]
    );

    res.json({ subskripsiId: subId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/pay", auth, async (req, res) => {
  const { subskripsiId } = req.body;

  try {

    const [sub] = await db.execute(
      "SELECT * FROM subskripsi WHERE subskripsi_id=?",
      [subskripsiId]
    );

    if (sub.length === 0) {
      return res.status(404).json({
        message: "Subskripsi tidak ditemukan"
      });
    }

    const userId = sub[0].user_id;

    const [paket] = await db.execute(
      "SELECT * FROM paket_membership WHERE paket_id=?",
      [sub[0].paket_id]
    );

    if (paket.length === 0) {
      return res.status(404).json({
        message: "Paket tidak ditemukan"
      });
    }

    const durasi = paket[0].durasi_hari;

    await db.execute(`
  UPDATE subskripsi
  SET status = 0
  WHERE user_id = ?
`, [userId]);

    await db.execute(`
  UPDATE subskripsi
  SET 
    status = 1,
    tanggal_mulai = CURDATE(),
    tanggal_berakhir = DATE_ADD(CURDATE(), INTERVAL ? DAY)
  WHERE subskripsi_id = ?
`, [durasi, subskripsiId]);

    res.json({
      message: "Membership aktif / diperpanjang"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
});

router.post("/enroll", auth, checkCourseLimit, async (req, res) => {
  const userId = req.user.id;

  const limit = await getUserLimit(userId);

  const [count] = await db.execute(
    "SELECT COUNT(*) as total FROM user_course_access WHERE user_id=?",
    [userId]
  );

  const total = count[0].total;

  if (limit !== null && total >= limit) {
    return res.status(403).json({
      message: `Limit paket kamu (${limit}) sudah habis`
    });
  }

});

router.get("/limit", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.execute(`
      SELECT p.batas_materi
      FROM subskripsi s
      JOIN paket_membership p ON s.paket_id = p.paket_id
      WHERE s.user_id = ?
      AND s.status = true
      AND s.tanggal_berakhir >= CURDATE()
      ORDER BY s.tanggal_berakhir DESC
      LIMIT 1
    `, [userId]);

    const limit = rows.length === 0 ? 3 : rows[0].batas_materi;

    const [count] = await db.execute(
      "SELECT COUNT(*) as total FROM user_course_access WHERE user_id=?",
      [userId]
    );

    res.json({
      limit,
      total: count[0].total
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/my-transactions", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.execute(`
      SELECT 
        t.transaksi_id,
        t.tanggal_transaksi,
        t.metode_pembayaran,
        t.jumlah_bayar,
        t.status_pembayaran,
        p.nama_paket
      FROM transaksi t
      JOIN subskripsi s 
        ON t.subskripsi_id = s.subskripsi_id
      JOIN paket_membership p
        ON s.paket_id = p.paket_id
      WHERE s.user_id = ?
      ORDER BY t.tanggal_transaksi DESC
    `, [userId]);

    res.json(rows);

  } catch (err) {
    console.error("GET /my-transactions error:", err);
    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;