const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  usability: Number,

  marketPotential: Number,

  presentation: Number,

  innovation: Number,

  title: String,

  description: String,

  positiveAspects: String,

  areasOfImprovement: String,

  investorEmail: String,

  ideaId: String,
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
