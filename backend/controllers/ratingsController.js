const Rating = require("../models/Rating");

exports.createRating = async (req, res) => {
  try {
    const {
      usability,
      marketPotential,
      presentation,
      innovation,
      title,
      description,
      positiveAspects,
      areasOfImprovement,
      investorEmail,
      ideaId,
    } = req.body;

    const rating = await Rating.create({
      usability,

      marketPotential,

      presentation,

      innovation,

      title,

      description,

      positiveAspects,

      areasOfImprovement,

      investorEmail,

      ideaId,
    });

    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ error: "Internal Server e=Error" });
  }
};
exports.getRatingsByIdeaId = async (req, res) => {
  try {
    const ideaId = req.params.ideaId;

    const ratings = await Rating.find({ ideaId });

    if (!ratings || ratings.length === 0) {
      return res
        .status(404)
        .json({ error: "No ratings found for the given ideaId" });
    }

    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
