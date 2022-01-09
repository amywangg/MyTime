exports.up = async function (knex) {
  const exists = await knex.schema.hasTable("admins");
  if (!exists) {
    return knex.schema.createTable("admins", function (table) {
      table.increments("adminId").primary();

      table.string("password");

      table.string("school");
    });
  }
};

exports.down = function (knex) {
  return knex.schema.dropTable("admins");
};
