exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("schools");
  if (!exists) {
    return knex.schema.createTable("schools", function (table) {
      table.increments("schoolId").primary();

      table.string("email");

      table.string("password");

      table.string("name");

      table.string("location");

      table.string("description");

      table.string("image");
    });
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("schools");
};
