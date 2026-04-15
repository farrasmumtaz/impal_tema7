const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get("/users", auth, role("admin"), async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM users");
  res.json(rows);
});

module.exports = router;