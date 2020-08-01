const express = require("express");
const router = express.Router();

const db = require("../../database/connection");

// GET
router.get("/", async (req, res) => {
  const { tableName, key, value, cols } = req.query;

  try {
    if (!tableName) {
      return res.status(400).json({
        ok: false,
        data: "Error: no se especificó el nombre de una tabla",
      });
    }

    if (key && value) {
      const keys = key.split(",");
      const values = value.split(",");

      if (keys.length !== values.length) {
        return res.status(400).json({
          ok: false,
          data: "Error: la cantidad de  claves y  valores no son iguales",
        });
      }

      const result = await db
        .select(cols ? cols.split(",") : "*")
        .from(tableName)
        .where(keys.reduce((obj, k, i) => ({ ...obj, [k]: values[i] }), {}));
      if (result[0]) {
        return res.json({ ok: true, data: result[0] });
      } else {
        return res.json({ ok: false, data: null });
      }
    } else {
      const result = await db
        .select(cols ? cols.split(",") : "*")
        .from(tableName);
      return res.json({ ok: true, data: result });
    }
  } catch (error) {
    console.log(error);

    if (error.code) {
      return res.status(500).json({ ok: false, data: error.sqlMessage });
    }
    return res.status(500).json({ ok: false, data: null });
  }
});

// POST
router.post("/", async (req, res) => {
  const { tableName } = req.query;

  try {
    if (!tableName) {
      return res.status(400).json({
        ok: false,
        data: "Error: no se especificó el nombre de una tabla",
      });
    }

    const result = await db(tableName).insert(req.body.payload);
    return res.json({
      ok: true,
      data: !result[0] ? `Nuevo registro en la tabla ${tableName}` : null,
    });
  } catch (error) {
    console.log(error);

    if (error.code) {
      return res.status(500).json({ ok: false, data: error.sqlMessage });
    }
    return res.status(500).json({ ok: false, data: null });
  }
});

// PUT
router.put("/", async (req, res) => {
  const { tableName, key, value } = req.query;

  try {
    if (!tableName || !key || !value) {
      return res.status(400).json({
        ok: false,
        data: "Error: no se especificó una tabla o la combinacion llave valor",
      });
    }

    const keys = key.split(",");
    const values = value.split(",");

    if (keys.length !== values.length) {
      return res.status(400).json({
        ok: false,
        data: "Error: la cantidad de  claves y  valores no son iguales",
      });
    }

    const result = await db(tableName)
      .where(keys.reduce((obj, k, i) => ({ ...obj, [k]: values[i] }), {}))
      .update(req.body.payload);
    return res.json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);

    if (error.code) {
      return res.status(500).json({ ok: false, data: error.sqlMessage });
    }
    return res.status(500).json({ ok: false, data: null });
  }
});

// DELETE
router.delete("/", async (req, res) => {
  const { tableName, key, value } = req.query;

  try {
    if (!tableName || !key || !value) {
      return res.status(400).json({
        ok: false,
        data: "Error: no se especificó una tabla o la combinacion llave valor",
      });
    }

    const keys = key.split(",");
    const values = value.split(",");

    if (keys.length !== values.length) {
      return res.status(400).json({
        ok: false,
        data: "Error: la cantidad de  claves y  valores no son iguales",
      });
    }

    const result = await db(tableName)
      .where(keys.reduce((obj, k, i) => ({ ...obj, [k]: values[i] }), {}))
      .del();
    return res.json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);

    if (error.code) {
      return res.status(500).json({ ok: false, data: error.sqlMessage });
    }
    return res.status(500).json({ ok: false, data: null });
  }
});

module.exports = router;
