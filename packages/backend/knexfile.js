const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

let connection =
  env === "production"
    ? process.env.DATABASE_URL
    : {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: 5432,
      };

module.exports = {
  development: {
    client: "postgresql",
    connection,
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
