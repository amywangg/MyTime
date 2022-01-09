exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("orgs");
  if (!exists) {
    return knex.schema.createTable("orgs", function (table) {
      table.increments("id").primary();

      table.string("name");

      table.string("email").unique();

      table.boolean("verified").defaultTo(false);

      table.string("description");

      table.string("website");

      table.integer("phone_number");

      table.string("image");
    });
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("orgs");
};
