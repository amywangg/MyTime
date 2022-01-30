const knex = require("../knex");
const argon = require("argon2");

module.exports = {
  async createStudent(body) {
    try {
      let password_hash = await argon.hash(body.password);
      return knex("students")
        .returning(["first_name", "email"])
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
    let getStudent = await knex("students").where("email", email);
    let student = getStudent[0];

    try {
      if (await argon.verify(student.password, password)) {
        return student;
      }
    } catch (e) {
      return e;
    }
  },
};
