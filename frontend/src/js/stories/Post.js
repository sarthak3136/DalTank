import React, { useState } from "react";
import BackupIcon from "@mui/icons-material/Backup";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import Header from "../Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Post = () => {
  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [story, setStory] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState();

  // State variables for showing success and error snackbars
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  // State variable to track loading status during form submission
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const changePage = useNavigate();

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingSubmit(true);

    const userId = "12345";

    const storyData = {
      firstName,
      lastName,
      companyName,
      companyEmail,
      story,
      images,
      description,
      userId,
    };
    console.log(storyData);
    try {
      const response = await axios.post(
        "https://group12-backend.onrender.com/stories/user",
        storyData
      );
      console.log(response);
      setShowSuccessSnackbar(true);
      setTimeout(() => {
        setShowSuccessSnackbar(false);
        setIsLoadingSubmit(false);
        changePage("/storyAdmin");
      }, 3000);
    } catch (error) {
      setShowErrorSnackbar(true);
      setIsLoadingSubmit(false);
    }
  };

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleCompanyNameChange = (e) => setCompanyName(e.target.value);
  const handleCompanyEmailChange = (e) => setCompanyEmail(e.target.value);
  const handleStoryChange = (e) => setStory(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleFileChange = (e) => {
    const files = e.target.files;

    const encodeImageToBase64 = (imageFile) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const encodeImagesToBase64 = async (imageFiles) => {
      try {
        const encodedImages = await Promise.all(
          imageFiles.map((imageFile) => encodeImageToBase64(imageFile))
        );
        console.log(encodedImages);
        setImages(encodedImages);
      } catch (error) {
        console.error("Error encoding images:", error);
      }
    };

    const filesArray = Array.from(files);
    encodeImagesToBase64(filesArray);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Grid container direction="column" style={{ marginTop: "5.5rem" }}>
        <Grid item>
          <Header />
        </Grid>
        {isLoadingSubmit ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Typography variant="h5">Redirecting to story page...</Typography>
          </div>
        ) : (
          <Grid item container>
            <Card
              style={{
                maxWidth: 500,
                margin: "0 auto",
                padding: "1rem",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" style={{ color: "blue" }}>
                  Post the Success Story!
                </Typography>
                <form>
                  <Grid container spacing={1}>
                    <Grid item>
                      <TextField
                        label="First Name"
                        placeholder="Enter your first name!"
                        variant="outlined"
                        onChange={handleFirstNameChange}
                        value={firstName}
                        fullWidth
                        required
                      ></TextField>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        label="Last Name"
                        placeholder="Enter your Last name!"
                        variant="outlined"
                        fullWidth
                        onChange={handleLastNameChange}
                        value={lastName}
                        required
                      ></TextField>
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        label="Company Name"
                        placeholder="Enter your Company name!"
                        variant="outlined"
                        fullWidth
                        onChange={handleCompanyNameChange}
                        value={companyName}
                        required
                      ></TextField>
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        label="Company Email"
                        placeholder="Enter your Email!"
                        variant="outlined"
                        value={companyEmail}
                        fullWidth
                        onChange={handleCompanyEmailChange}
                        required
                      ></TextField>
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        label="Description"
                        placeholder="Enter your company description..."
                        variant="outlined"
                        value={description}
                        fullWidth
                        onChange={handleDescription}
                        required
                      ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Success Story"
                        placeholder="Write your story here..."
                        variant="outlined"
                        value={story}
                        fullWidth
                        onChange={handleStoryChange}
                        required
                        multiline
                        rows={6}
                      ></TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <label
                        htmlFor="files"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <BackupIcon />
                        <span style={{ marginLeft: "1rem" }}>
                          Click here to upload images!
                        </span>
                      </label>
                      <input
                        type="file"
                        id="files"
                        multiple
                        onChange={handleFileChange}
                        style={{
                          display: "none",
                          backgroundColor: "blue",
                        }}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={onSubmit}
                      >
                        Post
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        )}

        <Snackbar
          open={showSuccessSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSuccessSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <SnackbarContent
            sx={{ background: "green", color: "#fff", zIndex: 9999 }}
            message="Story Submitted successfully!"
          />
        </Snackbar>

        <Snackbar
          open={showErrorSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowErrorSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <SnackbarContent
            sx={{ background: "red", color: "#fff", zIndex: 9999 }}
            message="Failed to submit the story. Maybe missing some field"
          />
        </Snackbar>
      </Grid>
    </div>
  );
};

export default Post;
