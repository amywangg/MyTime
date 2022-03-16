const argon = require("argon2");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex("jobs")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("jobs").insert([
        {
          posting_id: 1,
          start_time: "9:00 am",
          end_time: "5:00 pm",
          openings: 3,
          applicants: 0,
          status: "open",
        },
        {
          posting_id: 1,
          start_time: "12:00 pm",
          end_time: "5:00 pm",
          openings: 3,
          applicants: 0,
          status: "open",
        },
        {
          posting_id: 2,
          start_time: "9:00 am",
          end_time: "5:00 pm",
          openings: 3,
          applicants: 0,
          status: "open",
        },
        {
          posting_id: 3,
          start_time: "9:00 am",
          end_time: "5:00 pm",
          openings: 3,
          applicants: 0,
          status: "open",
        },
        {
          posting_id: 4,
          start_time: "9:00 am",
          end_time: "5:00 pm",
          openings: 3,
          applicants: 0,
          status: "open",
        },
        {
          posting_id: 5,
          start_time: "9:00 am",
          end_time: "5:00 pm",
          openings: 3,
          applicants: 0,
          status: "open",
        },
      ]);
    });
};
