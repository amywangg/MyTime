const knex = require("../knex");
const argon = require("argon2");
const auth = require("../../middlewares/auth");

module.exports = {
  async createStudent(
    email,
    password,
    first_name,
    middle_name,
    last_name,
    student_id,
    school,
    date_of_birth
  ) {
    try {
      let password_hash = await argon.hash(password);
      return knex("students")
        .returning(["first_name", "email"])
        .insert({
          email: email,
          password: password_hash,
          first_name: first_name,
          middle_name: middle_name || "",
          last_name: last_name,
          student_id: student_id,
          school: school,
          date_of_birth: date_of_birth,
        });
    } catch (error) {
      process.exit(1);
    }
  },

  async login(username, password) {
    let getUser = await knex("users").where("username", username);
    let user = getUser[0];

    try {
      if (await argon.verify(user.password_hash, password)) {
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
      let getOrgPosting = await knex.select("postings.title","orgs.name","orgs.website","postings.id","postings.description","students.first_name","students.middle_name","students.last_name","student_job.status")
      .from("postings")
      .leftJoin("jobs","postings.id","jobs.posting_id")
      .leftJoin("orgs","orgs.id","postings.org_id")
      .leftJoin("student_job","student_job.posting_id","postings.id")
      .leftJoin("students","students.id","student_job.student_id")
      .where("postings.id",posting_id)
      ;
      let org_posting = getOrgPosting[0];
      return org_posting;
    } catch (err) {
      return err;
    }
  },
  
  // if job length (num hours) gets added into jobs table, update the query to include that value
  async orgJobs(org_id) {
    try {
      let orgJobs = await knex.select("orgs.name","postings.title","orgs.website","postings.expires_at","student_job.status","job.start_time")
      .from("orgs")
      .leftJoin("postings","orgs.id","postings.org_id")
      .leftJoin("jobs","jobs.posting_id","postings.id")
      .leftJoin("student_job","student_job.posting_id","postings.id")
      .where("orgs.id",org_id)
      ;
      let org_job = orgJobs[0];
      return org_job;
    } catch (err) {
      return err;
    }
  },

  async getOrg(org_id) {
    try {
      let getOrg = await knex.select("orgs.name","orgs.email","orgs.website","orgs.description","orgs.phone_number","admins.school")
      .from("orgs")
      .leftJoin("org_school","org_school.org_id","orgs.id")
      .leftJoin("admins","admins.adminId","org_school.admin_ID")
      .where("orgs.id",org_id)
      ;
      let org = getOrg[0];
      return org;
    } catch (err) {
      return err;
    }
  },  
};
