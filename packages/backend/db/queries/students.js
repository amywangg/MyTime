const express = require("express");
const router = express.Router();
const postsRouter = express.Router({ mergeParams: true });
const queries = require("../db/queries/general");
const auth = require("../middleware/auth");
router.use("/:id/posts", postsRouter);

router.get("/", (req, res) => {
  queries.getAll("students").then((students) => {
    res.json(students);
  });
});

router.get("/:id", (req, res) => {
  queries.getOne("students", req.params.id).then((student) => {
    res.json(student);
  });
});

postsRouter.get("/", (req, res) => {
  queries.getPostBystudent(req.params.id).then((posts) => {
    res.json(posts);
  });
});

router.post("/", (req, res) => {
  queries
    .createstudent(req.body.studentname, req.body.email, req.body.password)
    .then((student) => {
      res.json(student[0]);
    });
});

router.post("/login", (req, res) => {
  if (req.body.studentname == "" || req.body.password == "") {
    res.status(401).send({ error: "Wrong studentname or password" });
  } else {
    queries
      .login(req.body.studentname, req.body.password)
      .then((student) => {
        res.json(auth.getToken(student.id, student.studentname, student.email));
      })
      .catch((error) => {
        res.status(401).send({ error: error.message });
      });
  }
});

router.post("/profile", (req, res) => {
  queries
    .getToken(req.header("Authorization").replace("Bearer: ", ""))
    .then((data) => {
      res.json(data);
    });
});

module.exports = router;
