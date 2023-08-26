const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companyName: { type: String, required: true },
  companyEmail: { type: String, required: true },
  story: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String },
  userId: { type: String, required: true },
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
