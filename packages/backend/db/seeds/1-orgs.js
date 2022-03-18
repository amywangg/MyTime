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
          email: "mticountdown@gmail.com",
          password: password_hash,
          name: "MTI Countdowns",
          location: "Toronto",
          website: "https://mymti.org/",
          phone_number: "905-884-8477",
          description:
            "We are a group of young and ambitious individuals who have an innate passion for music and broadcasting. As a registered non-profit organization based out of Canada, our goal is to educate and entertain Japanese music culture to everyone around the world. We believe the power and future of digital radio broadcasting is in podcasting. We strive to be acclaimed at educating and entertaining listeners in Japanese music culture. We cater our podcast to the feedback and needs of listeners. We believe in the development of the Japanese music industry through digital media broadcasting. Our podcast show is called Japan Top 10 and it is a podcast focusing on the mainstream music from Japan along with the cultural aspects that are intertwined in Japan's music.",
          image:
            "https://media.redcircle.com/images/2020/4/17/20/044d51d1-8e25-42ef-a7f5-d60cf9a5d5ba_3776e1-59c0693cf9d5f.png",
          //  category: "Arts & Culture, Education & Literacy, Computers & Technology, Media & Broadcasting, International"
        },
        {
          email: "climatescience@gmail.com",
          password: password_hash,
          name: "Climate Science",
          location: "Toronto",
          website: "https://climatescience.org/",
          phone_number: "416-416-4166",
          description:
            "We are a UK-based charity driven by volunteers from all around the world. Our articles and courses reference scientific reports & papers to help you trust what you read. We try to explain things simply, and focus on what's most important to solve climate change. We promote work on clean energy, recycling, sustainable agriculture, and other major challenges.",
          image:
            "https://climatescience.org/climate-science/icons/climate-science-icon-384x384.png",
          //category: "Community, Environment, Education & Literacy, International"
        },
        {
          email: "sickkids@gmail.com",
          password: password_hash,
          name: "Sick Kids Foundation",
          location: "Toronto",
          website: "https://www.sickkids.ca/",
          phone_number: "416-416-4166",
          description:
            "SickKids wouldn’t be the same without the strength, commitment and diversity of our valued volunteers. Every volunteer role at the hospital presents exciting new opportunities to learn, engage and gain enriching experiences. The benefits to volunteering are endless. Through direct or indirect interaction with patients and their families, you contribute to the quality of care, spirit and overall experience at SickKids.Volunteers are essential SickKids team members. We depend on them to enhance the programs and services we offer, and to assist staff in providing the finest standards of health care that align with our SickKids mission, vision and values.",
          image:
            "https://childrenshospitals.ca/wp-content/uploads/2019/03/logo-SickKids-320x200.png",
          //category: "Children & Youth, Healthcare, Community"
        },
        {
          email: "markhammuseum@gmail.com",
          password: password_hash,
          name: "Markham Museum",
          location: "Markham",
          website:
            "https://www.markham.ca/wps/portal/home/arts/markham-museum/?utm_source=markhammuseum.ca&utm_medium=referral&utm_campaign=redirects",
          phone_number: "416-416-4166",
          description:
            "We are associated with the City of Markham. We are looking for passionate people ages 14 and older who want to share their talents, skills and experiences to make Markham an even better place to live, work and play! Make new friends and memories that will last a lifetime by volunteering for Recreation Services, Markham Museum, Varley Art Gallery of Markham, Flato Markham Theatre, Markham Public Library or at one of the City’s events.",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuwoiHKV40V0j2fnoUXgFlA5ktMWnVAUfzmQ&usqp=CAU",
          // category: "Community, Children & Youth, Seniors"
        },
        {
          email: "savis@gmail.com",
          password: password_hash,
          name: "SAVIS of Halton",
          location: "Halton",
          website: "www.savisofhalton.org",
          phone_number: "905-825-3622",
          description:
            "Sexual Assault and Violence Intervention Services (SAVIS of Halton) offers free and confidential 24/7, one-on-one crisis counselling services, with no judgment, just support. Services can be short- or long-term in nature and are open to female-identified, male-identified and transgender people aged 12 and over who are survivors of violence, including childhood sexual abuse. SAVIS does not discriminate when it comes to race, colour, disability, age or national origin.",
          image:
            "https://pbs.twimg.com/profile_images/850410741551312897/_JN-b8LL_400x400.jpg",
          //  category: "Legal & Advocacy"
        },
        {
          email: "darlinghomeforkids@gmail.com",
          password: password_hash,
          name: "Darling Home For Kids",
          location: "Vaughan",
          website: "www.darlinghomeforkids.ca",
          phone_number: "905-825-3622",
          description:
            "The Darling Home for Kids, situated in Vaughan, Ontario, is a place of joy, filled with the smiles and laughter of children engaging in unique and enriching experiences and exploring new and exciting activities. Medically fragile children receive wonderful care in a beautiful, warm and home-like environment, which provides comfort and a break to families facing the daily challenges of caring for a child with complex medical needs.  Families are supported in knowing that there is a continuum of care from respite through to palliation and, when needed, end of life care. The Cedarbrook Society is a registered charity that owns and operates The Darling Home for Kids, a children’s hospice experience . ",
          image:
            "https://www.darlinghomeforkids.ca/wp-content/uploads/2017/07/logo.png",
        },
      ]);
    });
};
