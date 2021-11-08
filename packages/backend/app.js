const express = require("express");
const PORT = process.env.PORT || 3001;
const knex = require("./config/knex.js");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
// var studentRouter = require("./routes/quotes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
