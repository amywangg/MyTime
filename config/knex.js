const environment = process.env.ENVIRONMENT || "dev";
const config = require("../knexfile.js")[environment];
module.exports = require("knex")(config);
