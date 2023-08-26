const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");

// GET /stories - Get all stories
router.get("/", storyController.getAllStories);

// GET /stories/:id - Get a specific story by ID
router.get("/:id", storyController.getStoryById);

// POST /stories - Create a new story
router.post("/user/", storyController.createStory);

// PUT /stories/:id - Update a story by ID
router.put("/user/:id", storyController.updateStory);

// DELETE /stories/:id - Delete a story by ID
router.delete("/user/:id", storyController.deleteStory);

router.get("/user/:userId", storyController.getStoriesByUserId);

module.exports = router;
