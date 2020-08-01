const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

async function createHash(value) {
  if (value) {
    const salt = bcryptjs.genSaltSync(10); // una encriptacion salada ;D
    return bcryptjs.hashSync(value, salt);
  } else return null;
}

async function verifyHash(x1, x2) {
  return bcryptjs.compareSync(x1, x2);
}

function createJWT(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
      if (error) return reject(error);
      resolve(token);
    });
  });
}

function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
      if (error) return reject(error);
      resolve(payload);
    });
  });
}

async function auth(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).send("Acceso denegado");
  }
  try {
    const verified = await verifyJWT(token);
    req.id = verified.id;
    next();
  } catch (error) {
    res.status(400).send("Token no es valido");
  }
}

module.exports = {
  createJWT,
  verifyJWT,
  createHash,
  verifyHash,
  auth,
};
