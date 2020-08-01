const tables = require("../../database/tables");

const usuarioErrors = require("./usuario");

const errorMessages = {
  [tables.usuario]: usuarioErrors,
};

module.exports = { errorMessages };
