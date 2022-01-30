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
};
