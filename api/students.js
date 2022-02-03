const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const redis_client = require("../middleware/redis");
const queries = require("../db/queries/students");
const {
  generateAccessToken,
  verifyToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../middleware/auth");

router.post("/register", (req, res, next) => {
  queries
    .createStudent(req.body)
    .then(async (student) => {
      const access_token = generateAccessToken(student[0].email);
      const refresh_token = await generateRefreshToken(student[0].email);
      res.json({ ...{ access_token, refresh_token }, ...student[0] });
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post("/login", async (req, res, next) => {
  queries
    .login(req.body.email, req.body.password)
    .then(async (student) => {
      const access_token = generateAccessToken(student.email);
      const refresh_token = await generateRefreshToken(student.email);
      return res.json({
        status: true,
        message: "login success",
        access_token,
        refresh_token,
        student: {
          email: student.email,
          first_name: student.first_name,
          last_name: student.last_name,
        },
      });
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post(
  "/token",
  async (req, res, next) => {
    if (req.body.refresh_token === null) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid request." });
    }
    const isVerified = await verifyRefreshToken(req.body.refresh_token);
    if (isVerified) {
      req.data = isVerified;
      next();
    } else {
      res.status(401).json({
        status: false,
        message: "Invalid request. Token is not same in store.",
      });
    }
  },
  // generate new access token based on refresh
  async (req, res) => {
    const email = req.data;
    const access_token = generateAccessToken(email);
    return res.json({
      status: true,
      message: "success",
      access_token,
    });
  }
);

router.get("/logout", verifyToken, async (req, res, next) => {
  const student_email = req.email;
  const token = req.token;
  // remove the refresh token
  await redis_client.del(student_email.toString());
  // blacklist current access token
  await redis_client.set("BL_" + student_email.toString(), token);
  return res.json({ status: true, message: "success." });
});

router.post("/profile", verifyToken, (req, res, next) => {
  queries.getStudent(req.email).then((user) => {
    return res.json(user);
  });
});

module.exports = router;
