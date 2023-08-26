import React, { useState } from "react";
import {
  TextField,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Facebook, GitHub, Google } from "@mui/icons-material";
import Header from "../Header";
import axios from "axios";
import { backendUrl } from "../config/constants";
import { auth, provider } from "./Firebase";

const FormContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(15),
  padding: "20px",
  maxWidth: "400px",
  margin: "0 auto",
  [theme.breakpoints.up("sm")]: {
    padding: "100px",
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const SocialButtonContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
}));

const ForgotPasswordButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  textTransform: "none",
}));

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission here
      console.log("Form data:", formData);
      axios
        .post(`${backendUrl}/users/login`, {
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          // TODO: Redirect to homepage.
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("isAdmin", res.data.isAdmin);
          navigate("/", { state: { user: res.data.user._id } });
          window.alert("Login Successful!");
        })
        .catch((err) => {
          console.error(err);
          // window.alert(err.response.data.error);
        });
    }
  };

  /*const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFacebookLogin = () => {
        // Handle Facebook Login here
        console.log("Facebook Login");
    };

    const handleGitHubLogin = () => {
        // Handle GitHub Login here
        console.log("GitHub Login");
    };*/

  const handleForgotPassword = () => {
    navigate("/forgot-password");
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
              Login
            </h1>
          </center>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              type="password"
              fullWidth
              required
              margin="normal"
            />
            <ForgotPasswordButton
              onClick={handleForgotPassword}
              color="primary"
            >
              Forgot Password?
            </ForgotPasswordButton>
            <LoginButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </LoginButton>
            {/*<SocialButtonContainer>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<Google/>}
                                style={{color: "white", backgroundColor: "#db1414"}}
                                onClick={handleGoogleLogin}
                            >
                                Login with Google
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<Facebook/>}
                                style={{color: "white", backgroundColor: "#3266a8"}}
                                onClick={handleFacebookLogin}
                            >
                                Login with Facebook
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<GitHub/>}
                                style={{color: "white", backgroundColor: "black"}}
                                onClick={handleGitHubLogin}
                            >
                                Login with GitHub
                            </Button>
                        </SocialButtonContainer>*/}
          </form>
        </FormContainer>
      </Grid>
    </Grid>
  );
};

export default Login;
