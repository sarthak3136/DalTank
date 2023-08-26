import React, { useState } from "react";

import { Button, Modal, TextField, Box, Divider } from "@mui/material";

import { styled } from "@mui/material/styles";

import Ratings from "./Ratings";

import axios from "axios";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  "& .modal-content": {
    backgroundColor: "#fff",

    outline: "none",

    width: 800,

    borderRadius: 8,

    boxShadow: theme.shadows[5],

    display: "flex",
  },

  backgroundColor: "rgba(0, 0, 0, 0.5)",
}));

const Feedback = ({ ideaId }) => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",

    description: "",

    positiveAspects: "",

    areasOfImprovement: "",
  });

  const [ratingsData, setRatingsData] = useState({
    ratingUsability: 0,

    ratingMarket: 0,

    ratingPresentation: 0,

    ratingInnovation: 0,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,

      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submittedData = {
      title: formData.title || null,

      description: formData.description || null,

      positiveAspects: formData.positiveAspects || null,

      areasOfImprovement: formData.areasOfImprovement || null,

      ratingUsability: ratingsData.ratingUsability || null,

      ratingMarket: ratingsData.ratingMarket || null,

      ratingPresentation: ratingsData.ratingPresentation || null,

      ratingInnovation: ratingsData.ratingInnovation || null,
    };

    console.log(submittedData);

    var title = formData.title;

    var description = formData.description;

    var positiveAspects = formData.areasOfImprovement;

    var areasOfImprovement = formData.areasOfImprovement;

    var usability = ratingsData.ratingUsability;

    var marketPotential = ratingsData.ratingMarket;

    var presentation = ratingsData.ratingPresentation;

    var innovation = ratingsData.ratingInnovation;

    const user = JSON.parse(localStorage.getItem("user"));
    const investorEmail = user.email;

    axios

      .post("https://group12-backend.onrender.com/api/ratings", {
        title,
        description,
        positiveAspects,
        areasOfImprovement,
        usability,
        marketPotential,
        presentation,
        innovation,
        investorEmail,
        ideaId,
      })

      .then((response) => {
        title = "";
        description = "";
        positiveAspects = "";
        areasOfImprovement = "";
        usability = "";
        marketPotential = "";

        presentation = "";

        innovation = "";

        console.log(response);
      })

      .catch((error) => {
        console.log(error);
      });

    setFormData({
      title: "",

      description: "",

      positiveAspects: "",

      areasOfImprovement: "",
    });

    setRatingsData({
      ratingUsability: 0,

      ratingMarket: 0,

      ratingPresentation: 0,

      ratingInnovation: 0,
    });

    handleClose();
  };

  // Function to handle data from Ratings component

  const handleDataFromRatings = (
    ratingUsability,

    ratingMarket,

    ratingPresentation,

    ratingInnovation
  ) => {
    setRatingsData({
      ratingUsability,

      ratingMarket,

      ratingPresentation,

      ratingInnovation,
    });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{
          widht: "140px",

          marginLeft: "10px",

          height: "40px",

          fontSize: "12px",
        }}
        onClick={handleOpen}
      >
        Rating & Feedback
      </Button>

      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-content">
          {/* Left Section: Ratings */}

          <Box width="50%" p={4} borderRight="1px solid #ccc">
            <Ratings dataFromRatings={handleDataFromRatings} />
          </Box>

          {/* Right Section: Feedback Form */}

          <Box width="50%" p={4}>
            <h2>Submit Feedback</h2>

            <form onSubmit={handleSubmit}>
              {/* Your form fields go here */}

              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />

              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={4}
                margin="normal"
              />

              <TextField
                label="Positive Aspects"
                name="positiveAspects"
                value={formData.positiveAspects}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={4}
                margin="normal"
              />

              <TextField
                label="Areas of Improvement"
                name="areasOfImprovement"
                value={formData.areasOfImprovement}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={4}
                margin="normal"
              />

              <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </div>
      </StyledModal>
    </div>
  );
};

export default Feedback;
