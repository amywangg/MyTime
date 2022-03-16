exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("schools");
  if (!exists) {
    return knex.schema.createTable("schools", function (table) {
      table.increments("id").primary();

      table.string("email").unique();

      table.string("password");

      table.string("name");

      table.string("location");

      table.string("description", 10000);

      table.string("image");
    });
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("schools");
};
