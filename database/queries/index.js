const db = require("../connection");

async function testquery() {
  return await db.select().table("usuario");
}

module.exports = {
  testquery,
};
