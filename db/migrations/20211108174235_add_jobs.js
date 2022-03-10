exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("jobs");
  if (!exists) {
    return knex.schema.createTable("jobs", function (table) {
      table.increments("id").primary();

      table
        .integer("posting_id")
        .unsigned()
        .references("postings.id")
        .onDelete("CASCADE");

      table.string("start_time");

      table.string("end_time");

      table.integer("openings");

      table.integer("applicants");

      table.string("status").notNullable().defaultTo("open");
    });
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("jobs");
};
