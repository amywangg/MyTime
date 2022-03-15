exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("student_job");
  if (!exists) {
    return knex.schema.createTable("student_job", function (table) {
      table.increments("id").primary();

      table
        .integer("job_id")
        .unsigned()
        .references("jobs.id")
        .onDelete("CASCADE");

      table
        .integer("student_id")
        .unsigned()
        .references("students.id")
        .onDelete("CASCADE");

      table.string("status");

      table.string("saved").defaultTo(false);
    });
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("student_job");
};
