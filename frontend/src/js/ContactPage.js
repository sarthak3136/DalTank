import React, { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { Phone, AddBox, Favorite } from "@mui/icons-material";
import ContactForm from "./ContactForm";
import "./ContactForm.css";
import { Email } from "@material-ui/icons";
import Header from "./Header";
import Footer from "./Footer";

const ContactPage = () => {
  const [showModal, setShowModal] = useState(false);
  const handleEmailButtonClick = () => {
    const receiverEmail = "daltank@dal.ca";

    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${receiverEmail}`;

    window.open(gmailComposeUrl, "_blank");
  };
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item style={{ marginTop: "4rem" }}>
        <Box className="contact-page-container">
          <Typography
            variant="h4"
            className="contact-heading"
            style={{ color: "black" }}
          >
            Contact Us
          </Typography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            className="grid-container"
          >
            <Grid
              item
              xs={12}
              sm={3}
              className="grid-item"
              style={{ marginBottom: "5rem" }}
            >
              <Phone className="grid-icon" />
              <Typography variant="h6" className="grid-heading">
                By Phone
              </Typography>
              <Typography className="grid-details">
                <span style={{ fontSize: "0.7rem", color: "black" }}>
                  (Monday to Friday, 9am to 6pm AST)
                </span>
                <Typography>North America Toll-Free:</Typography>
                <Typography>+1-234-567-890</Typography>
                <Typography>International:</Typography>
                <Typography>+1-980-765-432</Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} className="grid-item">
              <AddBox className="grid-icon" />
              <Typography variant="h6" className="grid-heading">
                Start a New Case
              </Typography>
              <Typography variant="body2" className="grid-details">
                Just send us your questions or concerns by starting a new case,
                and we will give you the help you need.
              </Typography>
              <Button
                style={{ marginTop: "28px" }}
                className="modalButton"
                variant="contained"
                onClick={() => setShowModal(true)}
              >
                Form
              </Button>
              <div>
                <ContactForm
                  show={showModal}
                  onClose={() => {
                    setShowModal(false);
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={3} className="grid-item">
              <Email className="grid-icon" />

              <Typography variant="h6" className="grid-heading">
                Send an Email
              </Typography>

              <Typography variant="body2" className="grid-details">
                Send an email to connect regarding sales and marketing team.
              </Typography>

              <Button
                style={{ marginTop: "48px" }}
                className="modalButton"
                variant="contained"
                onClick={handleEmailButtonClick}
              >
                Email Us
              </Button>
            </Grid>
            <Footer />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContactPage;
