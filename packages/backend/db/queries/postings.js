const knex = require("../knex");
const argon = require("argon2");

module.exports = {
  async createPosting(org_id, posting) {
    expires_at = new Date(posting.date);
    expires_at = expires_at.setDate(expires_at.getDate() + 30);
    try {
      let obj = await knex("postings")
        .returning("id")
        .insert({
          title: posting.title,
          description: posting.description,
          org_id: org_id,
          location: posting.location,
          date: posting.date,
          expires_at: new Date(expires_at),
        });

      posting.timeslots.map(async (time) => {
        let start_time =
          time.startTime.hours +
          ":" +
          time.startTime.minutes +
          " " +
          time.startTime.ampm;
        let end_time =
          time.endTime.hours +
          ":" +
          time.endTime.minutes +
          " " +
          time.endTime.ampm;
        await knex("jobs").insert({
          posting_id: obj[0],
          start_time,
          end_time,
          openings: time.openings,
          applicants: 0,
        });
      });
      return obj;
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  },
  //   GET ORG POSTINGS
  async getOrgPostings(org_id) {
    try {
      let getPostings = await knex
        .select("*")
        .from("postings")
        .where("org_id", org_id);

      let orgPostings = await Promise.all(
        getPostings.map(async (posting) => {
          let timeslots = await knex
            .select("*")
            .from("jobs")
            .where("jobs.posting_id", posting.id);

          let applicants = await Promise.all(
            timeslots.map(async (time) => {
              let students = await knex
                .select([
                  "students.id",
                  "students.first_name",
                  "students.last_name",
                  "students.email",
                  "students.school",
                ])
                .from("student_job")
                .join("students", "student_job.student_id", "=", "students.id")
                .where("student_job.job_id", time.id);
              return students;
            })
          );
          return {
            ...posting,
            applicants: applicants,
            timeslots: timeslots,
          };
        })
      );
      return orgPostings;
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  },

  async updatePosting(body) {
    let org = await knex("orgs")
      .returning([
        "name",
        "email",
        "location",
        "website",
        "location",
        "id",
        "image",
      ])
      .where({ id: body.id })
      .update({
        phone_number: body.phone_number,
        website: body.website,
        location: body.location,
        description: body.description,
      });
    return org;
  },
};
