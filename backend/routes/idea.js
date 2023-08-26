const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
let app = express();
const upload = multer({ dest: "uploads/" });
router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: true }));
mongoose
  .connect("mongodb+srv://tr335214:root@cluster0.zxzknl9.mongodb.net/Web", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });
const ideaSchema = new mongoose.Schema({
  ideaName: String,
  ideaDescription: String,
  ideaTargetMarket: String,
  ideaProblemStatement: String,
  ideaRevenueSource: String,
  ideaNetRevenue: String,
  userId: String,
  userName: String,
  ideaVideoPitchUrl: String,
  ideaPdfPitchUrl: String,
  ideaProductLogoUrl: String,
});
const Idea = mongoose.model("idea", ideaSchema);

router.post("/idea-submission", async (req, res) => {
  const idea = new Idea({
    ideaName: req.body.ideaName,
    ideaDescription: req.body.ideaDescription,
    ideaProblemStatement: req.body.ideaProblemStatement,
    ideaTargetMarket: req.body.ideaTargetMarket,
    ideaRevenueSource: req.body.ideaRevenueSource,
    ideaNetRevenue: req.body.ideaNetRevenue,
    userId: req.body.userId,
    userName: req.body.userName,
    ideaVideoPitchUrl: req.body.ideaVideoPitchUrl,
    ideaPdfPitchUrl: req.body.ideaPdfPitchUrl,
    ideaProductLogoUrl: req.body.ideaProductLogoUrl,
  });

  await idea
    .save()
    .then(() => {
      console.log("Person document saved to the database");
    })
    .catch((error) => {
      console.error("Error saving person document:", error);
    });

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify("success"),
  };
  // res.setHeader("Content-Type", "application/pdf");
  res.status(200).json({ message: "success" });
});

const { ObjectId } = require("mongoose").Types; // Import ObjectId from Mongoose

router.get("/get-ideas/:_id", async (req, res) => {
  try {
    const ideaId = req.params._id;

    if (!ObjectId.isValid(ideaId)) {
      return res.status(400).json({ message: "Invalid idea ID" });
    }

    const idea = await Idea.findById(ideaId);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    res.status(200).json(idea);
  } catch (error) {
    console.error("Error fetching idea:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getIdeaByUserId/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find all documents in the collection
    const ideas = await Idea.find({ userId });

    res.status(200).json(ideas);
  } catch (error) {
    console.error("Error fetching ideas:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-ideas", async (req, res) => {
  try {
    // Find all documents in the collection
    const ideas = await Idea.find();

    res.status(200).json(ideas);
  } catch (error) {
    console.error("Error fetching ideas:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
