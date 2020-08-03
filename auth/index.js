const router = require("express").Router();

const { createJWT, createHash, verifyHash } = require("./utils");

const db = require("../database/connection");
const errorMessages = require("../utils/errorMessages");
const tables = require("../database/tables");

router.post("/login", async (req, res) => {
  const { correo, password } = req.body.payload;

  try {
    let usuario = await db
      .select("password")
      .from(tables.usuario)
      .where({ correo });

    if (!usuario[0]) {
      return res.status(404).json({
        ok: false,
        data: "Ningun usuario encontrado con esas credenciales",
      });
    }

    const match = await verifyHash(password, usuario[0].password);
    if (!match) {
      res
        .status(400)
        .json({ ok: false, data: "Contraseña o cedula no es correcta" });
    } else {
      const token = await createJWT({ cedula: usuario[0].cedula });
      return res.status(200).json({ token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, data: null });
  }
});

router.post("/signup", async (req, res) => {
  // Extrayendo los datos del payload
  const { cedula, nombre, correo, password } = req.body.payload;

  // Creando el objeto nuevo usuariop
  const nuevoUsuario = {
    cedula,
    nombre,
    correo,
    password: await createHash(password),
  };

  try {
    // Guardando en base de datos
    await db(tables.usuario).insert(nuevoUsuario);
    // Si todo sale bien retorno ok = true
    return res.json({ ok: true, data: { cedula, nombre, correo } });
  } catch (error) {
    // Catcheando errores
    // Si hay un error de base de datos o duplicacion en los datos
    if (error.code && errorMessages[error.code]) {
      return res.status(errorMessages[error.code].status).json({
        ok: false,
        data: errorMessages[error.code].msg,
        sqlMessage: error.sqlMessage,
      });
    }

    // Errror del servidor
    return res.status(500).json({ ok: false, data: null });
  }
});

module.exports = router;