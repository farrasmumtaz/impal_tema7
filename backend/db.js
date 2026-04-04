const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "stud_yuk",
});

db.connect((err) => {
  if (err) {
    console.error("Database gagal connect:", err);
  } else {
    console.log("Database connected ✅");
  }
});

module.exports = db;