const tables = require("../database/tables");

const errorMessages = {
  [tables.usuario]: {
    ER_DUP_ENTRY: {
      msg: "Un usuario ya se encuentra registrado con este correo o la cedula.",
      status: 400,
    },
    UNKNOWN_CODE_PLEASE_REPORT: {
      msg: "Correo inválido debe finalizar en @ucab.edu.ve",
      status: 400,
    },
  },
};

module.exports = { errorMessages };
