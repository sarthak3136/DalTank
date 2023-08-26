import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Header from "../Header";
import axios from "axios";

const InvestorProfile = () => {
  const user = localStorage.getItem("user");
  const { _id } = JSON.parse(user);

  const [profile, setProfile] = useState({
    userId: _id,
    investmentPreferences: "",
    industryExpertise: "",
    trackRecord: "",
    uploadedFile: "",
  });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      convertToBase64(file).then((base64File) => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          uploadedFile: base64File,
        }));
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Profile submitted:", profile);

    console.log(profile);
    await axios.post(
      "https://group12-backend.onrender.com/portfolio/add",
      profile
    );
    window.alert("successfull submission! ");
  };

  const styles = {
    container: {
      width: "70%",
      margin: "10rem auto",
      padding: "1rem",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      borderRadius: "15px",
      backgroundColor: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    inputGroup: {
      marginBottom: "1rem",
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontSize: "1.2em",
      fontWeight: "bold",
      color: "#333",
    },
    textarea: {
      width: "100%",
      padding: "0.5rem",
      minHeight: "150px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      resize: "none",
    },
    button: {
      padding: "0.5rem 1rem",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      borderRadius: "5px",
      fontSize: "1.1em",
    },
    fileInput: {
      margin: "1rem 0",
    },
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Header />
      </Grid>

      <div style={styles.container}>
        <h2 style={{ textAlign: "center", color: "#333", fontWeight: "bold" }}>
          Create Your Investor Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="investmentPreferences" style={styles.label}>
              Investment Preferences
            </label>
            <textarea
              id="investmentPreferences"
              name="investmentPreferences"
              value={profile.investmentPreferences}
              onChange={handleInputChange}
              required
              style={styles.textarea}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="industryExpertise" style={styles.label}>
              Industry Expertise
            </label>
            <textarea
              id="industryExpertise"
              name="industryExpertise"
              value={profile.industryExpertise}
              onChange={handleInputChange}
              required
              style={styles.textarea}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="trackRecord" style={styles.label}>
              Track Record
            </label>
            <textarea
              id="trackRecord"
              name="trackRecord"
              value={profile.trackRecord}
              onChange={handleInputChange}
              required
              style={styles.textarea}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="fileUpload" style={styles.label}>
              Upload Files
            </label>
            <input
              type="file"
              id="fileUpload"
              multiple
              onChange={handleFileChange}
              style={styles.fileInput}
            />
          </div>
          <button type="submit" style={styles.button}>
            Submit Profile
          </button>
        </form>
      </div>
    </Grid>
  );
};

export default InvestorProfile;
