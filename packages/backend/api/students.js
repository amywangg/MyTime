const express = require("express");
const router = express.Router();
const queries = require("../db/queries/auth");

router.get("/", (req, res) => {
  queries.getAll("students").then((users) => {
    res.json(users);
  });
});

router.post("/signup", (req, res) => {
  queries
    .createUser(
      req.body.email,
      req.body.password,
      req.body.firstName,
      req.body.lastName
    )
    .then((user) => {
      res.json(user[0]);
    });
});

module.exports = router;
