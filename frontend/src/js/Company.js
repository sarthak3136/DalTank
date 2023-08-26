import React from "react";
import { Grid } from "@material-ui/core";
import logo1 from "../images/Screenshot 2023-06-20 144945.jpg";
import logo2 from "../images/Screenshot 2023-06-20 145258.jpg";
import logo3 from "../images/Screenshot 2023-06-20 145449.jpg";
import logo4 from "../images/Screenshot 2023-06-20 145608.jpg";
import logo5 from "../images/Screenshot 2023-06-20 145659.jpg";
import logo6 from "../images/Screenshot 2023-06-20 145817.jpg";
import logo7 from "../images/Screenshot 2023-06-20 145951.jpg";
import logo8 from "../images/Screenshot 2023-06-20 150053.jpg";
import logo9 from "../images/Screenshot 2023-06-20 150215.jpg";
import logo10 from "../images/Screenshot 2023-06-20 150251.jpg";
import logo11 from "../images/Screenshot 2023-06-20 150512.jpg";
import logo12 from "../images/Screenshot 2023-06-20 150708.jpg";
import logo13 from "../images/Screenshot 2023-06-20 150801.jpg";
import logo14 from "../images/Screenshot 2023-06-20 150910.jpg";
import logo15 from "../images/Screenshot 2023-06-20 155314.jpg";
import logo16 from "../images/Screenshot 2023-06-20 155500.jpg";
import logo17 from "../images/Screenshot 2023-06-20 155608.jpg";
import logo18 from "../images/Screenshot 2023-06-20 155727.jpg";
import logo19 from "../images/Screenshot 2023-06-20 155928.jpg";
import logo20 from "../images/Screenshot 2023-06-20 160158.jpg";
import logo21 from "../images/Screenshot 2023-06-20 200205.jpg";
import logo22 from "../images/Screenshot 2023-06-20 200406.jpg";
import logo23 from "../images/Screenshot 2023-06-20 200534.jpg";
import logo24 from "../images/Screenshot 2023-06-20 200845.jpg";
const Company = () => {
  // Array of company logo image URLs
  const companyLogos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
    logo8,
    logo9,
    logo10,
    logo11,
    logo12,
    logo13,
    logo14,
    logo15,
    logo16,
    logo17,
    logo18,
    logo19,
    logo20,
    logo21,
    logo22,
    logo23,
    logo24,
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
          fontWeight: "500",
          fontFamily: "avenir",
        }}
      >
        <h1>Top Dal Tank's Innovators</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={2} xs={6}>
          {companyLogos.map((logo, index) => (
            <Grid item xs={2} key={index}>
              <img
                src={logo}
                alt={`Company Logo ${index + 1}`}
                style={{ width: "100%", borderRadius: "1rem" }}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Company;
