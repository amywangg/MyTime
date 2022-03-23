const argon = require("argon2");

exports.seed = async function (knex) {
  let password_hash = await argon.hash("mytime");
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
          description:
            "We work collaboratively in our purpose to prepare students to be productive, responsible, life-long learners in an ever-changing, global society.",
          image:
            "https://media-exp1.licdn.com/dms/image/C4E0BAQFtweKPR-3zdg/company-logo_200_200/0/1605461825871?e=2159024400&v=beta&t=E22zkM4teEVN1zci6sktKH_oXOenrfbvFAzyXv-VmDU",
        },
        {
          email: "mdhs@yrdsb.ca",
          password: password_hash,
          name: "Markham District H.S",
          location: "Markham",
          description:
            "Mission: To advance student achievement and well-being through public education, which motivates learners, fosters inclusion, inspires innovation and builds community. Vision: To be a leader in public education by empowering all students to become engaged and caring citizens of the world. Values: Our School Board operates based on a set of values which guides our actions: Inclusivity: We demonstrate equity and inclusivity in all that we do. We demand an environment in which all students, staff, parents and our community feel valued and have a sense of belonging. We expect empathy, mutual respect and understanding to be demonstrated in our words and actions.  Relationships: We value positive, meaningful relationships with students, staff, parents and our community. We value diversity of opinion, sincere dialogue and community engagement. Innovation: We continuously strive to provide the best educational programs for all students. We empower staff and students to take initiative and to be innovative leaders. Engagement: We encourage active participation in all learning and activities by creating an environment that engages students, staff, parents and our community. Responsibility: We are individually and collectively responsible for creating the best possible school community to support the achievement and well-being of all individuals. We are responsible for the delivery of effective and sustainable educational programs and stewardship of Board resources. Optimism: We approach all situations with optimism. We cultivate confidence and resiliency in all students and staff.",
          image:
            "https://pbs.twimg.com/profile_images/1450176440637575174/XK7zlvBJ_400x400.png",
        },
        {
          email: "peths@yrdsb.ca",
          password: password_hash,
          name: "Pierre Elliott Trudeau H.S.",
          location: "Markham",
          description:
            "Mission Statement: We are active and inspired learners achieving our personal best in all that we do. Vision Statement: We value and are committed to: Canada’s official languages, Celebrating our cultural diversity, Developing engaged global citizens",
          image:
            "https://pbs.twimg.com/profile_images/1450176440637575174/XK7zlvBJ_400x400.png",
        },
        {
          email: "mss@yrdsb.ca",
          password: password_hash,
          name: "Markville Secondary School",
          location: "Markham",
          description:
            "The Mission of the York Region District School Board is “To advance student achievement and well-being through public education, which motivates learners, fosters inclusion, inspires innovation and builds community.”  In order to support the Board's mission, Markville Secondary School envisions a community of future-oriented, self-disciplined, life-long learners who are dedicated to the pursuit of excellence. We are committed to providing a safe, caring and positive environment that fosters communication and mutual respect. Our focus is on fostering the development of personal and ethical values in conjunction with the creative, social, academic, and technological skills needed to be successful in our ever-changing and competitive world.  ",
          image:
            "https://pbs.twimg.com/profile_images/1450176440637575174/XK7zlvBJ_400x400.png",
        },
        {
          email: "rhhs@yrdsb.ca",
          password: password_hash,
          name: "Richmond Hill H.S",
          location: "Richmond Hill",
          description:
            "Mission Statement: Richmond Hill High School maintains a reputation of academic excellence, a strong sense of belonging and a commitment to student involvement in both school and community life. Vision Statement: Richmond Hill High School is dedicated to developing our students’ academic excellence, love of learning, personal growth and sense of responsibility to the global community.",
          image:
            "https://pbs.twimg.com/profile_images/1450176440637575174/XK7zlvBJ_400x400.png",
        },
      ]);
    });
};
