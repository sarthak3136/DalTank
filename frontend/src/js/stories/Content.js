import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const changePage = useNavigate();
  const [successStories, setSuccessStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://group12-backend.onrender.com/stories")
      .then((response) => {
        setSuccessStories(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const handleCard = (id) => {
    changePage(`/story/${id}`);
  };

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <CircularProgress style={{ color: "primary" }} />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">Error loading data.</Typography>
          <Typography variant="body2">Please try again later.</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={4}>
      {successStories.map((story) => (
        <Grid item xs={12} md={6} key={story._id}>
          <Card
            onClick={() => handleCard(story._id)}
            style={{
              marginTop: "2rem",
              transition: "box-shadow 0.3s ease-in-out",
            }}
            sx={{
              ":hover": {
                boxShadow: 20,
                color: "blue",
                border: "2px solid",
              },
            }}
          >
            <CardMedia
              component="img"
              height="300"
              src={story.images[0]}
              alt={story.companyName}
            />
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                {story.companyName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {story.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Content;
