const express = require("express");
const PORT = process.env.PORT || 3001;
const path = require("path");
const bodyparser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./api/index");
var studentsRouter = require("./api/students");

const app = express();
const cors = require("cors");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/students", studentsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
