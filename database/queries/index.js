const db = require("../connection");

const carreraQueries = require("./carrera");

async function testquery() {
  return await db.select().table("usuario");
}

module.exports = {
  testquery,
  carreraQueries,
};
