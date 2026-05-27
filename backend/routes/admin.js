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



module.exports = router;