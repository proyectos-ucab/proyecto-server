const environment = process.env.NODE_ENV || "development";

smbdConfig = require("../knexfile")[process.env.SMBD];
const config = smbdConfig[environment];
const connection = require("knex")(config);

module.exports = connection;
