const express = require("express");
const router = express.Router();
const redis_client = require("../middleware/redis");
const queries = require("../db/queries/orgs");
const postingQueries = require("../db/queries/postings");
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
      res.json({ ...{ access_token, refresh_token }, ...{ org: org[0] } });
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
          id: org.id,
          email: org.email,
          name: org.name,
          image: org.image,
          location: org.location,
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

router.post("/profile/update", verifyToken, (req, res, next) => {
  queries
    .updateOrg(req.body)
    .then((user) => {
      return res.json(user[0]);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post("/schools", verifyToken, (req, res, next) => {
  queries
    .getSchools(req.body.id)
    .then((user) => {
      return res.json(user);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post("/postings", (req, res, next) => {
  postingQueries
    .getOrgPostings(req.body.id)
    .then((postings) => {
      return res.json(postings);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post("/postings/create", (req, res, next) => {
  postingQueries
    .createPosting(req.body.org_id, req.body.posting)
    .then((posting) => res.send(posting))
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post("/postings/update", (req, res, next) => {
  postingQueries
    .updatePosting(req.body)
    .then((posting) => res.sendStatus(200).send(posting))
    .catch((error) => {
      res.sendStatus(401).send({ error: error.message });
    });
});

module.exports = router;
