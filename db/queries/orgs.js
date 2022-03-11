const knex = require("../knex");
const argon = require("argon2");

module.exports = {
  async createOrg(body) {
    try {
      let password_hash = await argon.hash(body.password);
      let org = await knex("orgs")
        .returning([
          "name",
          "email",
          "location",
          "website",
          "location",
          "id",
          "image",
        ])
        .insert({
          name: body.name,
          email: body.email,
          password: password_hash,
          phone_number: body.phone_number,
          website: body.website,
          location: body.location,
          description: "",
          image: "",
        });
      let getSchools = await knex("schools").where("location", body.location);
      getSchools.map(async (school) => {
        await knex("org_school").insert({
          school_id: school.id,
          org_id: org[0].id,
          status: "",
        });
      });
      return org;
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  },

  async updateOrg(body) {
    let org = await knex("orgs")
      .returning([
        "name",
        "email",
        "location",
        "website",
        "location",
        "phone_number",
        "id",
        "image",
      ])
      .where({ id: body.id })
      .update({
        phone_number: body.phone_number,
        website: body.website,
        location: body.location,
        description: body.description,
      });
    return org;
  },

  async login(email, password) {
    let getUser = await knex("orgs").where("email", email);
    let user = getUser[0];
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
          "orgs.id",
          "orgs.name",
          "orgs.image",
          "orgs.email",
          "orgs.website",
          "orgs.description",
          "orgs.location",
          "orgs.phone_number"
        )
        .from("orgs")
        .where("orgs.email", email);
      let org = getOrg[0];
      return org;
    } catch (err) {
      return err;
    }
  },

  async getSchools(id) {
    try {
      let getOrgs = await knex
        .select(
          "schools.id",
          "schools.name",
          "schools.email",
          "schools.image",
          "schools.description",
          "schools.location",
          "org_school.status"
        )
        .from("schools")
        .join("org_school", "schools.id", "=", "org_school.school_id")
        .where("org_school.org_id", id);
      return getOrgs;
    } catch (err) {
      return err;
    }
  },
};
