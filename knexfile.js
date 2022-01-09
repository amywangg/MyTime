const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: 5432,
    },
    migrations: {
      directory: "./migrations",
    },
  },
  staging: {
    client: "postgresql",
    connection: {
      host: "127.0.0.1",
      user: "[db_username]",
      password: "[db_password]",
      database: "[db_name]",
      charset: "utf8",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
