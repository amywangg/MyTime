const knex = require("../knex");
const argon = require("argon2");
const { getOrg } = require("./orgs");

module.exports = {
  async createSchool(body) {
    try {
      let password_hash = await argon.hash(body.password);
      let school = await knex("schools")
        .returning(["name", "email", "id", "location", "image", "description"])
        .insert({
          name: body.name,
          email: body.email,
          password: password_hash,
          location: body.location,
          description: "",
          image: "",
        });
      let getOrgs = await knex("orgs").where("location", body.location);
      getOrgs.map(async (org) => {
        await knex("org_school").insert({
          org_id: org.id,
          school_id: school[0].id,
          status: "",
        });
      });
      return school;
    } catch (error) {
      console.log(error);
    }
  },

  async login(email, password) {
    let getUser = await knex("schools").where("email", email);
    let user = getUser[0];
    try {
      if (await argon.verify(user.password, password)) {
        return user;
      }
    } catch (e) {
      return e;
    }
  },

  async getSchool(email) {
    try {
      let getSchool = await knex
        .select(
          "schools.id",
          "schools.name",
          "schools.email",
          "schools.image",
          "schools.description",
          "schools.location"
        )
        .from("schools")
        .where("schools.email", email);
      let school = getSchool[0];
      return school;
    } catch (err) {
      return err;
    }
  },
  async updateSchool(body) {
    let org = await knex("schools")
      .returning(["name", "email", "location", "id", "image", "description"])
      .where({ id: body.id })
      .update({
        location: body.location,
        email: body.email,
        description: body.description,
        image: body.image,
      });
    return org;
  },

  async getOrgs(id) {
    try {
      let getOrgs = await knex
        .select(
          "orgs.id",
          "orgs.name",
          "orgs.email",
          "orgs.image",
          "orgs.website",
          "orgs.phone_number",
          "orgs.description",
          "orgs.location",
          "org_school.status"
        )
        .from("orgs")
        .join("org_school", "orgs.id", "=", "org_school.org_id")
        .where("org_school.school_id", id);
      return getOrgs;
    } catch (err) {
      return err;
    }
  },

  async updateOrgStatus(org_id, school_id, status) {
    try {
      let getOrgs = await knex("org_school")
        .where({ school_id: school_id, org_id: org_id })
        .update({ status: status });
      return getOrgs;
    } catch (err) {
      return err;
    }
  },
};
