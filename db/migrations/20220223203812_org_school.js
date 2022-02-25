exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("org_school");
  if (!exists) {
    return knex.schema.createTable("org_school", function (table) {
      table.increments("id").primary();

      table
        .integer("org_id")
        .unsigned()
        .references("orgs.id")
        .onDelete("CASCADE");

      table
        .integer("school_id")
        .unsigned()
        .references("schools.id")
        .onDelete("CASCADE");

      table.string("status");
    });
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("org_school");
};
