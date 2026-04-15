const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/admin", require("./routes/admin"));

app.listen(5000, () => console.log("Server jalan"));