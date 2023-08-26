import React, { useEffect, useState } from "react";
import FAQItem from "./FAQItem";
import Header from "../Header";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Modal,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../Footer";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  landingContainer: {
    marginTop: theme.spacing(10),
    overflowX: "hidden",
    overflowY: "hidden",
  },
  askButton: {
    marginTop: theme.spacing(2),
    backgroundColor: "#1DA1F2",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#0D91E5",
    },
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  topicCard: {
    marginBottom: theme.spacing(4),
    marginLeft: "auto",
    marginRight: "auto",
    cursor: "pointer",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    width: "50%",
    minWidth: 400,
    maxHeight: "80vh",
    overflowY: "auto",
    backdropFilter: "blur(10px)",
    textAlign: "center",
  },
}));

const Faq = () => {
  const classes = useStyles();

  const [question, setQuestion] = useState("");
  const [faqData, setFaqData] = useState([]);

  const fetchFaqData = async () => {
    try {
      const response = await fetch("https://group12-backend.onrender.com/faq");
      if (response.ok) {
        const data = await response.json();
        setFaqData(data);
      } else {
        console.error("Error fetching FAQ data");
      }
    } catch (error) {
      console.error("Error fetching FAQ data:", error);
    }
  };

  useEffect(() => {
    fetchFaqData();
  }, []);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(-1);
  const [selectedQuestionTopicIndex, setSelectedQuestionTopicIndex] =
    useState(-1);

  const handleAskQuestion = async () => {
    if (question) {
      try {
        const response = await axios.post(
          "https://group12-backend.onrender.com/faq/questions",
          { question }
        );
        if (response.status === 200) {
          alert("Question has been submitted!");
          setQuestion("");
        } else {
          alert("Failed to submit the question.");
        }
      } catch (error) {
        console.error("Error submitting the question:", error);
        alert("Failed to submit the question.");
      }
    }
  };

  const handleAnswerChange = (topicIndex, questionIndex, answer) => {
    const updatedFaqData = [...faqData];
    updatedFaqData[topicIndex].questions[questionIndex].answer = answer;
    setFaqData(updatedFaqData);
  };

  const handleQuestionClick = (topicIndex, questionIndex) => {
    setSelectedQuestionIndex(questionIndex);
    setSelectedQuestionTopicIndex(topicIndex);
  };

  const handleCloseModal = () => {
    setSelectedQuestionIndex(-1);
  };

  const renderModal = () => {
    if (selectedQuestionIndex === -1) {
      return null;
    }

    const selectedQuestion =
      faqData[selectedQuestionTopicIndex].questions[selectedQuestionIndex]
        .question;
    const selectedQuestionAnswer =
      faqData[selectedQuestionTopicIndex].questions[selectedQuestionIndex]
        .answer;
    return (
      <Modal
        open={selectedQuestionIndex !== -1}
        onClose={handleCloseModal}
        className={classes.modal}
      >
        <div className={classes.modalContent}>
          <Typography variant="h6" style={{ color: "#1DA1F2" }}>
            {selectedQuestion}
          </Typography>
          <Typography variant="body1">{selectedQuestionAnswer}</Typography>
        </div>

        {/* <div className={classes.modalContent}>
          <Typography variant="h6">{selectedQuestion.question}</Typography>
          <Typography variant="body1">{selectedQuestion.answer}</Typography>

        </div> */}
      </Modal>
    );
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid
        item
        className={classes.landingContainer}
        style={{ marginTop: "6rem" }}
      >
        <div>
          <h1 className="faq-heading" style={{ textAlign: "center" }}>
            Frequently Asked Questions
          </h1>
          <Grid container spacing={4} style={{ marginBottom: "7rem" }}>
            <Grid item xs={12} sm={10}>
              <Grid container spacing={4}>
                {faqData.map((topic, topicIndex) => (
                  <Grid item xs={12} sm={6} key={topicIndex}>
                    <Card className={classes.topicCard}>
                      <CardContent style={{ justifyContent: "left" }}>
                        <h2 style={{ textAlign: "center" }}>{topic.topic}</h2>
                        {topic.questions.map((faq, questionIndex) => (
                          <FAQItem
                            onClick={() =>
                              handleQuestionClick(topicIndex, questionIndex)
                            }
                            key={questionIndex}
                            question={faq.question}
                          />
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    {" "}
                    Can not find your Question! Ask Us
                  </Typography>
                  <TextField
                    style={{ marginTop: "10px" }}
                    label="Ask a question"
                    variant="outlined"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    className={classes.askButton}
                    onClick={handleAskQuestion}
                  >
                    Ask a Question
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {renderModal()}
          <Footer />
        </div>
      </Grid>
    </Grid>
  );
};

export default Faq;
