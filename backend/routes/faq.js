// const express = require("express");
// const router = express.Router();

// const mongoose = require("mongoose");
// // Change this to your desired port number

// const faqSchema = new mongoose.Schema({
//   // Define the schema for the 'faq' collection
//   // Customize this schema according to your data structure
//   topic: String,
//   question: String,
//   answer: String,
// });

// const questionPendingApprovalSchema = new mongoose.Schema({
//   // Define the schema for the 'questionsPendingApproval' collection
//   // Customize this schema according to your data structure
//   question: String,
// });

// const FaqModel = mongoose.model("faq", faqSchema);
// const QuestionPendingApprovalModel = mongoose.model(
//   "QuestionPendingApproval",
//   questionPendingApprovalSchema
// );

// // app.use(cors());
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));

// // Middleware
// // Get all FAQ data (topics, questions, and answers)
// router.get("/faq", async (req, res) => {
//   try {
//     const faqData = await FaqModel.find({});
//     res.set({
//       "Access-Control-Allow-Headers": "Content-Type",
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
//     });
//     res.json(faqData);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching FAQ data" });
//   }
// });

// // Add a new question and answer to a specific topic
// // Add a new question to the "questionsPendingApproval" collection
// router.post("/faq/questions", async (req, res) => {
//   const { question } = req.body;

//   try {
//     // Store the new question in the "questionsPendingApproval" collection for approval
//     await QuestionPendingApprovalModel.create({ question });
//     res.set({
//       "Access-Control-Allow-Headers": "Content-Type",
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
//     });
//     res.json({ message: "Question submitted for approval" });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding question" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
// Change this to your desired port number

const faqSchema = new mongoose.Schema({
  // Define the schema for the 'faq' collection
  // Customize this schema according to your data structure
  topic: String,
  questions: [
    {
      question: String,
      answer: String,
    },
  ],
});

const questionPendingApprovalSchema = new mongoose.Schema({
  // Define the schema for the 'questionsPendingApproval' collection
  // Customize this schema according to your data structure
  question: String,
});

const FaqModel = mongoose.model("faq", faqSchema);
const QuestionPendingApprovalModel = mongoose.model(
  "QuestionPendingApproval",
  questionPendingApprovalSchema
);

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
// Get all FAQ data (topics, questions, and answers)
router.get("/faq", async (req, res) => {
  try {
    const faqData = await FaqModel.find({});
    res.set({
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    });
    res.json(faqData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQ data" });
  }
});

// Add a new question and answer to a specific topic
// Add a new question to the "questionsPendingApproval" collection
router.post("/faq/questions", async (req, res) => {
  const { question } = req.body;

  try {
    // Store the new question in the "questionsPendingApproval" collection for approval
    await QuestionPendingApprovalModel.create({ question });
    res.set({
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    });
    res.json({ message: "Question submitted for approval" });
  } catch (error) {
    res.status(500).json({ message: "Error adding question" });
  }
});

router.get("/questionpendingapprovals", async (req, res) => {
  try {
    const faqPendingData = await QuestionPendingApprovalModel.find({});
    res.set({
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    });
    res.json(faqPendingData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQ Admin Pending data" });
  }
});
router.get("/topics", async (req, res) => {
  try {
    const topics = await FaqModel.find().distinct("topic");
    res.json({ topics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching topics" });
  }
});
router.post("/approvedQuestions", async (req, res) => {
  const { topic, question, answer } = req.body;

  try {
    // Find if the topic exists in the main collection
    const existingTopic = await FaqModel.findOne({ topic });

    if (existingTopic) {
      // If the topic exists, push the new question and answer to the existing topic's array
      existingTopic._doc.questions.push({ question, answer });
      await existingTopic.save();

      // Delete the submitted question from the questionPendingApproval collection
      await QuestionPendingApprovalModel.findOneAndDelete({ question });
    } else {
      // If the topic doesn't exist, create a new document with the provided topic and question-answer pair
      await FaqModel.create({
        topic,
        questions: [{ question: question, answer: answer }],
      });

      // Delete the submitted question from the questionPendingApproval collection
      await QuestionPendingApprovalModel.findOneAndDelete({ question });
    }

    res.set({
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    });
    res.json({ message: "Question and answer stored successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error storing question and answer" });
  }
});

module.exports = router;
