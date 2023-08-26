import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Grid,
  Container,
  CircularProgress,
  ThemeProvider,
  createTheme,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Header from "../Header";

const theme = createTheme({
  typography: {
    fontFamily: "'Arial', sans-serif",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h4: {
          fontSize: "2rem",
          marginBottom: "1rem",
        },
        body1: {
          fontSize: "1.2rem",
          marginBottom: "1rem",
        },
        body2: {
          fontSize: "1.1rem",
          lineHeight: "1.6",
        },
      },
    },
  },
});

/**
 * Component for displaying the details of a single story/blog post.
 *
 * @param {string} firstName - First name of the author.
 * @param {string} lastName - Last name of the author.
 * @param {string} companyName - Name of the company.
 * @param {string} companyEmail - Email of the company.
 * @param {string} description - Short description of the story.
 * @param {string} story - The main content of the story.
 * @param {string[]} images - An array of images related to the story.
 */
const ClickStory = ({
  firstName,
  lastName,
  companyName,
  companyEmail,
  description,
  story,
  images,
}) => {
  const blogContainerStyle = {
    padding: "2rem",
    margin: "2rem",
    marginTop: "5rem",
    textAlign: "left",
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
    border: "2px solid blue",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    marginBottom: "1rem",
  };

  const companyNameStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  };

  const descriptionStyle = {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  };

  const storyStyle = {
    fontSize: "1.2rem",
    lineHeight: "1.6",
  };

  return (
    <Card sx={blogContainerStyle}>
      <CardMedia
        component="img"
        image={images[0]}
        style={imageStyle}
        alt="Company"
      />
      <CardContent>
        <Typography variant="h4" component="h2" sx={companyNameStyle}>
          {companyName}
        </Typography>
        <Typography variant="body1" paragraph sx={descriptionStyle}>
          {description}
        </Typography>
        <Typography variant="body2" paragraph sx={storyStyle}>
          {story}
        </Typography>
      </CardContent>
    </Card>
  );
};

/**
 * Component for displaying the details of a specific story.
 * It fetches the story data from the server using the given `id`.
 */
const StoryDetails = () => {
  const { id } = useParams();

  const [storyData, setStoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://group12-backend.onrender.com/stories/${id}`)
      .then((response) => {
        setStoryData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching story:", error);
        setError("Error fetching story. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 64px)",
    fontSize: "1.2rem",
  };

  const errorStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 64px)",
    fontSize: "1.5rem",
    color: "red",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem",
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={containerStyle}>
        <Header />

        {loading && (
          <div style={loadingStyle}>
            <CircularProgress size={60} />
          </div>
        )}

        {error && <div style={errorStyle}>{error}</div>}

        {storyData ? <ClickStory {...storyData} /> : <div>Story not found</div>}
      </div>
    </ThemeProvider>
  );
};

export default StoryDetails;
