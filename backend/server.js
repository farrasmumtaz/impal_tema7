const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend jalan");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length > 0) {
      res.json({
        message: "Login berhasil",
        user: result[0],
      });
    } else {
      res.status(401).json({
        message: "Email atau password salah",
      });
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});