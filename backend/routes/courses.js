const express = require("express");
const router = express.Router();
const safeQuery = require("../utils/dbQuery");
const auth = require("../middleware/auth");

// ================= GET ALL COURSES =================
router.get("/", async (req, res) => {
  try {
    const [rows] = await safeQuery(
      "SELECT course_id, title, description FROM courses"
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /courses error:", err);
    res.status(500).json({ message: "Gagal mengambil data courses" });
  }
});

// ================= MY COURSES =================
router.get("/my-courses", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await safeQuery(`
      SELECT c.*
      FROM user_course_access uca
      JOIN courses c ON uca.course_id = c.course_id
      WHERE uca.user_id = ?
    `, [userId]);

    res.json({ total: rows.length, data: rows });

  } catch (err) {
    console.error("GET /my-courses error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= ADD COURSE =================
router.post("/add-course", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    if (!courseId || isNaN(courseId)) {
      return res.status(400).json({ message: "Course ID tidak valid" });
    }

    const [course] = await safeQuery(
      "SELECT 1 FROM courses WHERE course_id = ?",
      [courseId]
    );

    if (course.length === 0) {
      return res.status(404).json({ message: "Course tidak ditemukan" });
    }

    const [membership] = await safeQuery(`
      SELECT pm.batas_materi
      FROM subskripsi s
      JOIN paket_membership pm ON s.paket_id = pm.paket_id
      WHERE s.user_id = ?
      AND s.status = 1
      AND s.tanggal_berakhir >= NOW()
      LIMIT 1
    `, [userId]);

    if (membership.length === 0) {
      return res.status(403).json({ message: "Membership tidak aktif" });
    }

    const batas = membership[0].batas_materi;

    const [count] = await safeQuery(`
      SELECT COUNT(*) as total
      FROM user_course_access
      WHERE user_id = ?
    `, [userId]);

    const [exists] = await safeQuery(
      "SELECT 1 FROM user_course_access WHERE user_id = ? AND course_id = ?",
      [userId, courseId]
    );

    if (exists.length > 0) {
      return res.json({ message: "Course sudah diambil" });
    }

    if (batas !== null && count[0].total >= batas) {
      return res.status(403).json({
        message: "Batas course sudah tercapai"
      });
    }

    await safeQuery(
      "INSERT INTO user_course_access (user_id, course_id) VALUES (?, ?)",
      [userId, courseId]
    );

    res.json({ message: "Course berhasil ditambahkan" });

  } catch (err) {
    console.error("POST /add-course error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= REMOVE COURSE =================
router.delete("/remove-course/:id", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.params.id;

    const [check] = await safeQuery(
      "SELECT 1 FROM user_course_access WHERE user_id = ? AND course_id = ?",
      [userId, courseId]
    );

    if (check.length === 0) {
      return res.status(404).json({ message: "Course tidak ditemukan" });
    }

    await safeQuery(
      "DELETE FROM user_course_access WHERE user_id = ? AND course_id = ?",
      [userId, courseId]
    );

    res.json({ message: "Course berhasil dihapus" });

  } catch (err) {
    console.error("DELETE /remove-course error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= COURSE DETAIL =================
router.get("/:id", auth, async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    const [access] = await safeQuery(
      "SELECT 1 FROM user_course_access WHERE user_id = ? AND course_id = ?",
      [userId, courseId]
    );

    if (access.length === 0) {
      return res.status(403).json({
        message: "Tidak punya akses ke course ini"
      });
    }

    const [course] = await safeQuery(
      "SELECT * FROM courses WHERE course_id = ?",
      [courseId]
    );

    res.json(course[0]);

  } catch (err) {
    console.error("GET /:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= UPDATE PROGRESS =================
router.post("/update-progress", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, progress } = req.body;

    if (progress < 0 || progress > 100) {
      return res.status(400).json({ message: "Progress tidak valid" });
    }

    await safeQuery(
      `UPDATE user_course_access 
       SET progress = ? 
       WHERE user_id = ? AND course_id = ?`,
      [progress, userId, courseId]
    );

    res.json({ message: "Progress diupdate" });

  } catch (err) {
    console.error("POST /update-progress error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;