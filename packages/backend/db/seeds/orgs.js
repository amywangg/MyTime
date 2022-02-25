const argon = require("argon2");

exports.seed = async function (knex) {
  let password_hash = await argon.hash("test");
  // Deletes ALL existing entries
  return knex("orgs")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("orgs").insert([
        {
          email: "rhillvets@gmail.com",
          password: password_hash,
          name: "Richmond Hill Veterinary",
          location: "Richmond Hill",
          website: "www.rhillvets.com",
          phone_number: "416-416-4166",
          description: "",
          image:
            "https://mulfordanimal.com/files/2021/01/Mulford-AH-Color-Logo.gif",
        },
        {
          email: "townrhill@gmail.com",
          password: password_hash,
          name: "Town of Richmond Hill",
          location: "Richmond Hill",
          website: "https://www.richmondhill.ca/en/index.aspx",
          phone_number: "416-416-4166",
          description: "",
          image:
            "https://pbs.twimg.com/profile_images/2553373725/yr8gsadj65izt1fq0xfk_400x400.jpeg",
        },
        {
          email: "sickkids@gmail.com",
          password: password_hash,
          name: "Sick Kids Foundation",
          location: "Richmond Hill",
          website: "https://www.sickkids.ca/",
          phone_number: "416-416-4166",
          description: "",
          image:
            "https://childrenshospitals.ca/wp-content/uploads/2019/03/logo-SickKids-320x200.png",
        },
        {
          email: "markhammuseum@gmail.com",
          password: password_hash,
          name: "Markham Museum",
          location: "Markham",
          website:
            "https://www.markham.ca/wps/portal/home/arts/markham-museum/?utm_source=markhammuseum.ca&utm_medium=referral&utm_campaign=redirects",
          phone_number: "416-416-4166",
          description: "",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuwoiHKV40V0j2fnoUXgFlA5ktMWnVAUfzmQ&usqp=CAU",
        },
        {
          email: "ccs@gmail.com",
          password: password_hash,
          name: "Canadian Cancer Society",
          location: "Markham",
          website: "https://cancer.ca/en/",
          phone_number: "416-416-4166",
          description: "",
          image:
            "https://federatedhealth.ca/wp-content/uploads/2019/11/donate-canadian-cancer-society.png",
        },
      ]);
    });
};
