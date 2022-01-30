const knex = require("../knex");
const argon = require("argon2");
const auth = require("../../middleware/auth");

module.exports = {
  async createAdmin(body) {
    try {
      let password_hash = await argon.hash(body.password);
      return knex("students").returning(["user_id", "school"]).insert({
        user_id: body.user_id,
        password: password_hash,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async login(user_id, password) {
    let getUser = await knex("admins").where("user_id", user_id);
    let user = getUser[0];

    try {
      if (await argon.verify(user.password, password)) {
        console.log("SUCCESS: " + user);
        return user;
      }
    } catch (e) {
      return e;
    }
  },
};
