exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("postings");
  if (!exists) {
    return knex.schema.createTable("postings", function (table) {
      table.increments("id").primary();

      table.string("title");

      table.string("description", 10000);

      table.string("location");

      table
        .integer("org_id")
        .unsigned()
        .references("orgs.id")
        .onDelete("CASCADE");

      table.string("status").notNullable().defaultTo("open");

      table.timestamp("date").notNullable();

      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

      table.timestamp("expires_at");
    });
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("postings");
};
