exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("students");
  if (!exists) {
    return knex.schema.createTable("students", function (table) {
      table.increments("id").primary();

      table.string("first_name");

      table.string("middle_name");

      table.string("last_name");

      table.string("email").unique();

      table.string("password");

      table.integer("school_id");

      table.string("school");

      table.integer("student_id");

      table.string("description", 10000);

      table.date("date_of_birth");

      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

      table.float("hours_completed", 2).defaultTo(0).notNullable();

      table.float("hours_approved", 2).defaultTo(0).notNullable();

      table.float("goal_completion", 2).defaultTo(0).notNullable();

      table.string("skills");
    });
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("students");
};
