const express = require("express");
const router = express.Router();

const validationId = require("../middlewares/validationId");

const movieController = require("../controllers/movieController");

// Validation ID
router.use("/:id", validationId);

// Index
router.get("/", movieController.index);

// Show
router.get("/:id", movieController.show);

module.exports = router;
