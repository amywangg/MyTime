const express = require("express");
const router = express.Router();
const redis_client = require("../middleware/redis");
const queries = require("../db/queries/orgs");
const {
  generateAccessToken,
  verifyToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../middleware/auth");

router.post("/register", (req, res, next) => {
  queries
    .createOrg(req.body)
    .then(async (org) => {
      const access_token = generateAccessToken(org[0].email);
      const refresh_token = await generateRefreshToken(org[0].email);
      res.json({ ...{ access_token, refresh_token }, ...org[0] });
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post("/login", async (req, res, next) => {
  queries
    .login(req.body.email, req.body.password)
    .then(async (org) => {
      const access_token = generateAccessToken(org.email);
      const refresh_token = await generateRefreshToken(org.email);
      return res.json({
        status: true,
        message: "login success",
        access_token,
        refresh_token,
        org: {
          email: org.email,
          name: org.name,
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
  const org_email = req.email;
  const token = req.token;
  // remove the refresh token
  await redis_client.del(org_email.toString());
  // blacklist current access token
  await redis_client.set("BL_" + org_email.toString(), token);
  return res.json({ status: true, message: "success." });
});

router.post("/profile", verifyToken, (req, res, next) => {
  queries
    .getOrg(req.email)
    .then((user) => {
      return res.json(user);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

// vivs edits
router.post("/partnerships", (req, res, next) => {
  queries
    .getOrg(req.org_id)
    .then(async (org) => {
      console.log("route_name", org);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post("/mypostings", (req, res, next) => {
  queries
    .orgJobs(req.org_id)
    .then(async (postings) => {
      console.log("route_name", postings);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

// still need to add in getOrgPosting query; didn't know how to do it bc of the path (each job has its own path right)

module.exports = router;
