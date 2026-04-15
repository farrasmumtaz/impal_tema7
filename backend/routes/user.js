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

module.exports = router;