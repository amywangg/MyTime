const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
// heroku will provide a port or local
const port = process.env.PORT || 3002;

const publicPath = process.env.PORT
  ? path.join(__dirname, "..", "build")
  : path.join(__dirname, "..", "public");

app.use(express.static(publicPath));
app.use("/static", express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
