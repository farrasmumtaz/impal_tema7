const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/db");

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  const [user] = await db.execute(
    "SELECT * FROM users WHERE reset_token = ? AND reset_expired > NOW()",
    [token]
  );

  if (user.length === 0) {
    return res.status(400).json({ message: "Token tidak valid / expired" });
  }

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: "Password minimal 6 karakter" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await db.execute(
    "UPDATE users SET password = ?, reset_token = NULL, reset_expired = NULL WHERE reset_token = ?",
    [hashed, token]
  );

  res.json({ message: "Password berhasil direset" });
});

module.exports = router;