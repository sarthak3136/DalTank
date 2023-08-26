import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Header from "../Header";
import Footer from "../Footer";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import "./PitchVideoPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChatBox from "../Chats/ChatBox";

const PitchVideoPage = () => {
  const [idea, setIdea] = useState([]);
  const { _id } = useParams();
  const user = localStorage.getItem("user");
  const { email } = JSON.parse(user);
  useEffect(() => {
    console.log(_id);
    axios
      .get(`https://group12-backend.onrender.com/get-ideas/${_id}`)
      .then((res) => {
        console.log(res.data.ideaPdfPitchUrl);
        setIdea(res.data);
      });
  }, []);
  return (
    <div>
      <Container maxWidth="lg">
        <Header />

        <div className="card-slide-left">
          <h1 style={{ marginTop: "120px", textAlign: "center" }}>
            {idea.ideaName}
          </h1>
        </div>

        <img
          className="card-slide-right"
          alt=""
          style={{ width: "800px", height: "400px", marginLeft: "170px" }}
          src={idea.ideaProductLogoUrl}
        />

        <Typography
          className="card-slide-right"
          sx={{ fontWeight: "bold", marginTop: "30px", marginBottom: "20px" }}
          variant="h6"
        >
          Idea Description
        </Typography>
        <Card
          className="card-slide-right"
          elevation={3}
          style={{
            margin: "20px 0",
            padding: "20px",
            backgroundColor: "#E9F1F3",
          }}
        >
          <Typography variant="body1" paragraph>
            {idea.ideaDescription}
          </Typography>
        </Card>

        <Typography
          className="card-slide-left"
          sx={{ fontWeight: "bold", marginTop: "30px", marginBottom: "20px" }}
          variant="h6"
        >
          Idea Problem Statement
        </Typography>
        <Card
          className="card-slide-left"
          elevation={3}
          style={{
            margin: "20px 0",
            padding: "20px",
            backgroundColor: "#E9F1F3",
          }}
        >
          <Typography variant="body1" paragraph>
            {idea.ideaProblemStatement}
          </Typography>
        </Card>

        <Typography
          className="card-slide-right"
          sx={{ fontWeight: "bold", marginTop: "30px", marginBottom: "20px" }}
          variant="h6"
        >
          Target Market
        </Typography>
        <Card
          className="card-slide-right"
          elevation={3}
          style={{
            margin: "20px 0",
            padding: "20px",
            backgroundColor: "#E9F1F3",
          }}
        >
          <Typography variant="body1" paragraph>
            {idea.ideaTargetMarket}
          </Typography>
        </Card>

        <Typography
          className="card-slide-left"
          sx={{ fontWeight: "bold", marginTop: "30px", marginBottom: "20px" }}
          variant="h6"
        >
          Revenue Source
        </Typography>
        <Card
          className="card-slide-left"
          elevation={3}
          style={{
            margin: "20px 0",
            padding: "20px",
            backgroundColor: "#E9F1F3",
          }}
        >
          <Typography variant="body1" paragraph>
            {idea.ideaRevenueSource}
          </Typography>
        </Card>

        <Typography
          className="card-slide-right"
          sx={{ fontWeight: "bold", marginTop: "30px", marginBottom: "20px" }}
          variant="h6"
        >
          Projected Revenue
        </Typography>
        <Card
          className="card-slide-right"
          elevation={3}
          style={{
            margin: "20px 0",
            padding: "20px",
            backgroundColor: "#E9F1F3",
          }}
        >
          <Typography variant="body1" paragraph>
            {idea.ideaNetRevenue}
          </Typography>
        </Card>

        <Typography
          className="card-slide-left"
          sx={{ fontWeight: "bold", marginTop: "30px", marginBottom: "20px" }}
          variant="h6"
        >
          Pitch Video
        </Typography>
        <Card className="card-slide-left" elevation={3}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <ReactPlayer
                url={idea.ideaVideoPitchUrl}
                controls
                width="180%"
                height="auto"
                style={{
                  marginLeft: "-225px",
                  width: "180%",
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
              />
            </Grid>
          </Grid>
        </Card>

        <Typography
          className="card-slide-right"
          sx={{ fontWeight: "bold", marginTop: "30px", marginBottom: "20px" }}
          variant="h6"
        >
          Pitch Document
        </Typography>
        <Card className="card-slide-right" elevation={3}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <div
                style={{
                  marginBottom: "20px",
                  marginTop: "20px",
                  flexGrow: 1,
                  width: "180%",
                  marginLeft: "-260px",
                  overflow: "auto",
                }}
              >
                <iframe
                  src={idea.ideaPdfPitchUrl}
                  title="Embedded Website"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  style={{ height: "600px", width: "180%" }}
                ></iframe>
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  href={idea.ideaPdfPitchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "180%",
                    marginLeft: "-260px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  Download PDF
                </Button>
              </div>
            </Grid>
          </Grid>
        </Card>
      </Container>
      <div style={{ marginTop: "50px" }}>
        <Footer />
      </div>
      <ChatBox _id={_id} email={email} />
    </div>
  );
};

export default PitchVideoPage;
