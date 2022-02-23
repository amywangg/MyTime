const knex = require("../knex");
const argon = require("argon2");

module.exports = {
  async createSchool(body) {
    try {
      let password_hash = await argon.hash(body.password);
      return knex("schools").returning(["name", "email"]).insert({
        name: body.name,
        email: body.email,
        password: password_hash,
        location: body.location,
        description: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
    }
  },

  async login(email, password) {
    let getUser = await knex("school").where("email", email);
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
};
