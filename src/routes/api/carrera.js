const express = require("express");
const db = require("../../database/connection");

const router = express.Router();

const tableName = require("../../database/tables").carrera;

// GET
router.get("/:id", async (req, res) => {});

// GET ALL
router.get("/", async (req, res) => {});

// POST

// PUT

// DELETE

module.exports = router;
