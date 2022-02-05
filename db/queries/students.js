const knex = require("../knex");
const argon = require("argon2");

module.exports = {
  async createStudent(body) {
    try {
      let password_hash = await argon.hash(body.password);
      return knex("students")
        .returning(["first_name", "last_name", "email"])
        .insert({
          email: body.email,
          password: password_hash,
          first_name: body.first_name,
          middle_name: body.middle_name || "",
          last_name: body.last_name,
          student_id: body.student_id,
          school: body.school,
          date_of_birth: body.date_of_birth,
        });
    } catch (error) {
      return error;
    }
  },

  async login(email, password) {
    let getStudent = await knex("students")
      .select(["first_name", "last_name", "email", "password"])
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

  async getStudent(email) {
    try {
      let getStudent = await knex("students")
        .select(["first_name", "last_name", "email"])
        .where("email", email);
      let student = getStudent[0];
      return student;
    } catch (err) {
      return err;
    }
  },

  // feel like this can probably be all grouped under getStudent, up to you
  // this returns all the info for the student progress bar and student profile (so it include sthe info from getStudent as well)
  async studentStats(student_id) {
    try {
      let studentStats = await knex("students")
        .select(["first_name", "last_name", "email","middle_name","school","hours_approved","grade","skills"])
        .where("student_id", student_id);
      let student = studentStats[0];
      return student;
    } catch (err) {
      return err;
    }
  },

  // this returns all the info for student-job interactions
  // missing a column here for getting hte hours from the job; consider adding a column in the jobs table
  // should return more than one result; might need to change line 78
  async studentJobs(student_id) {
    try {
      let studentJobs = await knex.select("orgs.name", "postings.title","orgs.website","student_job.status","jobs.start_time")
      .from("student_job")
      .leftJoin("postings","postings.id","student_job.posting_id")
      .leftJoin("jobs","jobs.posting_id","postings.id")
      .leftJoin("orgs","orgs.id","postings.org_id")
      .where("student_job.student_id",student_id)
      ;
      let student_job = studentJobs[0];
      return student_job;
    } catch (err) {
      return err;
    }
  },

  // if job length (num hours) gets added into jobs table, update the query to include that value
  async getPosting(posting_id) {
    try {
      let getPosting = await knex.select("postings.title","orgs.name","orgs.website","postings.id","postings.description","student_job.status")
      .from("postings")
      .leftJoin("jobs","postings.id","jobs.posting_id")
      .leftJoin("orgs","orgs.id","postings.org_id")
      .leftJoin("student_job","student_job.posting_id","postings.id")
      .where("postings.id",posting_id)
      ;
      let posting = getPosting[0];
      return posting;
    } catch (err) {
      return err;
    }
  },
};
