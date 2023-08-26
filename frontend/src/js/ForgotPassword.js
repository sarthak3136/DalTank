import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Header from "./Header";
import axios from "axios";

const FormContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(15),
  padding: "20px",
  maxWidth: "400px",
  margin: "0 auto",
  [theme.breakpoints.up("sm")]: {
    padding: "100px",
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        window.alert("Password reset email sent!");
        navigate("/login"); // Redirect to homepage or login page
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        setError(errorMessage);
      });
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <FormContainer>
          <center>
            <h1
              style={{
                backgroundImage: "linear-gradient(45deg, #2196F3, #E91E63)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Forgot Password
            </h1>
          </center>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={email}
              onChange={handleInputChange}
              error={!!error}
              helperText={error}
              fullWidth
              required
              margin="normal"
            />
            <SubmitButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </SubmitButton>
          </form>
        </FormContainer>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
