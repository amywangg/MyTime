const argon = require("argon2");

exports.seed = async function (knex) {
  return knex("student_job")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("student_job").insert([
        {
          job_id: 18,
          student_id: 3,
          status: "selected",
          saved: "false",
        },
        {
          job_id: 17,
          student_id: 3,
          status: "signed",
          saved: "false",
        },
        {
          job_id: 19,
          student_id: 3,
          status: "",
          saved: "false",
        },
        {
          job_id: 17,
          student_id: 6,
          status: "",
          saved: "false",
        },
        {
          job_id: 19,
          student_id: 6,
          status: "applied",
          saved: "false",
        },
        {
          job_id: 18,
          student_id: 6,
          status: "applied",
          saved: "false",
        },
        {
          job_id: 13,
          student_id: 1,
          status: "",
          saved: "true",
        },
        {
          job_id: 14,
          student_id: 1,
          status: "",
          saved: "true",
        },
        {
          job_id: 17,
          student_id: 1,
          status: "signed",
          saved: "true",
        },
        {
          job_id: 19,
          student_id: 1,
          status: "",
          saved: "true",
        },
        {
          job_id: 18,
          student_id: 1,
          status: "signed",
          saved: "true",
        },
        {
          job_id: 1,
          student_id: 1,
          status: "",
          saved: "true",
        },
        {
          job_id: 3,
          student_id: 1,
          status: "",
          saved: "true",
        },
        {
          job_id: 18,
          student_id: 3,
          status: "selected",
          saved: "false",
        },
        {
          job_id: 17,
          student_id: 3,
          status: "signed",
          saved: "false",
        },
        {
          job_id: 19,
          student_id: 3,
          status: "",
          saved: "false",
        },
        {
          job_id: 17,
          student_id: 6,
          status: "",
          saved: "false",
        },
        {
          job_id: 19,
          student_id: 6,
          status: "applied",
          saved: "false",
        },
        {
          job_id: 18,
          student_id: 6,
          status: "applied",
          saved: "false",
        },
        {
          job_id: 13,
          student_id: 1,
          status: "",
          saved: "true",
        },
        {
          job_id: 14,
          student_id: 1,
          status: "",
          saved: "true",
        },
        {
          job_id: 17,
          student_id: 1,
          status: "signed",
          saved: "true",
        },
        {
          job_id: 19,
          student_id: 1,
          status: "",
          saved: "true",
        },
        {
          job_id: 18,
          student_id: 1,
          status: "signed",
          saved: "true",
        },
        {
          job_id: 1,
          student_id: 1,
          status: "",
          saved: "true",
        },
        {
          job_id: 3,
          student_id: 1,
          status: "",
          saved: "true",
        },
      ]);
    });
};
