const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const db = require("../config/db");

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const [user] = await db.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (user.length === 0) {
    return res.json({ message: "Jika email terdaftar, link dikirim" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  await db.execute(
    "UPDATE users SET reset_token = ?, reset_expired = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email = ?",
    [token, email]
  );

  console.log(`http://localhost:5173/reset-password/${token}`);

  res.json({ message: "Link reset dikirim", resetLink: `http://localhost:5173/reset-password/${token}`});
});

module.exports = router;