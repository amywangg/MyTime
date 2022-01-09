exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("student_job");
  if (!exists) {
    return knex.schema.createTable("student_job", function (table) {
      table.increments("id").primary();

      table
        .integer("posting_id")
        .unsigned()
        .references("postings.id")
        .unique()
        .onDelete("CASCADE");

      table
        .integer("student_id")
        .unsigned()
        .references("students.id")
        .unique()
        .onDelete("CASCADE");

      table.string("status");
    });
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("student_job");
};
