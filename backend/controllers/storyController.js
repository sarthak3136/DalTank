const Story = require("../models/Story");

// GET /stories - Get all stories
exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /stories/:id - Get a specific story by ID
exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (story) {
      res.json(story);
    } else {
      res.status(404).json({ message: "Story not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /stories - Create a new story
exports.createStory = async (req, res) => {
  try {
    const newStory = await Story.create(req.body);
    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /stories/:id - Update a story by ID
exports.updateStory = async (req, res) => {
  try {
    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedStory) {
      res.json(updatedStory);
    } else {
      res.status(404).json({ message: "Story not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /stories/:id - Delete a story by ID
exports.deleteStory = async (req, res) => {
  try {
    const deletedStory = await Story.findByIdAndRemove(req.params.id);
    if (deletedStory) {
      res.json(deletedStory);
    } else {
      res.status(404).json({ message: "Story not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /stories/user/:userId - Get all stories for a particular userId
exports.getStoriesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const stories = await Story.find({ userId });

    if (stories.length > 0) {
      res.json(stories);
    } else {
      res
        .status(404)
        .json({ message: "No stories found for the specified userId" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
