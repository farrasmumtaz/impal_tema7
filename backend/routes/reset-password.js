const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const db = require("../config/db");

router.post("/reset-password", async (req, res) => {
  try {

    const { email } = req.body;

    const [user] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.json({
        message: "Jika email terdaftar, link reset password telah dikirim"
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await db.execute(
      `
      UPDATE users
      SET
        reset_token = ?,
        reset_expired = DATE_ADD(NOW(), INTERVAL 1 HOUR)
      WHERE email = ?
      `,
      [token, email]
    );

    const resetLink =
      `${process.env.FRONTEND_URL}/reset-password/${token}`;

    console.log("RESET PASSWORD LINK:");
    console.log(resetLink);

    res.json({
      message: "Jika email terdaftar, link reset password telah dikirim"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;