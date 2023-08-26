import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Landing from "./Landing";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  landingContainer: {
    marginTop: theme.spacing(10),
    overflowX: "hidden",
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item className={classes.landingContainer}>
        <Landing />
      </Grid>
    </Grid>
  );
}

export default Home;
