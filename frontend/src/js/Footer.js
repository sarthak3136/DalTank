import { Grid, Typography } from "@material-ui/core";
import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";

const Footer = () => {
  return (
    <Grid
      container
      spacing={2}
      style={{
        backgroundColor: "rgba(212, 227, 232, 0.5)",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="h6" style={{ color: "#333" }}>
          Contact Us
        </Typography>
        <Typography style={{ color: "#555" }}>
          Phone: +1234567890
          <br />
          Email: daltank@dal.ca
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="h6" style={{ color: "#333" }}>
          Site Map
        </Typography>
        <Typography style={{ color: "#555" }}>
          <a href="/" style={{ color: "#555" }}>
            Home
          </a>
          <br />
          <a href="/" style={{ color: "#555" }}>
            Student/Alumni
          </a>
          <br />
          <a href="/" style={{ color: "#555" }}>
            Investor
          </a>
          <br />
          <a href="/" style={{ color: "#555" }}>
            About Us
          </a>
          <br />
          <a href="/faq" style={{ color: "#555" }}>
            FAQ's
          </a>
          <br />
          <a href="/contact-us" style={{ color: "#555" }}>
            Contact
          </a>
          <br />
          <a href="/" style={{ color: "#555" }}>
            Success Stories
          </a>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="h6" style={{ color: "#333" }}>
          Address
        </Typography>
        <Typography style={{ color: "#555" }}>
          6056 University Ave,
          <br />
          Halifax, NS
          <br />
          B3H 1W5
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3} style={{}}>
        <Typography variant="body2" align="center" style={{ color: "#777" }}>
          &copy; 2023 DalTank.inc All rights reserved.
          <br />
          <div style={{ marginTop: "1rem" }}>
            <TwitterIcon
              style={{ color: "#555", fontSize: "1.5rem", marginRight: "1rem" }}
            />
            <InstagramIcon
              style={{ color: "#555", fontSize: "1.5rem", marginRight: "1rem" }}
            />
            <FacebookIcon
              style={{ color: "#555", fontSize: "1.5rem", marginRight: "1rem" }}
            />
            <LinkedInIcon
              style={{ color: "#555", fontSize: "1.5rem", marginRight: "1rem" }}
            />
            <YouTubeIcon
              style={{ color: "#555", fontSize: "1.7rem", marginRight: "1rem" }}
            />
          </div>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
