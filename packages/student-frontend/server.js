const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const publicPath = path.join(__dirname, "client/build");
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
app.listen(port, () => {
  console.log("Server is up!");
});
