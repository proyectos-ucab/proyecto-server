const router = require("express").Router();

const { createJWT, createHash, verifyHash } = require("./utils");

const db = require("../database/connection");
const { handlePostgresError } = require("../utils");
const tables = require("../database/tables");

router.post("/login", async (req, res) => {
  const { correo, password } = req.body.payload;

  try {
    let usuario = await db.select().from(tables.usuario).where({ correo });

    if (!usuario[0]) {
      return res.status(404).json({
        ok: false,
        error: "Contraseña o Correo Ucab inválido.",
      });
    }

    const match = await verifyHash(password, usuario[0].password);
    if (!match) {
      res
        .status(400)
        .json({ ok: false, error: "Contraseña o Correo Ucab inválido." });
    } else {
      const token = await createJWT({ cedula: usuario[0].cedula });
      return res
        .status(200)
        .json({ ok:true, token, correo: usuario[0].correo, nombre: usuario[0].nombre });
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
    console.log(error);

    // Catcheando errores
    // Si hay un error de base de datos o duplicacion en los datos
    if (error.code) {
      const pgError = handlePostgresError(error);

      return res.status(pgError.status).json({
        ok: false,
        data: null,
        error: { message: pgError.message, detail: pgError.detail },
      });
    }

    // Errror del servidor
    return res.status(500).json({ ok: false, data: error.sqlMessage });
  }
});

module.exports = router;
