import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import Header from "../Header";

function UserProfile() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
      try {
        const response = await axios.post(
          "https://group12-backend.onrender.com/profile/get",
          {
            userId: user._id,
          }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("portfolio.")) {
      const key = name.split(".")[1];
      setData((prevData) => ({
        ...prevData,
        portfolio: {
          ...prevData.portfolio,
          [key]: value,
        },
      }));
    } else if (name === "firstName" || name === "lastName") {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      convertToBase64(file).then((base64File) => {
        setData((prevData) => ({
          ...prevData,
          portfolio: {
            ...prevData.portfolio,
            uploadedFileData: base64File,
          },
        }));
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data.portfolio);
      console.log(data.result);
      await axios.put(
        "https://group12-backend.onrender.com/profile/editPortfolio",
        {
          ...data.portfolio,
        }
      );
      await axios.put("https://group12-backend.onrender.com/profile/editUser", {
        ...data.result,
      });
      const response = await axios.post(
        "https://group12-backend.onrender.com/profile/get",
        data
      );
      console.log(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  const styles = {
    container: {
      width: "80%",
      margin: "8rem auto",
      padding: "2rem",
      borderRadius: "20px",
      backgroundColor: "transparent", // Removed the background color
      boxShadow: "none", // Removed the box shadow
      fontFamily: "Arial, sans-serif",
      fontSize: "18px",
    },
    header: {
      marginBottom: "1.5rem",
      color: "#333",
      fontSize: "1.5em",
      fontWeight: "bold",
      backgroundColor: "transparent", // Added this line
      border: "none", // Added this line
    },
    card: {
      backgroundColor: "#f4f4f4",
      padding: "1rem",
      borderRadius: "15px",
      marginBottom: "2rem",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    image: {
      width: "150px",
      height: "150px",
      borderRadius: "10px",
      margin: "1rem 0",
    },
    label: {
      fontWeight: "bold",
      marginBottom: "0.5rem",
      display: "block",
      color: "#555",
    },

    input: {
      width: "100%",
      padding: "0.5rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginBottom: "1rem",
      fontSize: "1rem",
      lineHeight: "1.5",
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
      margin: "0.5rem",
    },
    fileInput: {
      margin: "1rem 0",
    },
  };

  const renderDetails = () => (
    <>
      <h2 style={styles.header}>User Details</h2>
      <div style={styles.card}>
        <p>
          <strong>First Name:</strong> {user.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      {user.role === "Investor" && (
        <>
          <h2 style={styles.header}>Investor Portfolio</h2>
          <div style={styles.card}>
            <p>
              <strong>Investment Preferences:</strong>{" "}
              {data.portfolio.investmentPreferences}
            </p>
            <p>
              <strong>Industry Expertise:</strong>{" "}
              {data.portfolio.industryExpertise}
            </p>
            <p>
              <strong>Track Record:</strong> {data.portfolio.trackRecord}
            </p>
            <img
              src={data.portfolio.uploadedFileData}
              alt="Uploaded File"
              style={styles.image}
            />
          </div>
        </>
      )}
      <button style={styles.button} onClick={() => setIsEditing(true)}>
        Edit
      </button>
    </>
  );

  const renderEditForm = () => (
    <form onSubmit={handleEditSubmit}>
      <h2 style={styles.header}>Edit User Details</h2>
      <div style={styles.card}>
        <label>First Name:</label>
        <input
          type="text"
          style={styles.input}
          name="firstName"
          value={user.firstName}
          onChange={handleInputChange}
        />
        <label>Last Name:</label>
        <input
          type="text"
          style={styles.input}
          name="lastName"
          value={user.lastName}
          onChange={handleInputChange}
        />
      </div>
      {user.role === "Investor" && (
        <>
          <h2 style={styles.header}>Edit Investor Portfolio</h2>
          <div style={styles.card}>
            <label>Investment Preferences:</label>
            <input
              type="text"
              style={styles.input}
              name="portfolio.investmentPreferences"
              value={data.portfolio.investmentPreferences}
              onChange={handleInputChange}
            />
            <label>Industry Expertise:</label>
            <input
              type="text"
              style={styles.input}
              name="portfolio.industryExpertise"
              value={data.portfolio.industryExpertise}
              onChange={handleInputChange}
            />
            <label>Track Record:</label>
            <input
              type="text"
              style={styles.input}
              name="portfolio.trackRecord"
              value={data.portfolio.trackRecord}
              onChange={handleInputChange}
            />
            <label>Upload New File:</label>
            <input
              type="file"
              id="fileUpload"
              multiple
              onChange={handleFileChange}
              style={styles.fileInput}
            />
          </div>
        </>
      )}
      <button style={styles.button} type="submit">
        Save
      </button>
      <button style={styles.button} onClick={() => setIsEditing(false)}>
        Cancel
      </button>
    </form>
  );

  if (isLoading) {
    return (
      <div style={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Header />
      </Grid>
      <div className="user-profile" style={styles.container}>
        {isEditing ? renderEditForm() : renderDetails()}
      </div>
    </Grid>
  );
}

export default UserProfile;
