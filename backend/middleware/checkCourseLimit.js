const db = require("../config/db");

const getUserLimit = async (userId) => {
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

  if (rows.length === 0) return 3; // default basic
  return rows[0].batas_materi;     // null = unlimited
};

const checkCourseLimit = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const limit = await getUserLimit(userId);

    const [count] = await db.execute(
      "SELECT COUNT(*) as total FROM user_course_access WHERE user_id=?",
      [userId]
    );

    const total = count[0].total;

    // 🔥 core logic
    if (limit !== null && total >= limit) {
      return res.status(403).json({
        message: `Limit paket (${limit}) sudah tercapai`,
        limit,
        total
      });
    }

    next();

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = checkCourseLimit;