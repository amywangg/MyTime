const argon = require("argon2");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex("org_school")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("org_school").insert([
        { org_id: 1, school_id: 1, status: "verified" },
        { org_id: 2, school_id: 1, status: "verified" },
        { org_id: 3, school_id: 1, status: "verified" },
        { org_id: 4, school_id: 1, status: "verified" },
        { org_id: 5, school_id: 1, status: "verified" },
        { org_id: 6, school_id: 1, status: "verified" },
        { org_id: 7, school_id: 1, status: "verified" },
        { org_id: 8, school_id: 1, status: "verified" },
        { org_id: 9, school_id: 1, status: "verified" },
        { org_id: 10, school_id: 1, status: "verified" },
        { org_id: 11, school_id: 1, status: "verified" },

        { org_id: 1, school_id: 2, status: "verified" },
        { org_id: 2, school_id: 2, status: "verified" },
        { org_id: 3, school_id: 2, status: "verified" },
        { org_id: 4, school_id: 2, status: "verified" },
        { org_id: 5, school_id: 2, status: "verified" },
        { org_id: 6, school_id: 2, status: "verified" },
        { org_id: 7, school_id: 2, status: "verified" },
        { org_id: 8, school_id: 2, status: "verified" },
        { org_id: 9, school_id: 2, status: "verified" },
        { org_id: 10, school_id: 2, status: "verified" },
        { org_id: 11, school_id: 2, status: "verified" },

        { org_id: 1, school_id: 3, status: "verified" },
        { org_id: 2, school_id: 3, status: "verified" },
        { org_id: 3, school_id: 3, status: "verified" },
        { org_id: 4, school_id: 3, status: "verified" },
        { org_id: 5, school_id: 3, status: "verified" },
        { org_id: 6, school_id: 3, status: "verified" },
        { org_id: 7, school_id: 3, status: "verified" },
        { org_id: 8, school_id: 3, status: "verified" },
        { org_id: 9, school_id: 3, status: "verified" },
        { org_id: 10, school_id: 3, status: "verified" },
        { org_id: 11, school_id: 3, status: "verified" },

        { org_id: 1, school_id: 4, status: "verified" },
        { org_id: 2, school_id: 4, status: "verified" },
        { org_id: 3, school_id: 4, status: "verified" },
        { org_id: 4, school_id: 4, status: "verified" },
        { org_id: 5, school_id: 4, status: "verified" },
        { org_id: 6, school_id: 4, status: "verified" },
        { org_id: 7, school_id: 4, status: "verified" },
        { org_id: 8, school_id: 4, status: "verified" },
        { org_id: 9, school_id: 4, status: "verified" },
        { org_id: 10, school_id: 4, status: "verified" },
        { org_id: 11, school_id: 4, status: "verified" },

        { org_id: 1, school_id: 5, status: "verified" },
        { org_id: 2, school_id: 5, status: "verified" },
        { org_id: 3, school_id: 5, status: "verified" },
        { org_id: 4, school_id: 5, status: "verified" },
        { org_id: 5, school_id: 5, status: "rejected" },
        { org_id: 6, school_id: 5, status: "verified" },
        { org_id: 7, school_id: 5, status: "verified" },
        { org_id: 8, school_id: 5, status: "verified" },
        { org_id: 9, school_id: 5, status: "verified" },
        { org_id: 10, school_id: 5, status: "verified" },
        { org_id: 11, school_id: 5, status: "verified" },
      ]);
    });
};

//org:
