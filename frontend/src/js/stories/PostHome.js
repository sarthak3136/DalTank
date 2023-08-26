import React from "react";
import {
  Card,
  CardContent,
  Button,
  CardActions,
  Typography,
  CardMedia,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const Post = () => {
  const chanePage = useNavigate();
  const handlePost = () => {
    chanePage("/postStory");
  };
  const handleView = () => {
    chanePage("/viewStory");
  };

  return (
    <div>
      <Card
        sx={{
          maxWidht: 300,
          marginTop: "2rem",
          marginLeft: "2rem",
          "&:hover": {
            boxShadow: 20,
            color: "blue",
            border: "2px solid",
          },
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0SBM3gNVB9EXg668kk4IHCipKp5bLvSbh-w&usqp=CAU"
          alt="test image"
        />
        <CardContent>
          <Typography gutterBottom varient="h5" component="div"></Typography>
          <Typography varient="body2">
            See your stories, Edit and Delete.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            style={{
              color: "blue",
              backgroundColor: "yellow",
              fontWeight: "solid",
              cursor: "pointer",
            }}
            className="my-button"
            onClick={handleView}
          >
            View
          </Button>
        </CardActions>
      </Card>
      <Card
        sx={{
          maxWidht: 300,
          marginTop: "2rem",
          marginLeft: "2rem",
          "&:hover": {
            boxShadow: 20,
            color: "blue",
            border: "2px solid",
          },
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0SBM3gNVB9EXg668kk4IHCipKp5bLvSbh-w&usqp=CAU"
          alt="test image"
        />
        <CardContent>
          <Typography gutterBottom varient="h5" component="div"></Typography>
          <Typography varient="body2">
            Submit your success story and help others!
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            style={{
              color: "blue",
              backgroundColor: "yellow",
              fontWeight: "solid",
              cursor: "pointer",
            }}
            className="my-button"
            onClick={handlePost}
          >
            Post
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
