const argon = require("argon2");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex("postings")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("postings").insert([
        {
          title: "test1",
          description: "test",
          location: "fadf",
          org_id: 1,
          status: "open",
          date: "2022-03-12 18:07:17.367+00",
          created_at: "2022-03-12 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "test2",
          description: "test",
          location: "fadf",
          org_id: 1,
          status: "open",
          date: "2022-03-12 18:07:17.367+00",
          created_at: "2022-03-12 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "test3",
          description: "test",
          location: "fadf",
          org_id: 1,
          status: "open",
          date: "2022-03-12 18:07:17.367+00",
          created_at: "2022-03-12 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "test4",
          description: "test",
          location: "fadf",
          org_id: 1,
          status: "open",
          date: "2022-03-12 18:07:17.367+00",
          created_at: "2022-03-12 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "test5",
          description: "test",
          location: "fadf",
          org_id: 1,
          status: "open",
          date: "2022-03-12 18:07:17.367+00",
          created_at: "2022-03-12 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
      ]);
    });
};
