import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import CountUp from "react-countup";

const Number = () => {
  return (
    <Grid container style={{ marginTop: "5rem" }}>
      <Grid id="boxes-section" container spacing={2} maxWidth="960px">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{
              backgroundColor: "rgba(57,104,174,255)",
              width: "10rem",
              height: "7rem",
              borderRadius: "2rem",
              justifyContent: "center",
            }}
          >
            <Typography
              style={{ textAlign: "center", color: "white", padding: "0.5rem" }}
              variant="h6"
            >
              Total Investment
            </Typography>
            <Typography
              variant="h6"
              style={{ color: "rgba(245,201,85,255)", textAlign: "center" }}
            >
              <CountUp
                start={0}
                end={1000000}
                duration={5}
                separator=","
                prefix="$"
                delay={0}
              />
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height={200}
            style={{
              backgroundColor: "rgba(57,104,174,255)",
              width: "10rem",
              height: "7rem",
              borderRadius: "2rem",
              justifyContent: "center",
            }}
            borderRadius={8}
          >
            <Typography
              variant="h6"
              style={{ textAlign: "center", color: "white", padding: "0.5rem" }}
            >
              Successful Start-ups
            </Typography>
            <Typography
              variant="h6"
              style={{ color: "rgba(245,201,85,255)", textAlign: "center" }}
            >
              <CountUp start={0} end={25} duration={5} delay={0} /> +
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height={200}
            style={{
              backgroundColor: "rgba(57,104,174,255)",
              width: "10rem",
              height: "7rem",
              borderRadius: "2rem",
              justifyContent: "center",
            }}
            borderRadius={8}
          >
            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                color: "white",
                padding: "0.5rem",
              }}
            >
              Angel &nbsp; Investors
            </Typography>
            <Typography
              variant="h6"
              style={{ color: "rgba(245,201,85,255)", textAlign: "center" }}
            >
              <CountUp start={0} end={50} duration={5} delay={0} /> +
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Number;
