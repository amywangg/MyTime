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
const getPdf = require("./pdfgenerator");
const fs = require("fs");

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
          id: student.id,
          school: student.school,
          school_id: student.school_id,
          student_id: student.student_id,
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

router.post("/profile/update", verifyToken, (req, res, next) => {
  queries
    .updateStudent(req.body)
    .then((user) => {
      return res.json(user[0]);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.get("/schools", (req, res, next) => {
  queries.getSchools().then((user) => {
    return res.json(user);
  });
});

router.post("/dashboard", (req, res, next) => {
  queries
    .studentStats(req.student_id)
    .then(async (student) => {
      return res.json(student);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post("/postings", (req, res, next) => {
  queries
    .getPostings(req.body.school_id, req.body.id)
    .then(async (postings) => {
      return res.json(postings);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post("/postings/save", (req, res, next) => {
  queries
    .savePosting(req.body.posting_id, req.body.student_id, req.body.saved)
    .then(async () => {
      return res.status(200).send({ message: "Success" });
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post("/postings/update", (req, res, next) => {
  queries
    .updatePostingStatus(
      req.body.posting_id,
      req.body.student_id,
      req.body.timeslots
    )
    .then(async () => {
      return res.status(200).send({ message: "Success" });
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

// i'm adding in some more info for the profile from the query i wrote; you can take out if u want
router.post("/profile", (req, res, next) => {
  queries
    .studentStats(req.student_id)
    .then(async (student) => {
      console.log("route_name", student);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post("/applications", (req, res, next) => {
  queries
    .studentJobs(req.student_id)
    .then(async (student_job) => {
      console.log("route_name", student_job);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post("/schedule", (req, res, next) => {
  queries
    .studentJobs(req.student_id)
    .then(async (student_job) => {
      console.log("route_name", student_job);
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
});

router.post("/get-pdf", (req, res, next) => {
  getPdf(req.body.postings, req.body.user).then(() => {
    const src = fs.createReadStream("volunteer-form-temp.pdf");

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; volunteer-form-temp.pdf",
      "Content-Transfer-Encoding": "Binary",
    });
    src.pipe(res);
  });
});

module.exports = router;
