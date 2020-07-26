const express = require("express");
const router = express.Router();

const { testquery } = require("../../database/queries");

router.get("/", async (req, res) => {
  try {
    res.json({ ok: true, data: await testquery() });
  } catch (error) {
    res.status(500).json({ ok: false, data: error });
  }
});

module.exports = router;
