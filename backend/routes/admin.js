const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// GET ALL USERS
router.get("/users", auth, role("admin"), async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users");

    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});
// GET PROFILE
router.get("/courses", auth, role("admin"), async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM courses ORDER BY course_id DESC"
    );

    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});

// CREATE COURSE
router.post("/courses", auth, role("admin"), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Judul wajib diisi"
      });
    }

    const [result] = await db.execute(
      `
      INSERT INTO courses (title, description)
      VALUES (?, ?)
      `,
      [title, description]
    );

    res.status(201).json({
      message: "Course berhasil dibuat",
      course_id: result.insertId
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});

// UPDATE COURSE
router.put("/courses/:id", auth, role("admin"), async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description } = req.body;

    await db.execute(
      `
      UPDATE courses
      SET title = ?, description = ?
      WHERE course_id = ?
      `,
      [title, description, id]
    );

    res.json({
      message: "Course berhasil diupdate"
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});

//DELETE COURSE
router.delete("/courses/:id", auth, role("admin"), async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute(
      `
      DELETE FROM courses
      WHERE course_id = ?
      `,
      [id]
    );

    res.json({
      message: "Course berhasil dihapus"
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});

// GET ALL TRANSAKSI
router.get("/transactions", auth, role("admin"), async (req, res) => {
  try {

    const [rows] = await db.execute(`
      SELECT
        t.transaksi_id,
        t.tanggal_transaksi,
        t.jumlah_bayar,
        t.metode_pembayaran,
        t.status_pembayaran,

        s.subskripsi_id,
        s.status as status_membership,

        u.user_id,
        u.username,
        u.email,

        p.nama_paket

      FROM transaksi t

      JOIN subskripsi s
        ON t.subskripsi_id = s.subskripsi_id

      JOIN users u
        ON s.user_id = u.user_id

      JOIN paket_membership p
        ON s.paket_id = p.paket_id

      ORDER BY t.tanggal_transaksi DESC
    `);

    res.json(rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});

router.put(
  "/transactions/:id/approve",
  auth,
  role("admin"),
  async (req, res) => {

    try {

      const { id } = req.params;

      const [trx] = await db.execute(
        `
        SELECT *
        FROM transaksi
        WHERE transaksi_id = ?
        `,
        [id]
      );

      if (!trx.length) {
        return res.status(404).json({
          message: "Transaksi tidak ditemukan"
        });
      }

      await db.execute(
        `
        UPDATE transaksi
        SET status_pembayaran='paid'
        WHERE transaksi_id=?
        `,
        [id]
      );

      await db.execute(
        `
        UPDATE subskripsi
        SET status=1
        WHERE subskripsi_id=?
        `,
        [trx[0].subskripsi_id]
      );

      res.json({
        message: "Pembayaran berhasil diverifikasi"
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: "Server error"
      });

    }

  }
);

module.exports = router;