import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { makeStyles } from "@material-ui/core/styles";
import homeimage from "../images/homeimage.jpg";
import "./Landing.css";
import Number from "./Number";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    height: "100vh",
    marginLeft: "10rem",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    objectFit: "cover",
    aspectRatio: "1/1",
    objectPosition: "center top",
  },
}));

const Explore = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const changePage = useNavigate();
  React.useEffect(() => {
    setShowImage(true);
    setShowDescription(true);
  }, []);

  const onFaq = () => {
    changePage("/faq");
  };
  const classes = useStyles();
  return (
    <Grid
      container
      style={{ height: "100%", marginLeft: "5rem", marginRight: "5rem" }}
    >
      <Grid item xs={12} sm={6}>
        <CSSTransition
          in={showDescription}
          timeout={500}
          classNames="slide-left"
          unmountOnExit
        >
          <div>
            <Typography
              variant="h3"
              component="h2"
              style={{ marginTop: "5rem", fontWeight: "600" }}
            >
              Why
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              style={{
                marginTop: "1rem",
                color: "rgba(245,201,85,255)",
                fontWeight: "600",
              }}
            >
              Dal Tank ?
            </Typography>

            <Typography
              variant="h5"
              component="p"
              style={{ marginTop: "1rem" }}
            >
              We bridge the gap between
            </Typography>
            <Typography
              variant="h5"
              component="p"
              style={{ marginTop: "1rem" }}
            >
              Dal Innovators and potential Investors
            </Typography>

            <Number />
          </div>
        </CSSTransition>
      </Grid>
      <Grid item xs={12} sm={6}>
        {/* Image */}
        <CSSTransition
          in={showImage}
          timeout={500}
          classNames="slide-right"
          unmountOnExit
        >
          <img
            className={classes.image}
            alt="Description of the image"
            src={homeimage}
          />
        </CSSTransition>
      </Grid>
    </Grid>
  );
};

export default Explore;
