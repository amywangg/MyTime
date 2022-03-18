const knex = require("../knex");
const argon = require("argon2");

module.exports = {
  async createStudent(body) {
    try {
      let password_hash = await argon.hash(body.password);
      return knex("students")
        .returning([
          "id",
          "school",
          "first_name",
          "middle_name",
          "last_name",
          "description",
          "email",
          "school_id",
          "school",
        ])
        .insert({
          email: body.email,
          password: password_hash,
          first_name: body.first_name,
          middle_name: body.middle_name || "",
          last_name: body.last_name,
          student_id: body.student_id,
          school: body.school,
          school_id: body.school_id,
          date_of_birth: body.date_of_birth,
          skills: "tbd",
        });
    } catch (error) {
      return error;
    }
  },

  async login(email, password) {
    let getStudent = await knex("students")
      .select([
        "first_name",
        "middle_name",
        "last_name",
        "email",
        "password",
        "description",
        "id",
        "student_id",
        "skills",
        "school",
        "school_id",
      ])
      .where("email", email);
    let student = getStudent[0];

    try {
      if (await argon.verify(student.password, password)) {
        return student;
      }
    } catch (e) {
      return e;
    }
  },

  async updateStudent(body) {
    let student = await knex("students")
      .returning([
        "id",
        "first_name",
        "middle_name",
        "last_name",
        "student_id",
        "email",
        "description",
        "school",
        "skills",
        "school_id",
      ])
      .where({ id: body.id })
      .update({
        first_name: body.first_name,
        middle_name: body.middle_name,
        last_name: body.last_name,
        email: body.email,
        school: body.school,
        school_id: body.school_id,
        skills: body.skills,
        description: body.description,
      });
    return student;
  },

  async getStudent(email) {
    try {
      let getStudent = await knex("students")
        .select([
          "id",
          "first_name",
          "middle_name",
          "last_name",
          "student_id",
          "description",
          "email",
          "school",
          "skills",
          "school_id",
        ])
        .where("email", email);
      let student = getStudent[0];
      return student;
    } catch (err) {
      return err;
    }
  },

  async getSchools() {
    try {
      let schools = await knex("schools").select(["id", "name"]);
      return schools;
    } catch (err) {
      return err;
    }
  },

  async getPostings(school_id, id) {
    try {
      let getPostings = await knex
        .select(
          "postings.id",
          "postings.supervisor",
          "postings.title",
          "postings.date",
          "postings.description",
          "postings.location",
          "postings.created_at",
          "orgs.name",
          "orgs.image",
          "orgs.website",
          "orgs.phone_number",
          "orgs.email",
          "orgs.location as org_location"
        )
        .from("postings")
        .leftJoin("orgs", "orgs.id", "=", "postings.org_id")
        .leftJoin("org_school", "org_school.org_id", "=", "postings.org_id")
        .where("org_school.status", "verified")
        .where("org_school.school_id", school_id);

      let studentPostings = await Promise.all(
        getPostings.map(async (posting) => {
          let timeslots = await knex
            .select(
              "jobs.id",
              "jobs.start_time",
              "jobs.end_time",
              "jobs.openings",
              "jobs.applicants",
              "jobs.status"
            )
            .from("jobs")
            .where("jobs.posting_id", posting.id);

          let jobs = await Promise.all(
            timeslots.map(async (job) => {
              let appStatus = await knex
                .select("student_job.status", "student_job.saved")
                .from("student_job")
                .where("student_job.job_id", job.id)
                .where("student_job.student_id", id);
              job["student_status"] = appStatus[0];
              return job;
            })
          );

          return {
            ...posting,
            timeslots: jobs,
          };
        })
      );

      return studentPostings;
    } catch (err) {
      return err;
    }
  },

  async savePosting(posting_id, student_id, saved) {
    try {
      let jobs = await knex("jobs").where("posting_id", posting_id);
      await Promise.all(
        jobs.map(async (job) => {
          let student_job = await knex("student_job")
            .select("id")
            .where("student_id", student_id)
            .where("job_id", job.id);
          if (student_job[0]?.id) {
            await knex("student_job")
              .insert({
                id: student_job[0].id,
                saved,
              })
              .onConflict("id")
              .merge();
          } else {
            await knex("student_job").insert({
              saved,
              status: "",
              student_id,
              job_id: job.id,
            });
          }
        })
      );
    } catch (err) {
      return err;
    }
  },

  async updatePostingStatus(posting_id, student_id, timeslots) {
    try {
      await Promise.all(
        timeslots.map(async (job) => {
          let student_job = await knex("student_job")
            .select("id")
            .where("student_id", student_id)
            .where("job_id", job.id);
          if (student_job[0]?.id) {
            await knex("student_job")
              .insert({
                id: student_job[0].id,
                status: job.selected ? "applied" : "",
              })
              .onConflict("id")
              .merge();
          } else {
            await knex("student_job").insert({
              saved: false,
              status: job.selected ? "applied" : "",
              student_id,
              job_id: job.id,
            });
          }
        })
      );
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
