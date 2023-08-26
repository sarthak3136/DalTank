const express = require("express");
const router = express.Router();
const ratingsController = require("../controllers/ratingsController");

router.post("/ratings", ratingsController.createRating);
router.get("/ratings/:ideaId", ratingsController.getRatingsByIdeaId);

module.exports = router;
