import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Visibility, Delete, Edit } from "@mui/icons-material";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewStory = () => {
  //useState for storing stories details
  const [stories, setStories] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletingStoryId, setDeletingStoryId] = useState(null);

  const changePage = useNavigate();
  const userId = "12345";

  //Load website with all story details
  useEffect(() => {
    axios
      .get(`https://group12-backend.onrender.com/stories/user/${userId}`)
      .then((res) => {
        console.log(res.data);
        setStories(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(err);
      });
  }, []);

  const handleView = (id) => {
    changePage("/viewStory/" + id);
  };

  const handleEdit = (id) => {
    changePage("/editstory/" + id);
  };

  //handle delete of the particular story
  const handleDelete = (id) => {
    axios
      .delete(`https://group12-backend.onrender.com/stories/user/${id}`)
      .then(() => {
        setStories((prevStories) =>
          prevStories.filter((story) => story._id !== id)
        );
        setShowDeleteConfirmation(false);
      })
      .catch((err) => {
        console.log(err);
        setStories((prevStories) => [...prevStories]);
        setShowDeleteConfirmation(false);
      });
  };

  //cancellation of delete handle
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  //confirmation of delete handle
  const handleDeleteConfirmation = (id) => {
    setShowDeleteConfirmation(true);
    setDeletingStoryId(id);
  };

  return (
    <div
      style={{
        marginTop: "5.5rem",
        background: "#f5f5f5",
        color: "#333",
        minHeight: "100vh",
      }}
    >
      <Header />
      <div style={{ textAlign: "center", padding: "1rem 0" }}>
        <Typography variant="h4" style={{ color: "#3498db" }}>
          Stories Posted!
        </Typography>
      </div>
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress style={{ color: "#3498db" }} />
        </div>
      ) : error ? (
        <Card style={{ maxWidth: 400, margin: "0 auto" }}>
          <CardContent>
            <Typography variant="h6" style={{ color: "#c0392b" }}>
              Error loading data.
            </Typography>
            <Typography variant="body2">Please try again later.</Typography>
          </CardContent>
        </Card>
      ) : (
        <div style={{ maxWidth: "1425px", margin: "0 auto" }}>
          <List>
            {stories.map((story, index) => (
              <ListItem
                key={story._id}
                style={{
                  background: "#fff",
                  border: "2px solid #3498db",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px",
                }}
              >
                <ListItemText
                  primary={
                    <>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "25px",
                          color: "#3498db",
                        }}
                      >
                        {index + 1}.{" "}
                      </span>
                      <span style={{ fontSize: "2rem" }}>
                        {" "}
                        {story.companyName}
                      </span>

                      <span style={{ color: "#000" }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;{" - Uploaded By: "}
                      </span>

                      <span style={{ color: "#000", fontStyle: "italic" }}>
                        {story.firstName} {story.lastName}
                      </span>
                    </>
                  }
                  style={{
                    color: "#f1c40f",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                />
                <div style={{ marginLeft: "auto" }}>
                  <IconButton
                    onClick={() => handleView(story._id)}
                    style={{
                      color: "#fff",
                      marginRight: "8px",
                      background: "#2980b9",
                      borderRadius: "50%",
                      padding: "8px",
                    }}
                  >
                    <Visibility fontSize="large" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleEdit(story._id)}
                    style={{
                      color: "#fff",
                      marginRight: "8px",
                      background: "#27ae60",
                      borderRadius: "50%",
                      padding: "8px",
                    }}
                  >
                    <Edit fontSize="large" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteConfirmation(story._id)}
                    style={{
                      color: "#fff",
                      background: "#c0392b",
                      borderRadius: "50%",
                      padding: "8px",
                    }}
                  >
                    <Delete fontSize="large" />
                  </IconButton>
                </div>
              </ListItem>
            ))}
          </List>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirmation} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this story?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(deletingStoryId)}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewStory;
