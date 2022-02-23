const knex = require("../knex");
const argon = require("argon2");

module.exports = {
  async createOrg(body) {
    try {
      let password_hash = await argon.hash(body.password);
      return knex("orgs").returning(["name", "email"]).insert({
        name: body.name,
        email: body.email,
        password: password_hash,
        phone_number: body.phone_number,
        website: body.website,
        location: body.location,
        description: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  },

  async login(email, password) {
    let getUser = await knex("orgs").where("email", email);
    let user = getUser[0];
    console.log(user);

    try {
      if (await argon.verify(user.password, password)) {
        return user;
      }
      throw Error("Wrong username or password");
    } catch (e) {
      throw Error("Wrong username or password");
    }
  },

  async getToken(token) {
    newToken = auth.decodeToken(token);
    return newToken;
  },

  // viv edits
  // if job length (num hours) gets added into jobs table, update the query to include that value
  async getOrgPosting(posting_id) {
    try {
      let getOrgPosting = await knex
        .select(
          "postings.title",
          "orgs.name",
          "orgs.website",
          "postings.id",
          "postings.description",
          "students.first_name",
          "students.middle_name",
          "students.last_name",
          "student_job.status"
        )
        .from("postings")
        .leftJoin("jobs", "postings.id", "jobs.posting_id")
        .leftJoin("orgs", "orgs.id", "postings.org_id")
        .leftJoin("student_job", "student_job.posting_id", "postings.id")
        .leftJoin("students", "students.id", "student_job.student_id")
        .where("postings.id", posting_id);
      let org_posting = getOrgPosting[0];
      return org_posting;
    } catch (err) {
      return err;
    }
  },

  // if job length (num hours) gets added into jobs table, update the query to include that value
  async orgJobs(org_id) {
    try {
      let orgJobs = await knex
        .select(
          "orgs.name",
          "postings.title",
          "orgs.website",
          "postings.expires_at",
          "student_job.status",
          "job.start_time"
        )
        .from("orgs")
        .leftJoin("postings", "orgs.id", "postings.org_id")
        .leftJoin("jobs", "jobs.posting_id", "postings.id")
        .leftJoin("student_job", "student_job.posting_id", "postings.id")
        .where("orgs.id", org_id);
      let org_job = orgJobs[0];
      return org_job;
    } catch (err) {
      return err;
    }
  },

  async getOrg(email) {
    try {
      let getOrg = await knex
        .select(
          "orgs.name",
          "orgs.email",
          "orgs.website",
          "orgs.description",
          "orgs.location",
          "orgs.phone_number"
        )
        .from("orgs")
        // .leftJoin("org_school", "org_school.org_id", "orgs.id")
        // .leftJoin("admins", "admins.adminId", "org_school.admin_ID")
        .where("orgs.email", email);
      let org = getOrg[0];
      return org;
    } catch (err) {
      return err;
    }
  },
};
