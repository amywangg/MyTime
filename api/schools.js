const express = require("express");
const router = express.Router();
const redis_client = require("../middleware/redis");
const queries = require("../db/queries/schools");
const {
  generateAccessToken,
  verifyToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../middleware/auth");

router.post("/register", (req, res, next) => {
  queries
    .createSchool(req.body)
    .then(async (school) => {
      const access_token = generateAccessToken(school[0].email);
      const refresh_token = await generateRefreshToken(school[0].email);
      res.json({ ...{ access_token, refresh_token }, ...school[0] });
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post("/login", async (req, res, next) => {
  queries
    .login(req.body.email, req.body.password)
    .then(async (school) => {
      const access_token = generateAccessToken(school.email);
      const refresh_token = await generateRefreshToken(school.email);
      return res.json({
        status: true,
        message: "login success",
        access_token,
        refresh_token,
        school: {
          image: school.image,
          description: school.description,
          email: school.email,
          name: school.name,
          location: school.location,
          id: school.id,
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
  const school_email = req.email;
  const token = req.token;
  // remove the refresh token
  await redis_client.del(school_email.toString());
  // blacklist current access token
  await redis_client.set("BL_" + school_email.toString(), token);
  return res.json({ status: true, message: "success." });
});

router.post("/profile", verifyToken, (req, res, next) => {
  queries
    .getSchool(req.email)
    .then((user) => {
      return res.json(user);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});
router.post("/profile/update", verifyToken, (req, res, next) => {
  queries
    .updateSchool(req.body)
    .then((user) => {
      return res.json(user[0]);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});
router.post("/orgs", verifyToken, (req, res, next) => {
  queries
    .getOrgs(req.body.id)
    .then((user) => {
      return res.json(user);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post("/orgs/update", verifyToken, (req, res, next) => {
  queries
    .updateOrgStatus(req.body.org_id, req.body.school_id, req.body.status)
    .then((user) => {
      return res.json(user);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

module.exports = router;
