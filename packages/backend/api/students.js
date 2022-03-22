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
const axios = require("axios");

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
          description: student.description,
          skills: student.skills,
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

router.post("/schools", (req, res, next) => {
  queries.getSchools().then((user) => {
    return res.json(user);
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

router.post("/postings/recommended", (req, res, next) => {
  // pass in student's skills in the reqs
  let postingsList;
  queries
    .getPostings(req.body.school_id, req.body.id)
    .then(async (postings) => {
      postingsList = [...postings];
      const cleanedPostings = postings.map((post) => {
        return { id: post.id, description: post.description };
      });

      const recPostings = await axios.post(
        `${process.env.ML_URL}/predict`,
        cleanedPostings,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Content-type": "application/json",
          },
        }
      );

      let foundIds = [];
      await req.body.skills.split(", ").map((skill) => {
        recPostings.data.map((post) => {
          if (
            post.skills.includes(skill.toLowerCase()) &&
            !foundIds.includes(post.id)
          ) {
            foundIds.push(post.id);
          }
        });
      });

      return res.json(
        postingsList.filter((post) => foundIds.includes(post.id))
      );
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
});

module.exports = router;
