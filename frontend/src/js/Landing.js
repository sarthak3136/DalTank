import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  Paper,
  CardMedia,
  Card,
  makeStyles,
} from "@material-ui/core";
import "./Landing.css";
import Explore from "./Explore";
import Number from "./Number";

import Footer from "./Footer";
import Transition from "./Transition";
import Company from "./Company";
const useStyles = makeStyles((theme) => ({
  landingContainer: {
    marginTop: theme.spacing(7),

    overflowX: "hidden",
    overflowY: "hidden",
  },
  landingContainer1: {
    marginTop: theme.spacing(20),

    overflowX: "hidden",
    overflowY: "hidden",
  },
  landingContainer2: {
    marginTop: theme.spacing(10),

    overflowX: "hidden",
    overflowY: "hidden",
  },
}));
function Landing() {
  const [isTransitionVisible, setTransitionVisible] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    const handleScroll = () => {
      const transitionElement = document.getElementById("transition");

      if (transitionElement) {
        const rect = transitionElement.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;

        if (rect.top >= 0 && rect.bottom <= windowHeight) {
          setTransitionVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Grid container direction="column">
      <Grid item className={classes.landingContainer}>
        <Explore />
      </Grid>
      <Grid item className={classes.landingContainer1}>
        <div id="transition">{isTransitionVisible && <Transition />}</div>
      </Grid>

      <Grid
        item
        className={classes.landingContainer2}
        style={{ alignContent: "center" }}
      >
        <div id="transition">{isTransitionVisible && <Company />}</div>
      </Grid>
      <Grid item className={classes.landingContainer1}>
        <div id="transition">{isTransitionVisible && <Footer />}</div>
      </Grid>
    </Grid>
  );
}

export default Landing;
