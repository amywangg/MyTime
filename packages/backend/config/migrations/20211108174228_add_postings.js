exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("postings");
  if (!exists) {
    return knex.schema.createTable("postings", function (table) {
      table.increments("id").primary();

      table.string("title");

      table.string("description");

      table
        .integer("org_id")
        .unsigned()
        .references("orgs.id")
        .unique()
        .onDelete("CASCADE");

      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

      table.timestamp("expires_at").notNullable();

      table.string("posting_type");
    });
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("postings");
};
