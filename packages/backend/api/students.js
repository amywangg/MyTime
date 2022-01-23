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
    .createStudent(
      req.body.email,
      req.body.password,
      req.body.first_name,
      req.body.middle_name,
      req.body.last_name,
      req.body.student_id,
      req.body.school,
      req.body.date_of_birth
    )
    .then((user) => {
      res.json(user[0]);
    });
});

router.post("/login", (req, res) => {
  queries.login(req.body.email, req.body.password).then((user) => {
    res.json(user[0]);
  });
});

module.exports = router;
