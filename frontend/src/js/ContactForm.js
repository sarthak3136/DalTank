import React from "react";

import { TextField, FormControl, Button, Typography } from "@mui/material";

import "./ContactForm.css";

import CloseIcon from "@mui/icons-material/Close";

const ContactForm = (props) => {
  const { show, onClose } = props;

  if (!show) {
    return null;
  }

  return (
    <div
      className="modalWrapper"
      style={{
        zIndex: "6",
        marginTop: "4rem",

        overflowY: "hidden",
      }}
    >
      <div className="row">
        <div className="modal">
          <button
            className="btnClose"
            onClick={onClose}
            style={{ marginTop: "3rem" }}
          >
            <CloseIcon />
          </button>

          <form autoComplete="off" className="form">
            <h2>Your Query</h2>

            <div className="form-group">
              <Typography style={{ textAlign: "left" }}>Full Name</Typography>

              <TextField
                label="Name"
                required
                variant="outlined"
                color="secondary"
                type="text"
                sx={{ mb: 3 }}
                fullWidth
              />
            </div>

            <div className="form-group">
              <Typography style={{ textAlign: "left" }}>Email</Typography>

              <TextField
                label="Email"
                required
                variant="outlined"
                color="secondary"
                type="email"
                sx={{ mb: 3 }}
                fullWidth
              />
            </div>

            <div className="form-group">
              <Typography style={{ textAlign: "left" }}>Subject</Typography>

              <TextField
                label="Subject"
                required
                variant="outlined"
                color="secondary"
                type="text"
                sx={{ mb: 3 }}
                fullWidth
              />
            </div>

            <div className="form-group">
              <Typography style={{ textAlign: "left" }}>Description</Typography>

              <TextField
                label="Description"
                required
                variant="outlined"
                color="secondary"
                type="text"
                fullWidth
                sx={{ mb: 3 }}
                maxRows={2}
                minRows={2}
                multiline
              />
            </div>

            <Button variant="outlined" className="submit-btn" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
