const argon = require("argon2");

exports.seed = async function (knex) {
  let password_hash = await argon.hash("test");
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("students").insert([
        {
          email: "bruno@gmail.com",
          password: password_hash,
          first_name: "Bruno",
          middle_name: "",
          last_name: "mars",
          school_id: 1,
          school: "Bayview Secondary School",
          student_id: "1098240",
          description: "",
          date_of_birth: "2007-03-15",
        },
      ]);
    });
};
