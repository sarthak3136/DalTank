import React, { useState } from "react";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

import Feedback from "./Feedback";
import { useNavigate } from "react-router-dom";

const IdeasCard = (props) => {
  const { _id, productName, image, description } = props;

  console.log(_id);
  const [showModal, setShowModal] = useState(false);
  const changePage = useNavigate();
  const styles = {
    card: {
      width: "310px", // Adjust the width of the card as needed

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
  const handleMore = () => {
    changePage(`/pitch/${_id}`);
  };
  const words = description.split(" ");

  const truncatedWords = words.slice(0, 10);

  const truncatedDescription = truncatedWords.join(" ");

  const ellipsis = words.length > 10 ? "..." : "";

  return (
    <Card style={styles.card}>
      <CardMedia component="img" src={image} style={styles.image} />

      <CardContent>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          {productName}
        </Typography>

        <Typography variant="body1" style={{ fontSize: "15px" }}>
          {truncatedDescription}
          {ellipsis}
        </Typography>

        <Box style={styles.buttonsContainer}>
          <Button
            variant="contained"
            color="primary"
            style={styles.moreButton}
            onClick={handleMore}
          >
            More
          </Button>

          <Feedback
            ideaId={_id}
            show={showModal}
            onClose={() => setShowModal(false)}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default IdeasCard;
