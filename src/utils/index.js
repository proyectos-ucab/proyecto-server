const { errorMessages } = require("./errors");

function handlePostgresError(error) {
  if (errorMessages[error.table]) {
    const errorData = errorMessages[error.table];
    const key = error.constraint || error.code;
    return {
      message: errorData[key].showColumn
        ? errorData[key].message + error.column
        : errorData[key].message,
      status: errorData[key].status,
      detail: error.detail,
    };
  } else {
    return {
      message: "Error code: " + error.code,
      status: 500,
      detail: null,
    };
  }
}

module.exports = { handlePostgresError };
