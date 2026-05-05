const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/auth", require("./routes/forgot-password"));
app.use("/auth", require("./routes/reset-password"));
app.use("/courses", require("./routes/courses"));
app.use("/membership", require("./routes/membership"));
app.use("/user", require("./routes/user"));
app.use("/admin", require("./routes/admin"));

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});