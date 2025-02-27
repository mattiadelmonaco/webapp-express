const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/movies_cover",
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const validationId = require("../middlewares/validationId");

const movieController = require("../controllers/movieController");

// Validation ID
router.use("/:id", validationId);

// Index
router.get("/", movieController.index);

// Show
router.get("/:id", movieController.show);

// Create Review
router.post("/:id/reviews", movieController.createReview);

// Create Movie
router.post("/", upload.single("image"), movieController.createMovie);

module.exports = router;
