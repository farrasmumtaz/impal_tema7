const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const adminRoutes = require("./routes/admin");

require("dotenv").config();

const app = express();

app.use(helmet());

app.use(morgan("dev"));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://impal-tema7-9xsw.vercel.app",
      "https://impal-tema7-9xsw-git-main-farras-mumtaz-projects.vercel.app"
    ],
    credentials: true
  })
);
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/auth", require("./routes/forgot-password"));
app.use("/auth", require("./routes/reset-password"));
app.use("/courses", require("./routes/courses"));
app.use("/membership", require("./routes/membership"));
app.use("/user", require("./routes/user"));
app.use("/admin", require("./routes/admin"));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK"
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});