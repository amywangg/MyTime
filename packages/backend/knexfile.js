const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

let connection =
  process.env.NODE_ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
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
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      tableName: "knex_migrations",
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
};
