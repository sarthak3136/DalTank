import React, { useState, useEffect } from "react";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

import StudentFeedbackModal from "./StudentFeedbackModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentIdeasCard = (props) => {
  const { productName, image, description, ideaId } = props;
  console.log(ideaId);

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const styles = {
    card: {
      width: "310px",

      margin: "10px",
    },

    image: {
      height: "200px",
    },

    buttonsContainer: {
      display: "flex",

      justifyContent: "space-between",

      marginTop: "10px",
    },

    moreButton: {
      width: "140px",
    },

    modalButton: {
      width: "140px",
    },
  };

  const navigateToPitchPage = () => {
    navigate("/pitch/" + ideaId);
  };

  return (
    <Card style={styles.card}>
      <CardMedia component="img" src={image} style={styles.image} />

      <CardContent>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          {productName}
        </Typography>

        <Typography variant="body1" style={{ fontSize: "15px" }}>
          {description}
        </Typography>

        <Box style={styles.buttonsContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={navigateToPitchPage}
            style={styles.moreButton}
          >
            Your Idea
          </Button>

          <StudentFeedbackModal
            ideaId={ideaId}
            show={showModal}
            onClose={() => setShowModal(false)}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudentIdeasCard;
