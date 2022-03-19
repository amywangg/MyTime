const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
// heroku will provide a port or local
const port = process.env.PORT || 3002;

app.use("/static", express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  const index = path.join(__dirname, "build", "index.html");
  res.sendFile(index);
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
