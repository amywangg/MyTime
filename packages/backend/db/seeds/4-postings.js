const argon = require("argon2");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex("postings")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("postings").insert([
        {
          title: "Family Zone Team Member",
          description:
            "Families are a huge part of the Sound of Musical Festival. Whether you love working directly with children or set up and tear down work, you can help make the Festival a very special event for families. Positions include Setup / Tear Down Crew and Family Zone Assistant. Areas of interest: children & family service, event coordination, music & performing arts, and youth engagement",
          location: "Richmond Hill",
          org_id: 1,
          status: "open",
          date: "2022-03-30 18:07:17.367+00",
          supervisor: "Tom Hanks",
          created_at: "2022-03-30 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "Theatre Usher Volunteer",
          description:
            "Ushers assist theatre patrons to their seats, provide information about upcoming shows, ensure that the patrons of the theatre are safe and help ensure that visitors have amazing experiences. Assisting audience members to their seats, ensuring the safety of the audience members at events, under the supervision of the Theatre staff, checking tickets at ticketed events, providing information to patrons about events at the theatre , maintaining the basic tidiness of the theatre seating area and lobby, assisting with Coat Check when needed",
          location: "Richmond Hill",
          org_id: 1,
          status: "open",
          date: "2022-03-30 18:07:17.367+00",
          supervisor: "Winona Ryder",
          created_at: "2022-03-30 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "Compost Assistant",
          description:
            "This position focuses on community, youth engagement, and helping the environment. Working with our compost program to help shovel wood chips to help our composter run smoothly. This job will be performed outside. Looking for individuals who are outgoing, has patience, great customer service and leadership skills.",
          location: "Markham",
          org_id: 2,
          status: "open",
          date: "2022-03-30 18:07:17.367+00",
          supervisor: "Emma Stone",
          created_at: "2022-03-30 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "Development Committee",
          description:
            "The Development Committee interacts with the Board: brainstorming, making creative suggestions, and collaborating with several Action Groups that are the front line of the organization. In general, we need people with a commitment to the natural world and willingness to collaborate with a group to apply that commitment in action. 1. Attending and participating in a biweekly Zoom meeting of the Development Committee, usually on a Tuesday evening, from 6:30 p.m. to 7:30 p.m. 2. Brainstorming and engaging in creative, imaginative thinking with a diverse group. 3. As much as possible, following up between meetings to report relevant information or ideas for the following meeting. We welcome and value a few high school students, but we need a majority of adults. We respect that the students must put their academics first, which usually results in losing students at some time in the year.",
          location: "Markham",
          org_id: 2,
          status: "open",
          supervisor: "Jennifer Anniston",
          date: "2022-03-30 18:07:17.367+00",
          created_at: "2022-03-30 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "Indoor / Outdoor Park Volunteer",
          description:
            "Do you like working with historical artifacts; cataloguing items; moving objects; outdoor yard work; parking cars; meeting people and participating in events? Our volunteer opportunities are vast and varied.",
          location: "Markham",
          org_id: 2,
          status: "open",
          date: "2022-03-30 18:07:17.367+00",
          supervisor: "Lisa Kudrow",
          created_at: "2022-03-30 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "Cancer Support - VIRTUAL Childcare Volunteer",
          description:
            "How you can help? Becoming a volunteer includes specialized training that will equip you with the tools to support moms with cancer and their children. A child’s needs during this difficult time is so important and our comprehensive training program will ensure that you’re prepared to support them once completed and approved. Provide fun, educational, creative, and safe experiences for the children. Looking for individuals interested in childcare, social work, nursing, and coaching",
          location: "Toronto",
          org_id: 3,
          status: "open",
          supervisor: "Courtney Cox",
          date: "2022-03-30 18:07:17.367+00",
          created_at: "2022-03-30 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "Medical Clinic Volunteer",
          description:
            "Dear Student, Are you passionate about the health-care field? Have you been struggling to choose your future career? Here is how we can help!!! Clinetic provides student volunteers with shadowing opportunities. You can shadow a chiropractor, naturopath, physiotherapist, osteopath, or medical doctor. We pay our practitioners using the insurance coverage that you have from school. When you or any other volunteer student needs treatment, you can shadow them and when you need treatment they can shadow you. This way our student volunteers get to experience a day into the lives of our doctors! Volunteer work tasks include: patient-care, outreach, research and more.",
          location: "Toronto",
          org_id: 3,
          status: "open",
          date: "2022-03-30 18:07:17.367+00",
          supervisor: "Adam Sandler",
          created_at: "2022-03-30 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "Help a Neighbor with a Homemade Meal",
          description:
            "Lasagna Love is an international movement, with thousands of people all cooking and delivering meals to families in their communities. What we do is simple: feed families, spread kindness, and strengthen communities. Our mission is not only to help address the incredible rise in food insecurity among families but also to provide a simple act of love and kindness during a time full of uncertainty and stress. Lasagna Love matches neighbors who can provide a meal with a neighbor who needs a little help. You can decide how often you participate- once a month, multiple lasagnas a week, or somewhere in between. You decide how far you can drive to deliver a meal, and if you can accommodate special diets like vegetarian or gluten free. The Lasagna Love Team does the rest to match you with a neighbor in need. We will also provide online trainings to help you get started and drop off meals contact free, recipes if you are looking for inspiration, and any other support you need. If you are looking for a flexible opportunity, or a way for your family to volunteer together making a meal for a neighbor in need, this is a great opportunity to spread some kindness!",
          location: "Markham",
          org_id: 4,
          status: "open",
          supervisor: "Drew Barrymore",
          date: "2022-03-30 18:07:17.367+00",
          created_at: "2022-03-30 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "Museum Camp for Kids",
          description:
            "Provide our kids hands-on learning to highlight our amazing collection and cutting-edge research, takes a multi-disciplinary approach to programming, and works to connect children and their families to the exciting life-long learning available through our camps.  Our programs seek enthusiastic, dedicated volunteers who love sharing the Museum with children and families. Through this experience volunteers are exposed to many subject areas and experts, allowing them to learn about the various careers available in science, history, education, art, and museums. Some ways you can help is by preparing materials and facilitate activities, escorting children through the museum and field trips.",
          location: "Markham",
          org_id: 4,
          status: "open",
          supervisor: "Matt Damon",
          date: "2022-03-30 18:07:17.367+00",
          created_at: "2022-03-30 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "Public Outreach / Information Booth Worker",
          description:
            "Spread awareness of sexual violence and the services of SAVIS throughout the Halton Region by staffing information booths. Youth between the ages of 14 and 18 are able to staff some booths based on the booth location and topics. Suitable for: Woman-identified, male-identified, genderfluid people. Days and times will vary depending on outreach opportunities. Volunteers should be able to commit to one outreach session per month and attend monthly volunteer meetings. Looking for individuals who have great customer service skills, can work well in a team, and are self-motivated. Fully Accessible ; Please be advised that in order to be eligible for volunteering, all new volunteers must have received the full series of a COVID-19 vaccine or combination of COVID-19 vaccines approved by Health Canada. 20 individual(s) needed in total. We are always looking for new volunteers",
          location: "Toronto",
          org_id: 5,
          status: "open",
          supervisor: "Jennifer Lopez",
          date: "2022-03-30 18:07:17.367+00",
          created_at: "2022-03-30 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "Volunteer Advocate Ending Extreme Poverty",
          description:
            "Results is an advocacy nonprofit that believes in mobilizing everyday people (our volunteers) to generate the political will to end extreme poverty in low-and middle-income countries. We focus our work on global health, access to quality education and economic opportunities. We direct our energy and efforts at government decision makers like party leaders, Members of Parliament and senators because they have the power to improve policies and make the monetary investments needed to end extreme poverty. We also raise awareness by writing letters to the editor (LTEs) and op-eds, using social media, fundraising and more. Oftentimes the first step is putting these issues on the radar — and keeping the pressure on. It might seem like a small step, but it all adds up into impact. support structure: Volunteers (virtually) meet in local groups on a monthly basis and rely on their group leader(s) for guidance. Attending other virtual calls and webinars led by Results staff is recommended. Looking for 10 individuals who have good writing and editing, research, communication and interpersonal skills and can work independently.",
          location: "Toronto",
          org_id: 5,
          status: "open",
          supervisor: "Chris Evans",
          date: "2022-03-30 18:07:17.367+00",
          created_at: "2022-03-30 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        //12
        {
          title: "Youth Spring Volunteer Initiative",
          description:
            "Plan recreational activities and games for children who are medically-complex. Provide companionship and engagement to kids 0-18 years of age with medical complexities. Assist staff with everyday tasks such as meal prep, laundry, activity supply prep, tidying and organizing, etc.",
          location: "Vaughan",
          org_id: 6,
          status: "open",
          date: "2022-03-30 18:07:17.367+00",
          supervisor: "Liam Hemsworth",
          created_at: "2022-03-30 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "2022 Soccer Camp Volunteer",
          description:
            "Volunteers at our summer day camps may have any of the following responsibilities: Assisting staff with coaching and supervising children at camp. Equipment collection and maintenance (ie. inflating soccer balls, collecting cones). General help around camp. Maintain a clean camp environment and help staff meet all safety protocols. Adhere to and help enforce all camp policies. Qualities we’re looking for: Enjoys soccer and sporting activities, great with children (ages 5 to 13 years), energetic and enthusiastic, responsible and reliable. Volunteers at our camp must be at least 14 years of age by the time their camp week of volunteering starts. If you are 16 or older, you may be eligible for a CIT (Counsellor in Training) or Camp Counsellor position with us. Any volunteers aged 18 or older will be required to submit a police background check. There are a limited number of volunteering spots available at each camp location.",
          location: "Vaughan",
          org_id: 6,
          status: "open",
          date: "2022-03-30 18:07:17.367+00",
          supervisor: "Timothee Chalamet",
          created_at: "2022-03-30 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "Aquatics Volunteer",
          description:
            "Assist Swimming Instructors teach skills, drills and activities to Learn to Swim participants. Great experience for those interested in becoming a life guard/instructor or working with children.",
          location: "Vaughan",
          org_id: 6,
          status: "open",
          date: "2022-03-30 18:07:17.367+00",
          supervisor: "Selena Gomez",
          created_at: "2022-03-30 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
        {
          title: "Running & Reading Club Coach",
          description:
            "Start2Finish is so excited to get back into the Halton community! We are recruiting new volunteers to join us in facilitating our Running & Reading Clubs at Oakwood Elementary School in Oakville. The R&R program addresses the need for enhanced literacy and physical activity among children experiencing poverty/deprivation in the communities it services. The R&R clubs are for children in grades 1-6. About the opportunity: Once a week, after-school, ~2 hours/session (end-of-March to end-of-May) Facilitate games, activities, Facilitate one-on-one and/or group discussions , Read stories , Build meaningful connections and have fun! What you bring to the table: Passion for change, Enjoy working with children, Strong communicator, Leadership skills, A current vulnerable sector check (or able to obtain one), Access to reliable transportation (car, city bus, etc.) ",
          location: "Vaughan",
          org_id: 6,
          status: "open",
          supervisor: "Pete Davidson",
          date: "2022-03-30 18:07:17.367+00",
          created_at: "2022-03-30 18:07:27.859961+00",
          expires_at: "2022-04-11 17:07:17.367+00",
        },
      ]);
    });
};
