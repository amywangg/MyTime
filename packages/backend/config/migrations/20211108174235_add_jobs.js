exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("jobs");
  if (!exists) {
    return knex.schema.createTable("jobs", function (table) {
      table.increments("id").primary();

      table
        .integer("posting_id")
        .unsigned()
        .references("postings.id")
        .unique()
        .onDelete("CASCADE");

      table.timestamp("start_time");

      table.timestamp("end_time");

      table.integer("number_of_applicants");
    });
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("jobs");
};
