import { Card, CardMedia, Grid, Paper } from "@material-ui/core";
import React from "react";
import Carousel from "react-material-ui-carousel";

const Carosel = () => {
  return (
    <Grid item xs={12} style={{ height: "70%", marginTop: "10rem" }}>
      <Carousel
        animation="slide"
        navButtonsProps={{
          style: {
            backgroundColor: "#57a0d3",
          },
        }}
        navButtonsWrapperProps={{
          style: {
            top: "calc(50% - 24px)",
          },
        }}
        autoplay
        interval={2500}
      >
        {/* Slides */}
        <Paper
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            style={{
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              alt="Image 1"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Card>
        </Paper>
        <Paper
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card style={{ position: "relative" }}>
            <CardMedia
              component="img"
              src="https://media.istockphoto.com/id/1208535618/vector/business-teamwork-success-concept-vector-flat-people-illustration-male-and-female-sitting.jpg?s=612x612&w=0&k=20&c=8LCHpoqhYd4dnJRCfbl7AkJ9AQqZi5-bX71O9ezaHbE="
              alt="Image 2"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Card>
        </Paper>
        <Paper
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card style={{ position: "relative" }}>
            <CardMedia
              component="img"
              src="https://media.istockphoto.com/id/1208535618/vector/business-teamwork-success-concept-vector-flat-people-illustration-male-and-female-sitting.jpg?s=612x612&w=0&k=20&c=8LCHpoqhYd4dnJRCfbl7AkJ9AQqZi5-bX71O9ezaHbE="
              alt="Image 3"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Card>
        </Paper>
        {/* Add more images here */}
      </Carousel>
    </Grid>
  );
};

export default Carosel;
