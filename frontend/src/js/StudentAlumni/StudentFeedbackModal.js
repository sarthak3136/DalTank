import React, { useEffect, useState } from "react";
import { Button, Modal, Box, Typography, Paper, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ContentWrapper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  width: 800,
  borderRadius: 8,
  boxShadow: theme.shadows[5],
  display: "flex",
}));

const FeedbackDetails = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "70%",
  borderRight: "1px solid #ccc",
  overflow: "auto",
}));

const StudentFeedbackModal = (props) => {
  const [open, setOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState({});
  const { ideaId } = props;
  const [studentIdeas, setStudentIdeas] = useState([]);

  console.log(ideaId);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // rating and feedback of the idea
    axios
      .get(`https://group12-backend.onrender.com/api/ratings/${ideaId}`)
      .then((res) => {
        console.log(res.data);
        setFeedbackData(res.data[0]); // Assuming the response data is directly the feedback details
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ideaId]);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{
          width: "140px",
          marginLeft: "10px",
          height: "40px",
          fontSize: "12px",
        }}
        onClick={handleOpen}
      >
        View Feedback
      </Button>
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ContentWrapper>
          <FeedbackDetails>
            <Typography variant="h6" gutterBottom>
              <b>Feedback Details</b>
            </Typography>
            <Divider />
            <Typography variant="body1" gutterBottom>
              <b>Title:</b> {feedbackData.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Description:</b> {feedbackData.description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Usability:</b> {feedbackData.usability}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Market Potential:</b> {feedbackData.marketPotential}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Presentation:</b> {feedbackData.presentation}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Innovation:</b> {feedbackData.innovation}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Positive Aspects:</b> {feedbackData.positiveAspects}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Areas of Improvement:</b> {feedbackData.areasOfImprovement}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Investor Email:</b> {feedbackData.investorEmail}
            </Typography>
          </FeedbackDetails>
        </ContentWrapper>
      </StyledModal>
    </div>
  );
};

export default StudentFeedbackModal;
