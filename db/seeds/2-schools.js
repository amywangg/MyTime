const argon = require("argon2");

exports.seed = async function (knex) {
  let password_hash = await argon.hash("test");
  // Deletes ALL existing entries
  return knex("schools")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("schools").insert([
        {
          email: "bss@yrdsb.ca",
          password: password_hash,
          name: "Bayview Secondary School",
          location: "Richmond Hill",
          description: "",
          image:
            "https://media-exp1.licdn.com/dms/image/C4E0BAQFtweKPR-3zdg/company-logo_200_200/0/1605461825871?e=2159024400&v=beta&t=E22zkM4teEVN1zci6sktKH_oXOenrfbvFAzyXv-VmDU",
        },
        {
          email: "mdhs@yrdsb.ca",
          password: password_hash,
          name: "Markham District H.S",
          location: "Markham",
          description: "",
          image:
            "https://pbs.twimg.com/profile_images/1450176440637575174/XK7zlvBJ_400x400.png",
        },
        {
          email: "peths@yrdsb.ca",
          password: password_hash,
          name: "Pierre Elliott Trudeau H.S.",
          location: "Markham",
          description: "",
          image:
            "https://pbs.twimg.com/profile_images/1450176440637575174/XK7zlvBJ_400x400.png",
        },
        {
          email: "mss@yrdsb.ca",
          password: password_hash,
          name: "Markville Secondary School",
          location: "Markham",
          description: "",
          image:
            "https://pbs.twimg.com/profile_images/1450176440637575174/XK7zlvBJ_400x400.png",
        },
        {
          email: "rhhs@yrdsb.ca",
          password: password_hash,
          name: "Richmond Hill H.S",
          location: "Richmond Hill",
          description: "",
          image:
            "https://pbs.twimg.com/profile_images/1450176440637575174/XK7zlvBJ_400x400.png",
        },
      ]);
    });
};
