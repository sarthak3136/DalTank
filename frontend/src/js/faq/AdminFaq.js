import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Container, MenuItem } from "@mui/material";
import axios from "axios";
import App from "../Header";

const AnswerQuestion = () => {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [manualTopic, setManualTopic] = useState("");

  const handleAnswerChange = (index, value) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = value;
      return newAnswers;
    });
  };

  useEffect(() => {
    axios
      .get("https://group12-backend.onrender.com/questionpendingapprovals")
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
      });

    axios.get("https://group12-backend.onrender.com/topics").then((res) => {
      console.log(res.data);
      setTopics(res.data.topics);
    });

    // Initialize the answers state with the same length as questions and default values
    setAnswers(
      Array.from({ length: questions.length }, () => ({
        topic: "",
        answer: "",
      }))
    );
  }, [questions.length]);

  const handleManualTopicChange = (event) => {
    setManualTopic(event.target.value);
  };

  const handleSubmit = (index) => {
    const answerData = {
      topic: answers[index].topic,
      question: questions[index].question,
      answer: answers[index].answer,
    };

    axios
      .post(
        "https://group12-backend.onrender.com/approvedQuestions",
        answerData
      )
      .then((res) => {
        console.log("Answer submitted:", res.data);
      })
      .catch((error) => {
        console.error("Error submitting answer:", error);
      });
  };

  return (
    <>
      <App />
      <Container maxWidth="md" sx={{ mt: 2 }} style={{ marginTop: "10rem" }}>
        {questions.map((question, index) => (
          <Grid
            key={question._id}
            container
            spacing={2}
            style={{ marginBottom: "1rem" }}
          >
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Question"
                value={question.question}
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                select
                label="Topic"
                variant="outlined"
                value={answers[index]?.topic || ""}
                onChange={(e) =>
                  handleAnswerChange(index, {
                    ...answers[index],
                    topic: e.target.value,
                  })
                }
              >
                <MenuItem value="">Select a Topic</MenuItem>
                {topics.map((topic) => (
                  <MenuItem key={topic} value={topic}>
                    {topic}
                  </MenuItem>
                ))}
                <MenuItem value="manual">Enter Topic Manually</MenuItem>
              </TextField>
            </Grid>
            {answers[index]?.topic === "manual" && (
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Manual Topic Entry"
                  variant="outlined"
                  value={manualTopic}
                  onChange={handleManualTopicChange}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Answer"
                multiline
                rows={4}
                variant="outlined"
                value={answers[index]?.answer || ""}
                onChange={(e) =>
                  handleAnswerChange(index, {
                    ...answers[index],
                    answer: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit(index)}
              >
                Submit Answer
              </Button>
            </Grid>
          </Grid>
        ))}
      </Container>
    </>
  );
};

export default AnswerQuestion;
