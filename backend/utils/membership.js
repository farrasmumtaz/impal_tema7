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

  if (rows.length === 0) {
    return 3; 
  }

  return rows[0].batas_materi; 
};

module.exports = { getUserLimit };