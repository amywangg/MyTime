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
          date: "2022-04-15 18:07:17.367+00",
          supervisor: "Tom Hanks",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Theatre Usher Volunteer",
          description:
            "Ushers assist theatre patrons to their seats, provide information about upcoming shows, ensure that the patrons of the theatre are safe and help ensure that visitors have amazing experiences. Assisting audience members to their seats, ensuring the safety of the audience members at events, under the supervision of the Theatre staff, checking tickets at ticketed events, providing information to patrons about events at the theatre , maintaining the basic tidiness of the theatre seating area and lobby, assisting with Coat Check when needed",
          location: "Richmond Hill",
          org_id: 1,
          status: "open",
          date: "2022-04-15 18:07:17.367+00",
          supervisor: "Winona Ryder",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Compost Assistant",
          description:
            "This position focuses on community, youth engagement, and helping the environment. Working with our compost program to help shovel wood chips to help our composter run smoothly. This job will be performed outside. Looking for individuals who are outgoing, has patience, great customer service and leadership skills.",
          location: "Markham",
          org_id: 2,
          status: "open",
          date: "2022-04-15 18:07:17.367+00",
          supervisor: "Emma Stone",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Development Committee",
          description:
            "The Development Committee interacts with the Board: brainstorming, making creative suggestions, and collaborating with several Action Groups that are the front line of the organization. In general, we need people with a commitment to the natural world and willingness to collaborate with a group to apply that commitment in action. 1. Attending and participating in a biweekly Zoom meeting of the Development Committee, usually on a Tuesday evening, from 6:30 p.m. to 7:30 p.m. 2. Brainstorming and engaging in creative, imaginative thinking with a diverse group. 3. As much as possible, following up between meetings to report relevant information or ideas for the following meeting. We welcome and value a few high school students, but we need a majority of adults. We respect that the students must put their academics first, which usually results in losing students at some time in the year.",
          location: "Markham",
          org_id: 2,
          status: "open",
          supervisor: "Jennifer Anniston",
          date: "2022-04-15 18:07:17.367+00",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Indoor / Outdoor Park Volunteer",
          description:
            "Do you like working with historical artifacts; cataloguing items; moving objects; outdoor yard work; parking cars; meeting people and participating in events? Our volunteer opportunities are vast and varied.",
          location: "Markham",
          org_id: 2,
          status: "open",
          date: "2022-04-15 18:07:17.367+00",
          supervisor: "Lisa Kudrow",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Cancer Support - VIRTUAL Childcare Volunteer",
          description:
            "How you can help? Becoming a volunteer includes specialized training that will equip you with the tools to support moms with cancer and their children. A child’s needs during this difficult time is so important and our comprehensive training program will ensure that you’re prepared to support them once completed and approved. Provide fun, educational, creative, and safe experiences for the children. Looking for individuals interested in childcare, social work, nursing, and coaching",
          location: "Toronto",
          org_id: 3,
          status: "open",
          supervisor: "Courtney Cox",
          date: "2022-04-15 18:07:17.367+00",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Medical Clinic Volunteer",
          description:
            "Dear Student, Are you passionate about the health-care field? Have you been struggling to choose your future career? Here is how we can help!!! Clinetic provides student volunteers with shadowing opportunities. You can shadow a chiropractor, naturopath, physiotherapist, osteopath, or medical doctor. We pay our practitioners using the insurance coverage that you have from school. When you or any other volunteer student needs treatment, you can shadow them and when you need treatment they can shadow you. This way our student volunteers get to experience a day into the lives of our doctors! Volunteer work tasks include: patient-care, outreach, research and more.",
          location: "Toronto",
          org_id: 3,
          status: "open",
          date: "2022-04-15 18:07:17.367+00",
          supervisor: "Adam Sandler",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Help a Neighbor with a Homemade Meal",
          description:
            "Lasagna Love is an international movement, with thousands of people all cooking and delivering meals to families in their communities. What we do is simple: feed families, spread kindness, and strengthen communities. Our mission is not only to help address the incredible rise in food insecurity among families but also to provide a simple act of love and kindness during a time full of uncertainty and stress. Lasagna Love matches neighbors who can provide a meal with a neighbor who needs a little help. You can decide how often you participate- once a month, multiple lasagnas a week, or somewhere in between. You decide how far you can drive to deliver a meal, and if you can accommodate special diets like vegetarian or gluten free. The Lasagna Love Team does the rest to match you with a neighbor in need. We will also provide online trainings to help you get started and drop off meals contact free, recipes if you are looking for inspiration, and any other support you need. If you are looking for a flexible opportunity, or a way for your family to volunteer together making a meal for a neighbor in need, this is a great opportunity to spread some kindness!",
          location: "Markham",
          org_id: 4,
          status: "open",
          supervisor: "Drew Barrymore",
          date: "2022-04-15 18:07:17.367+00",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Museum Camp for Kids",
          description:
            "Provide our kids hands-on learning to highlight our amazing collection and cutting-edge research, takes a multi-disciplinary approach to programming, and works to connect children and their families to the exciting life-long learning available through our camps.  Our programs seek enthusiastic, dedicated volunteers who love sharing the Museum with children and families. Through this experience volunteers are exposed to many subject areas and experts, allowing them to learn about the various careers available in science, history, education, art, and museums. Some ways you can help is by preparing materials and facilitate activities, escorting children through the museum and field trips.",
          location: "Markham",
          org_id: 4,
          status: "open",
          supervisor: "Matt Damon",
          date: "2022-04-15 18:07:17.367+00",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Public Outreach / Information Booth Worker",
          description:
            "Spread awareness of sexual violence and the services of SAVIS throughout the Halton Region by staffing information booths. Youth between the ages of 14 and 18 are able to staff some booths based on the booth location and topics. Suitable for: Woman-identified, male-identified, genderfluid people. Days and times will vary depending on outreach opportunities. Volunteers should be able to commit to one outreach session per month and attend monthly volunteer meetings. Looking for individuals who have great customer service skills, can work well in a team, and are self-motivated. Fully Accessible ; Please be advised that in order to be eligible for volunteering, all new volunteers must have received the full series of a COVID-19 vaccine or combination of COVID-19 vaccines approved by Health Canada. 20 individual(s) needed in total. We are always looking for new volunteers",
          location: "Toronto",
          org_id: 5,
          status: "open",
          supervisor: "Jennifer Lopez",
          date: "2022-04-15 18:07:17.367+00",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Volunteer Advocate Ending Extreme Poverty",
          description:
            "Results is an advocacy nonprofit that believes in mobilizing everyday people (our volunteers) to generate the political will to end extreme poverty in low-and middle-income countries. We focus our work on global health, access to quality education and economic opportunities. We direct our energy and efforts at government decision makers like party leaders, Members of Parliament and senators because they have the power to improve policies and make the monetary investments needed to end extreme poverty. We also raise awareness by writing letters to the editor (LTEs) and op-eds, using social media, fundraising and more. Oftentimes the first step is putting these issues on the radar — and keeping the pressure on. It might seem like a small step, but it all adds up into impact. support structure: Volunteers (virtually) meet in local groups on a monthly basis and rely on their group leader(s) for guidance. Attending other virtual calls and webinars led by Results staff is recommended. Looking for 10 individuals who have good writing and editing, research, communication and interpersonal skills and can work independently.",
          location: "Toronto",
          org_id: 5,
          status: "open",
          supervisor: "Chris Evans",
          date: "2022-04-15 18:07:17.367+00",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Youth Spring Volunteer Initiative",
          description:
            "Plan recreational activities and games for children who are medically-complex. Provide companionship and engagement to kids 0-18 years of age with medical complexities. Assist staff with everyday tasks such as meal prep, laundry, activity supply prep, tidying and organizing, etc.",
          location: "Vaughan",
          org_id: 6,
          status: "open",
          date: "2022-04-15 18:07:17.367+00",
          supervisor: "Liam Hemsworth",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "2022 Soccer Camp Volunteer",
          description:
            "Volunteers at our summer day camps may have any of the following responsibilities: Assisting staff with coaching and supervising children at camp. Equipment collection and maintenance (ie. inflating soccer balls, collecting cones). General help around camp. Maintain a clean camp environment and help staff meet all safety protocols. Adhere to and help enforce all camp policies. Qualities we’re looking for: Enjoys soccer and sporting activities, great with children (ages 5 to 13 years), energetic and enthusiastic, responsible and reliable. Volunteers at our camp must be at least 14 years of age by the time their camp week of volunteering starts. If you are 16 or older, you may be eligible for a CIT (Counsellor in Training) or Camp Counsellor position with us. Any volunteers aged 18 or older will be required to submit a police background check. There are a limited number of volunteering spots available at each camp location.",
          location: "Vaughan",
          org_id: 6,
          status: "open",
          date: "2022-04-15 18:07:17.367+00",
          supervisor: "Timothee Chalamet",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Aquatics Volunteer",
          description:
            "Assist Swimming Instructors teach skills, drills and activities to Learn to Swim participants. Great experience for those interested in becoming a life guard/instructor or working with children.",
          location: "Vaughan",
          org_id: 6,
          status: "open",
          date: "2022-04-15 18:07:17.367+00",
          supervisor: "Selena Gomez",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Running & Reading Club Coach",
          description:
            "Start2Finish is so excited to get back into the Halton community! We are recruiting new volunteers to join us in facilitating our Running & Reading Clubs at Oakwood Elementary School in Oakville. The R&R program addresses the need for enhanced literacy and physical activity among children experiencing poverty/deprivation in the communities it services. The R&R clubs are for children in grades 1-6. About the opportunity: Once a week, after-school, ~2 hours/session (end-of-March to end-of-May) Facilitate games, activities, Facilitate one-on-one and/or group discussions , Read stories , Build meaningful connections and have fun! What you bring to the table: Passion for change, Enjoy working with children, Strong communicator, Leadership skills, A current vulnerable sector check (or able to obtain one), Access to reliable transportation (car, city bus, etc.) ",
          location: "Vaughan",
          org_id: 6,
          status: "open",
          supervisor: "Pete Davidson",
          date: "2022-04-15 18:07:17.367+00",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Medical Clinic Volunteer",
          description:
            "Dear Student, Are you passionate about the health-care field? Have you been struggling to choose your future career? Here is how we can help!!!Clinetic provides student volunteers with shadowing opportunities. You can shadow a chiropractor, naturopath, physiotherapist, osteopath, or medical doctor. We pay our practitioners using the insurance coverage that you have from school. When you or any other volunteer student needs treatment, you can shadow them and when you need treatment they can shadow you. This way our student volunteers get to experience a day into the lives of our doctors! Volunteer work tasks include: patient-care, outreach, research and more.",
          location: "North York",
          org_id: 7,
          status: "open",
          date: "2022-04-15 18:07:17.367+00",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },

        {
          title: "Parkinson Advisory Council",
          description:
            "As a Member of the Parkinson Advisory Council, you bring your passion to make a difference for people affected by Parkinson’s. Your empathetic and compassionate approach to building community elevates the diverse perspectives of people affected by Parkinson’s. You are committed to Parkinson Canada’s mission and vision. As someone living with Parkinson’s, or with experience as a care partner of someone living with Parkinson’s, you bring your lived experience and expertise to the following responsibilities: Advise and make recommendations to the CEO on the development of new and/or existing programs, such as advocacy, programs and services, research, and fundraising. To inform Parkinson Canada on a patient engagement strategy for research, programs and services, advocacy, and fundraising, with the intent of strengthening Parkinson Canada’s engagement with the community. To promote the vision, mission, and initiatives of Parkinson Canada with the Parkinson community across Canada. To represent the PAC on additional internal Committees to ensure consistency and facilitate knowledge exchange. Additional responsibilities as agreed to. Lived experience as a person with Parkinson’s, or experience as a care partner of someone living with Parkinson’s. Passionate and eager to make a difference for the Parkinson’s community in Canada. Knowledge of Parkinson’s, networks, or connections within the Parkinson’s community. Strategic thinker with the ability to cultivate strong partnerships that grow the brand and mission of Parkinson Canada. Strong communication skills, including active listening. Dependable, responsive, and respectful of multiple points of view. Experience with or interest in the Canadian policy system, advocacy initiatives, or research and development, would be a strong asset. Mentorship experience would be an asset. Experience working with committees or advisory councils would be an asset. Commitment to the principles of Equity, Diversity, and Inclusivity",
          location: "North York",
          org_id: 7,
          status: "open",
          date: "2022-04-15 18:07:17.367+00",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },

        {
          title: "Osteoporosis Canada Bingo Volunteer",
          description:
            "Charity Bingo volunteers are needed to represent Osteoporosis Canada at Rama Gaming East located at 991 Kennedy Rd, Scarborough, Ontario.Task Requirements: Walking and standing, Hearing, Verbal communication, Visual",
          location: "North York",
          org_id: 7,
          status: "open",
          date: "2022-04-15 18:07:17.367+00",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Card Writing Volunteer",
          description:
            "A brief summary of how our volunteering program works is an individual commits to sending in a certain amount of cards on our website. There isn't a deadline and you can write the cards at your own pace. When you finish, you mail your cards to our PO box and we will read them and count the number of cards. A signed confirmation letter is then emailed to you to show to your guidance counselor/teacher. Signing up: The first thing to do is to sign up on our website as a volunteer card writer The form asks for an email address and we will email the confirmation letter to this address. Please read the form carefully! Writing the cards: We have a few guidelines up on our website for future reference. Basically we are looking for something that can be a keepsake for residents that they can display in their room and re-read if they wish. Students can buy cards or make cards themselves, it is up to you! However, the message inside the card must be handwritten. If you choose to make a card it doesn't have to be fancy, but we do expect you to put effort and care into each card. You can write about your hobbies, interests or share some inspiration. Mailing the cards: Students can mail the cards to our PO box (45017-81 Lakeshore Rd. E. Mississauga, ON L5G 1B0). Since this is a Canada Post PO box, the cards have to be sent through Canada Post. If you can, please package all the cards together in one large envelope/box. Receiving confirmation: When we receive the cards, we will read through each one and count up the total. A signed confirmation letter will be sent to the email address provided during sign-up. We grant students 30 minutes per card and will indicate the total number of hours earned on the signed confirmation letter. If you require a specific form to be signed or hours to be confirmed using a website such as Hour Republic, we ask that you reply to the confirmation email with the specific form attached and we will be more than happy to fill it out!",
          location: "North York",
          org_id: 7,
          status: "open",
          date: "2022-04-15 18:07:17.367+00",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Mentor/Volunteer-Coding",
          description:
            "1:1 mentoriship with gr1-6 and gr.7-12. Need to be a great mentor and experience coding",
          location: "Toronto",
          org_id: 8,
          status: "open",
          date: "2022-04-15 18:07:17.367+00",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Lead Technology Reuse Volunteer",
          description: `The Lead Technology Reuse Volunteer works in many dynamic, workshop-style volunteer areas which both produce refurbished technology and educate volunteers about technology. This position trains in multiple areas in order to help provide shift coverage, ensure a steady flow of gizmos for Free Geek Toronto and support volunteers. This position participates in group meetings to help develop programs and procedures. This position is not paid.
Free Geek Toronto (FGT) is looking for volunteers interested in taking unwanted technology and extending its life through reuse! Volunteers support the reuse of technology to create accessible and affordable options for the community with a focus on people from marginalized, low-income communities, and anyone else that needs access to affordable technology. Free Geek Toronto’s operations focus on accepting donations of technology and reusing/refurbishing/upcycling them into usable devices.
If this sounds like you, then we need you to join our team as a Lead Technology Reuse Volunteer. What You’ll Do:
Train, support, and motivate volunteers Troubleshoot and help maintain the technical infrastructure in production areas
Tests a variety of technologies, with an emphasis on computers and accessories

Keep work areas clean and organized
Monitor compliance of workflow and inventory with quality control protocols
Other duties as assigned

REQUIRED SKILLS, KNOWLEDGE AND ABILITIES:
Ability to maintain a calm, positive and professional attitude at all times in a sometimes chaotic environment
Ability to consistently follow policies and procedures

Strong organizational skills and attention to detail

Ability to work as part of a team and coordinate with teammates to determine daily responsibilities and priorities

Comfortable speaking and writing using technical language and communicating these ideas to people with low digital literacy

Demonstrable self-motivation and personal initiative

Reliability and punctuality

Must not be afraid to ask questions, but must be able to work without direct supervision on a regular basis

Significant technical skills and knowledge related to identifying, troubleshooting and installing computer components and related hardware
Experience as a volunteer at Free Geek Toronto or similar organization is an asset `,
          location: "Toronto",
          org_id: 8,
          status: "open",
          date: "2022-04-15 18:07:17.367+00",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },

        {
          title: "Digital Support Volunteer",
          description: `Purpose: To assist clients to participate in the Remote Monitoring program, involving a telemonitoring nurse who monitors clients’ self-inputted data, using an app. Clients may also use an iPad. This allows clients to stay in their homes longer, become active partners in making healthy lifestyle choices, avoid unnecessary hospital visits and it identifies issues before they turn into emergencies. AREA SERVED: Toronto: York, Scarborough, Downtown, East York, North York, Etobicoke (Visits Conducted Online or in-person) AGE REQUIREMENT: Must be 18 years, or older
RESPONSIBILITIES
Visit clients on assigned day/time; In-person or virtually (both opportunities available)
Assist clients using digital medical devices or tablets as per assignment and training
Ensure information is transferred electronically to the telemedicine nurse
Care for the safety of the client at all times.
Respect the client’s privacy and adhere to confidentiality and privacy policies (and other policies).
Report to supervisor in a timely manner.
Report all not found visits to the Call Centre immediately.
Be familiar with emergency procedures; follow all policies and procedure`,
          location: "Toronto",
          org_id: 8,
          status: "open",
          date: "2022-04-15 18:07:17.367+00",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        {
          title: "Digital Community Strategist",
          description: `Understand FGT’s mission, audience, and message to research and create and share posts about product descriptions, promotional items, and newsletter content based on marketing strategies that you design (with a team of colleagues always ready to support you)
Power digital community development, digital strategy, and content creation for all digital and social media channels for Free Geek Toronto, including (but not limited to): Webpage, Newsletter, Facebook, Twitter, and Instagram
Lead the creation and publication of a multitude of content (including planned and in-the-moment) and feel comfortable taking an idea and bringing to life, while asking your team and the organization for any support that you may need to reach the goal
Develop and maintain a social media calendar that keeps a strategic line up of content flowing to engage and inspire our digital community to learn more about us our mission, our vision, and how we are actively changing our communities
Monitor and evaluate the performance and success of the Free Geek Toronto digital channels, while devising new strategies and opportunities to move the needle
Help us analyze and learn from what & how we are doing so we can grow and move forward - define and track key performance indicators and benchmarks for digital marketing success`,
          location: "Toronto",
          org_id: 8,
          status: "open",
          date: "2022-04-15 18:07:17.367+00",
          created_at: "2022-04-15 18:07:27.859961+00",
          expires_at: "2022-05-11 17:07:17.367+00",
        },
        // AA's org postings -24
        {
          title: "Telephone Reassurance Volunteer",
          description: `● Telephone clients at their home numbers or through assisted living facilities; minimum 30 minutes per week 
● Build a supportive relationship through conversation and discussion 
● Actively engage client in topics of interest including reminiscing about past experiences 
● Complete the Monthly Service Record at the end of every month and submitting it to the Volunteer Services Coordinator 
● Report issues, concerns and all incidents to the Volunteer Services Coordinator. 
● Notify the Coordinator of any intended, extended absences by the volunteer 
● Adhere to the vision, mission and guiding values of the organization and the 'Friendly Visiting' program 
● Represent Indus in a professional manner at all times 
● Adhere to the agreed upon volunteering hours 
● Assist with related tasks as assigned`,
          location: "Oakville",
          org_id: 9,
          status: "open",
          date: "2022-01-04 15:00:00.000+00",
          supervisor: "Thomas Ellis",
          created_at: "2022-01-01 18:07:27.859961+00",
          expires_at: "2022-06-11 17:07:17.367+00",
        },

        {
          title: "Friendly Visiting Volunteer",
          description: `- Visit clients in their home or assisted living facility; minimum of 1 hour weekly visit at a mutually agreed upon time (between Mon-Sun, 9am-7pm) 
- Build a supportive relationship through conversation and discussion 
- Actively participate in activities which are of interest to the client 
- Complete the Friendly Visiting Monthly Service Record 
- Report issues, concerns and all incidents to the Volunteer Services Coordinator 
- Represent Indus in a professional manner at all times 
- Adhere to the vision, mission and guiding values of the organization and the Friendly Visiting Program.`,
          location: "Oakville",
          org_id: 9,
          status: "open",
          date: "2022-02-27 08:30:00.000+00",
          supervisor: "Thomas Eddison",
          created_at: "2022-02-01 18:07:27.859961+00",
          expires_at: "2022-06-11 17:07:17.367+00",
        },
        {
          title: "Arts and Crafts Volunteer",
          description: `Volunteer to facilitate senior-friendly arts and crafts workshops 
Deliver instructions to a group of seniors virtually through zoom  
Plan arts and crafts activities for assigned weeks  
Must enjoy working with seniors Effective communication skills, with a particular skill in working with seniors 
Proficient in one or more South Asian languages such as Hindi, Punjabi or Urdu 
 
Particular flexibility is required for 2022 programming during the day 
All necessary supplies will be provided by Indus Community Services`,
          location: "Oakville",
          org_id: 9,
          status: "open",
          date: "2022-04-14 16:00:00.000+00",
          supervisor: "Meryl Streep",
          created_at: "2022-02-01 18:07:27.859961+00",
          expires_at: "2022-06-11 17:07:17.367+00",
        },
        {
          title: "Board of Director",
          description: `Commit to the vision, mission and guiding values of the organization. 
Participate in the on-going development and implementation of the organization's strategic plan. 
Attend monthly Board meetings and the Annual General Meeting. 
Serve on at least one Board Committee.
Strong networking and communication skills. 
Have previous experience leading business or social organizations, and/or serving on a Board. 
Have a strong understanding of the needs of the communities the organization serves. 
Integrity and commitment to represent the best interests of the organization. 
Adhere to the organization's governance policies, procedures & bylaws.`,
          location: "Oakville",
          org_id: 9,
          status: "open",
          date: "2022-03-25 09:00:00.000+00",
          supervisor: "Meryl Streep",
          created_at: "2022-03-01 18:07:27.859961+00",
          expires_at: "2022-06-11 17:07:17.367+00",
        },
        {
          title: "Visiting Volunteer",
          description:
            "It's easy to help a Senior remain independent and content in their own home. Make a new friend by providing your support during a weekly visit. Your time can be spent in the clients home or if you are comfortable, by taking them in your car for a drive, for a coffee, walk by the lake, shopping, a museum visit, live music or any other activity of interest. Specific languages currently needed: Hungarian / Arabic / Urdu / Hindi / Punjabi / Persian / Italian / French",
          location: "Oakville",
          org_id: 10,
          status: "open",
          date: "2022-03-01 13:00:00.000+00",
          supervisor: "Jack Daniels",
          created_at: "2022-02-01 18:07:27.859961+00",
          expires_at: "2022-06-11 17:07:17.367+00",
        },
        {
          title: "Wellness Services Volunteer",
          description: `Wellness Services offers clients in the Halton Region Community complimentary therapy focusing on bringing relaxation to help manage pain, stress and enhance well-being. Looking for Wellness Services holistic practitioner volunteers, to commit to 1 hour per week or biweekly, to provide volunteer wellness services to clients in the community in need. Must have the following criteria: Reiki Level 2 or higher 
Therapeutic Touch level 2 or higher`,
          location: "Oakville",
          org_id: 10,
          status: "open",
          date: "2022-04-20 12:00:00.000+00",
          supervisor: "Jack Daniels",
          created_at: "2022-02-01 18:07:27.859961+00",
          expires_at: "2022-06-11 17:07:17.367+00",
        },
        {
          title: "Home Support Exercise Program Volunteer",
          description: `Volunteers needed for Oakville and Burlington.  
Providing simple exercises guidance and support to frail Seniors in their homes for 12 week cycles.  
Training is provided and the program is intended to help Seniors gain strength and better balance. 
 
Support a frail older adult through a standardized exercise program designed to improve strength, balance, mobility and endurance. 
 
You’ll learn how to do the set of 10 simple exercises (toe taps, leg raises, wall push-ups) safely and how to increase the difficulty level as your client makes progress. 
 
You’ll also learn how to motivate and cheer your client on so that they get the maximum benefit out of the program. The results are fantastic – over 90% of clients see improvement! 
 
COVID-19 Precautions 
-All volunteers must attend a COVID training, sign a declaration and provide proof of vaccine.`,
          location: "Oakville",
          org_id: 10,
          status: "open",
          date: "2022-03-03 17:00:00.000+00",
          supervisor: "Tessa Williams",
          created_at: "2022-02-01 18:07:27.859961+00",
          expires_at: "2022-06-11 17:07:17.367+00",
        },
        {
          title: "Bereavement Peer Support Volunteer",
          description:
            "As a trained volunteer, you can help those with the loss of a loved one, work through their grief and find a way to move forward. Visits are taking place on the phone and in person. Wonderful training in one-on-one bereavement peer support is provided. After training, our Bereavement Counsellor will match you with a client to visit for a period of 3 to 12 months (depending on the client's needs), making all the difference in their journey through grief. Next training starts April 11, 2022",
          location: "Oakville",
          org_id: 10,
          status: "open",
          date: "2022-04-30 06:00:00.000+00",
          supervisor: "Brandy Tetris",
          created_at: "2022-01-01 18:07:27.859961+00",
          expires_at: "2022-06-11 17:07:17.367+00",
        },
        {
          title: "Compost Assistant",
          description:
            "Working with our compost program to help shovel wood chips to help our composter run smoothly. This job will be performed outside.",
          location: "Burlington",
          org_id: 11,
          status: "open",
          date: "2022-03-20 12:00:00.000+00",
          supervisor: "Mother Theresa",
          created_at: "2022-02-01 18:07:27.859961+00",
          expires_at: "2022-06-11 17:07:17.367+00",
        },
        {
          title: "Fresh Food Sorter",
          description:
            "Sorting fresh food into crates. This would include separating edible food from the inedible. Removing the packaging and stickers to then be placed in green bins or our onsite composter.",
          location: "Burlington",
          org_id: 11,
          status: "open",
          date: "2022-01-16 10:00:00.000+00",
          supervisor: "Laura Williams",
          created_at: "2022-02-01 18:07:27.859961+00",
          expires_at: "2022-06-11 17:07:17.367+00",
        },
        {
          title: "Senior Translation Volunteer",
          description: `Looking for students  
            Ability to speak English and translate and have conversations in the following languages: Russian, Arabic, Urdu, French, Mandarin, Spanish 
            Community minded individuals looking to further support those looking for food support who do not speak English 
            Giving people direction on where and how to access food 
            Most volunteer work will be done over the phone, with the possibility of in person should the current COVID environment improve`,
          location: "Burlington",
          org_id: 1,
          status: "open",
          date: "2022-01-01 19:00:00.000+00",
          supervisor: "Angelina Bradley",
          created_at: "2022-01-01 18:07:27.859961+00",
          expires_at: "2022-06-11 17:07:17.367+00",
        },
        {
          title: "Fresh Food Packer",
          description:
            "Pack and Sort fresh food into grocery bags that will be distributed to our neighbours in need.",
          location: "Burlington",
          org_id: 11,
          status: "open",
          date: "2022-04-21 08:30:00.000+00",
          supervisor: "Brandy Tetris",
          created_at: "2022-01-01 18:07:27.859961+00",
          expires_at: "2022-06-11 17:07:17.367+00",
        },
      ]);
    });
};
