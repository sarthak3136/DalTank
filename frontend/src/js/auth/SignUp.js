import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { Facebook, GitHub, Google } from "@mui/icons-material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./Firebase";
import Header from "../Header";
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

const SignUpButton = styled(Button)(({ theme }) => ({
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

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const navigate = useNavigate();
  const theme = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    };

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (
      formData.role === "Student" &&
      !formData.email.endsWith("@dal.ca")
    ) {
      newErrors.email = "Invalid email domain for Student role";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      // You can perform further actions such as making an API call to register the user
      axios
        .post("https://group12-backend.onrender.com/users/signup", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        })
        .then((res) => {
          window.alert("Signup Successful!");
          console.log(res.data);
          navigate("/login");
        })
        .catch((err) => {
          console.error(err);
          window.alert(err.response.data.error);
        });
    }
  };

  const handleLogo = () => {
    navigate("/");
  };

  // Handle Google Sign Up here
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFacebookSignUp = () => {
    // Handle Facebook Sign Up here
    console.log("Facebook Sign Up");
  };

  const handleGitHubSignUp = () => {
    // Handle GitHub Sign Up here
    console.log("GitHub Sign Up");
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
              Signup
            </h1>
          </center>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              fullWidth
              required
              margin="normal"
            />
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
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              type="password"
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                error={!!errors.role}
              >
                <MenuItem value="">Select role</MenuItem>
                <MenuItem value="Investor">Investor</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
              </Select>
            </FormControl>
            <SignUpButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign Up
            </SignUpButton>
            {/* Social Sign Up Buttons */}
            <SocialButtonContainer>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Google />}
                style={{ color: "white", backgroundColor: "#db1414" }}
                onClick={handleGoogleSignUp}
              >
                Sign Up with Google
              </Button>
              {/* <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<Facebook/>}
                                style={{color: "white", backgroundColor: "#3266a8"}}
                                onClick={handleFacebookSignUp}
                            >
                                Sign Up with Facebook
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<GitHub/>}
                                style={{color: "white", backgroundColor: "black"}}
                                onClick={handleGitHubSignUp}
                            >
                                Sign Up with GitHub
                            </Button> */}
            </SocialButtonContainer>
          </form>
        </FormContainer>
      </Grid>
    </Grid>
  );
};

export default SignUp;
