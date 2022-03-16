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
          email: "brunovasquez@gmail.com",
          password: password_hash,
          first_name: "Bruno",
          middle_name: "",
          last_name: "Vasquez",
          school_id: 1,
          school: "Bayview Secondary School",
          student_id: "109824042",
          description:
            "I'm not exactly sure what I want to be. I have interests in both legal studies and construction. I want to try volunteering in both sectors to help me figure out which one I like more.",
          date_of_birth: "2007-03-15",
          skills: "teamwork, problem solving, creativity, negotiation",
        },
        {
          email: "rachelgreen@gmail.com",
          password: password_hash,
          first_name: "Rachel",
          middle_name: "",
          last_name: "Green",
          school_id: 2,
          school: "Markham District H.S",
          student_id: "335576932",
          description:
            "Fashion is my only interest. My goal is to become the next female Ralph Lauren. I've attended the Marc Jacobs camp in summer 2019 and would like to put my skills to the test through volunteering opportunities.",
          date_of_birth: "2007-05-05",
          skills:
            "customer service, communications, creativity, legal & advocacy, building & construction",
        },
        {
          email: "monicag@gmail.com",
          password: password_hash,
          first_name: "Monica",
          middle_name: "",
          last_name: "Geller",
          school_id: 2,
          school: "Markham District H.S",
          student_id: "335435823",
          description:
            "My goal is to gain experiences in the healthcare industry as I want to become a pediatric surgeon. My hobbies consist of cooking and cleaning (yes it's a hobby).",
          date_of_birth: "2007-03-06",
          skills:
            "cheerful, cooking, healthcare, teamwork, creativity, children & youth",
        },
        {
          email: "jtribbiani@gmail.com",
          password: password_hash,
          first_name: "Joey",
          middle_name: "",
          last_name: "Tribbiani",
          school_id: 3,
          school: "Pierre Elliott Trudeau H.S.",
          student_id: "314753289",
          description:
            "I'm focus on volunteering beyond the 40 hours required for my graduation. I want to go into social and legal studies and become a human rights lawyer. Any exposure to areas like hunger, advocacy and humany rights, and homeless & housing is what i'm looking for.",
          date_of_birth: "2006-01-09",
          skills:
            "Human Services, Legal & Advocacy, leadership, communication, customer service, listening ",
        },
        {
          email: "pheobebuffay@gmail.com",
          password: password_hash,
          first_name: "Pheobe",
          middle_name: "",
          last_name: "Buffay",
          school_id: 4,
          school: "Markville Secondary School",
          student_id: "325783587",
          description:
            "Looking to complete my 40 volunteer hours. Interested in animals and saving the planet!",
          date_of_birth: "2006-02-16",
          skills: "animals, nature, environment, teamwork, customer service",
        },
        {
          email: "chandlerb@gmail.com",
          password: password_hash,
          first_name: "Chandler",
          middle_name: "",
          last_name: "Bing",
          school_id: 2,
          school: "Markham District H.S",
          student_id: "335586937",
          description:
            "I'm interest in finance and would like real world experience in the field",
          date_of_birth: "2005-04-08",
          skills:
            "independent, self-motivated, office work & business, computers",
        },
        {
          email: "rossgell@gmail.com",
          password: password_hash,
          first_name: "Ross",
          middle_name: "",
          last_name: "Geller",
          school_id: 2,
          school: "Markham District H.S",
          student_id: "335423167",
          description:
            "I have a strong passions for archaeology and palaeontology. I enjoy teaching kids and have experience volunteering at a daycare center where I read books about dinosaurs. I've completed over 80 hours at a variety of place and looking to do more.",
          date_of_birth: "2005-04-08",
          skills:
            "children & youth, science, environment, teamwork, planning & organizing, research, writing & editing",
        },
      ]);
    });
};
