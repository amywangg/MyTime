const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const path = require("path");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", require("./api/index"));
app.use("/students", require("./api/students"));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} 👻`);
});
