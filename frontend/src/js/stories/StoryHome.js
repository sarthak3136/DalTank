import React from "react";
import { Grid } from "@mui/material";
import Content from "./Content";
import Header from "../Header";
import Post from "./PostHome";

const StoryHome = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container style={{ marginTop: "5rem" }}>
        <Grid item xs={0} sm={1} />
        <Grid item xs={8} sm={10}>
          <Content />
        </Grid>

        <Grid item xs={0} sm={1} />
      </Grid>
    </Grid>
  );
};

export default StoryHome;
