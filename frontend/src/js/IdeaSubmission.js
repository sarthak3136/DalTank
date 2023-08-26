import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Footer from "./Footer";
import { saveAs } from "file-saver";
import { TextField, Button, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SendIcon from "@mui/icons-material/Send";
import "./IdeaSubmission.css";
import { backendUrl } from "./config/constants";
import { storage } from "./firebase1";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import { makeStyles } from "@mui/styles";
import { Image } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  formGroup: {
    marginBottom: "3rem",
  },
  fileContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fileLabel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  fileButton: {
    flex: "0 0 15rem",
  },
}));
const IdeaSubmission = () => {
  const classes = useStyles();
  const [step, setStep] = useState("one");
  const [businessDesc, setBusinessDesc] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [revenueSource, setRevenueSource] = useState("");
  const [netRevenue, setNetRevenue] = useState("");
  const changePage = useNavigate();
  const [uploadProgressVideo, setUploadProgressVideo] = useState(0);
  const [uploadProgressPresentation, setUploadProgressPresentation] =
    useState(0);
  const [ideaVideoPitchUrl, setIdeaVideoPitchUrl] = useState("");
  const [ideaPdfPitchUrl, setIdeaPdfPitchUrl] = useState("");
  const [ideaProductLogoUrl, setIdeaProductLogoUrl] = useState("");
  const [uploadProgressLogo, setUploadProgressLogo] = useState(0);
  const [logoFile, setLogoFile] = useState(null);
  const [ideaName, setIdeaName] = useState(null);

  const businessDescription = (event) => {
    setBusinessDesc(event.target.value);
  };
  const targetMarketDesc = (event) => {
    setTargetMarket(event.target.value);
  };
  const setProblem = (event) => {
    setProblemStatement(event.target.value);
  };
  const revenueSourceDesc = (event) => {
    setRevenueSource(event.target.value);
  };
  const netRevenueDesc = (event) => {
    setNetRevenue(event.target.value);
  };

  const handleFirst = (event) => {
    event.preventDefault();
    setStep("final");
  };
  const handleIdeaName = (event) => {
    setIdeaName(event.target.value);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const sendData = {
        ideaName: ideaName,
        ideaDescription: businessDesc,
        ideaProblemStatement: problemStatement,
        ideaTargetMarket: targetMarket,
        ideaRevenueSource: revenueSource,
        ideaNetRevenue: netRevenue,
        userId: user._id,
        userName: user.firstName + user.lastName,
        ideaVideoPitchUrl: ideaVideoPitchUrl,
        ideaPdfPitchUrl: ideaPdfPitchUrl,
        ideaProductLogoUrl: ideaProductLogoUrl,
      };
      console.log(sendData);
      const response = await axios.post(
        `https://group12-backend.onrender.com/idea-submission`,

        sendData
      );

      //  await axios.post(`${backendUrl}/notification/investors`);
      changePage("/");
    } catch (error) {}
  };

  const prevStep = (stepNumber) => {
    setStep(stepNumber);
  };

  const [pitchVideoFile, setPitchVideoFile] = useState(null);

  const handlePitchVideoChange = (event) => {
    setPitchVideoFile(event.target.files[0]);
  };

  const uploadPitchVideoToFirebaseStorage = () => {
    if (!pitchVideoFile) return;

    const id = "1";
    console.log(id);

    const imageRef = ref(storage, `web/${id}`);
    const uploadTask = uploadBytesResumable(imageRef, pitchVideoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgressVideo(progress);
      },
      (error) => {
        console.error("Error uploading pitch video:", error);
      },
      () => {
        getDownloadURL(imageRef)
          .then((url) => {
            setIdeaVideoPitchUrl(url);
            console.log("Pitch video uploaded successfully:", url);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          })
          .finally(() => {
            setUploadProgressVideo(0);
          });
      }
    );
  };

  const [pitchPresentationFile, setPitchPresentationFile] = useState(null);

  const handlePitchPresentationChange = (event) => {
    setPitchPresentationFile(event.target.files[0]);
  };

  const uploadPitchPresentationToFirebaseStorage = () => {
    if (!pitchPresentationFile) return;

    const id = "2"; // Replace this with your desired ID or filename
    console.log(id);

    const imageRef = ref(storage, `web/${id}`);
    const uploadTask = uploadBytesResumable(imageRef, pitchPresentationFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgressPresentation(progress);
      },
      (error) => {
        console.error("Error uploading pitch presentation:", error);
      },
      () => {
        getDownloadURL(imageRef)
          .then((url) => {
            setIdeaPdfPitchUrl(url);
            console.log("Pitch presentation uploaded successfully:", url);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          })
          .finally(() => {
            setUploadProgressPresentation(0);
          });
      }
    );
  };
  const handleLogoChange = (event) => {
    setLogoFile(event.target.files[0]);
  };

  const uploadLogoToFirebaseStorage = () => {
    if (!logoFile) return;

    const id = "3"; // Replace this with your desired ID or filename for the logo
    console.log(id);

    const imageRef = ref(storage, `web/${id}`);
    const uploadTask = uploadBytesResumable(imageRef, logoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgressLogo(progress);
      },
      (error) => {
        console.error("Error uploading logo:", error);
      },
      () => {
        getDownloadURL(imageRef)
          .then((url) => {
            setIdeaProductLogoUrl(url);
            console.log("Logo uploaded successfully:", url);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          })
          .finally(() => {
            setUploadProgressLogo(0);
          });
      }
    );
  };
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{
          margin: "auto",
          maxWidth: "800px",
          marginTop: "3rem",
          marginBottom: "2rem",
        }}
      >
        <Grid item>
          <Header />
        </Grid>
        <Grid item style={{ textAlign: "center" }}>
          <h1>Idea Submission</h1>
          <div className="wrapper">
            {/* Step One */}
            {step === "one" && (
              <form onSubmit={handleFirst}>
                <Typography variant="subtitle1">
                  Provide detailed description of your business idea and target
                  market
                </Typography>
                <div className="form-group-idea">
                  <label className="input-label-idea">Idea Name*</label>
                  <TextField
                    type="text"
                    value={ideaName}
                    required
                    onChange={handleIdeaName}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ mb: 1 }}
                    className="input-field-idea"
                  />
                </div>

                <div className="form-group-idea">
                  <label className="input-label-idea">
                    Business Description *
                  </label>
                  <TextField
                    type="text"
                    value={businessDesc}
                    required
                    onChange={businessDescription}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ mb: 1 }}
                    maxRows={2}
                    minRows={2}
                    multiline
                    className="input-field-idea"
                  />
                </div>

                <div className="form-group-idea">
                  <label className="input-label-idea">
                    What is your target Market*
                  </label>
                  <TextField
                    type="text"
                    value={targetMarket}
                    required
                    onChange={targetMarketDesc}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ mb: 1 }}
                    maxRows={2}
                    minRows={2}
                    multiline
                    className="input-field-idea"
                  />
                </div>

                <div className="form-group-idea">
                  <label className="input-label-idea">
                    Explain the problem you are solving *
                  </label>
                  <TextField
                    type="text"
                    value={problemStatement}
                    required
                    onChange={setProblem}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ mb: 1 }}
                    maxRows={2}
                    minRows={2}
                    multiline
                    className="input-field-idea"
                  />
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  className="submit-btn clicked-btn"
                  type="submit"
                >
                  Next <ArrowForwardIcon />
                </Button>
              </form>
            )}

            {step === "final" && (
              <form onSubmit={handleSubmit}>
                <Typography variant="subtitle1">
                  Outline the revenue potential of your business idea and upload
                  document
                </Typography>

                <div className="form-group-idea">
                  <label className="input-label-idea">
                    Describe your revenue sources *
                  </label>
                  <TextField
                    type="text"
                    value={revenueSource}
                    required
                    onChange={revenueSourceDesc}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ mb: 1 }}
                    maxRows={2}
                    minRows={2}
                    multiline
                    className="input-field-idea"
                  />
                </div>

                <div className="form-group-idea">
                  <label className="input-label-idea">
                    What is the net Revenue *
                  </label>
                  <TextField
                    type="text"
                    value={netRevenue}
                    required
                    onChange={netRevenueDesc}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ mb: 1 }}
                    maxRows={2}
                    minRows={2}
                    multiline
                    className="input-field-idea"
                  />
                </div>

                <div className={`${classes.formGroup} form-group-idea`}>
                  <div className={classes.fileContainer}>
                    <div className={classes.fileLabel}>
                      <label className="input-label-idea">
                        Provide Pitch video*
                      </label>
                      <input
                        type="file"
                        accept="video/*"
                        required
                        onChange={handlePitchVideoChange}
                        style={{ display: "none" }}
                        id="pitch-video-input"
                      />
                      <label htmlFor="pitch-video-input">
                        <IconButton
                          color="primary"
                          component="span"
                          aria-label="Upload Pitch Video"
                        >
                          <VideoLibraryIcon />
                        </IconButton>
                        {pitchVideoFile ? (
                          <Typography variant="body1">
                            {pitchVideoFile.name}
                          </Typography>
                        ) : (
                          <Typography variant="body1">
                            Choose a file...
                          </Typography>
                        )}
                      </label>
                    </div>
                    <div className={classes.fileButton}>
                      <Button
                        variant="contained"
                        color="primary"
                        className="submit-btn clicked-btn"
                        onClick={uploadPitchVideoToFirebaseStorage}
                        fullWidth
                      >
                        Video Upload <CloudUploadIcon />
                      </Button>
                    </div>
                  </div>
                  {uploadProgressVideo > 0 && (
                    <div>
                      Uploading Video... {uploadProgressVideo}% Complete
                      <progress value={uploadProgressVideo} max="100" />
                    </div>
                  )}
                </div>

                <div className={`${classes.formGroup} form-group-idea`}>
                  <div className={classes.fileContainer}>
                    <div className={classes.fileLabel}>
                      <label className="input-label-idea">
                        Provide a pitch PPT*
                      </label>
                      <input
                        type="file"
                        required
                        onChange={handlePitchPresentationChange}
                        style={{ display: "none" }}
                        id="pitch-presentation-input"
                      />
                      <label htmlFor="pitch-presentation-input">
                        <IconButton
                          color="primary"
                          component="span"
                          aria-label="Upload Pitch Presentation"
                        >
                          <DescriptionIcon />
                        </IconButton>
                        {pitchPresentationFile ? (
                          <Typography variant="body1">
                            {pitchPresentationFile.name}
                          </Typography>
                        ) : (
                          <Typography variant="body1">
                            Choose a file...
                          </Typography>
                        )}
                      </label>
                    </div>
                    <div className={classes.fileButton}>
                      <Button
                        variant="contained"
                        color="primary"
                        className="submit-btn clicked-btn"
                        onClick={uploadPitchPresentationToFirebaseStorage}
                        fullWidth
                      >
                        Presentation Upload <CloudUploadIcon />
                      </Button>
                    </div>
                  </div>
                  {uploadProgressPresentation > 0 && (
                    <div>
                      Uploading Presentation... {uploadProgressPresentation}%
                      Complete
                      <progress value={uploadProgressPresentation} max="100" />
                    </div>
                  )}
                </div>
                <div className={`${classes.formGroup} form-group-idea`}>
                  <div className={classes.fileContainer}>
                    <div className={classes.fileLabel}>
                      <label className="input-label-idea">
                        Upload your Logo*
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleLogoChange}
                        style={{ display: "none" }}
                        id="logo-input"
                      />
                      <label htmlFor="logo-input">
                        <IconButton
                          color="primary"
                          component="span"
                          aria-label="Upload Logo"
                        >
                          <Image />
                        </IconButton>
                        {logoFile ? (
                          <Typography variant="body1">
                            {logoFile.name}
                          </Typography>
                        ) : (
                          <Typography variant="body1">
                            Choose a file...
                          </Typography>
                        )}
                      </label>
                    </div>
                    <div className={classes.fileButton}>
                      <Button
                        variant="contained"
                        color="primary"
                        className="submit-btn clicked-btn"
                        onClick={uploadLogoToFirebaseStorage}
                        fullWidth
                      >
                        Upload Logo <CloudUploadIcon />
                      </Button>
                    </div>
                  </div>
                  {uploadProgressLogo > 0 && (
                    <div>
                      Uploading Logo... {uploadProgressLogo}% Complete
                      <progress value={uploadProgressLogo} max="100" />
                    </div>
                  )}
                </div>

                <div
                  className="button-container"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className="submit-btn clicked-btn"
                    style={{ width: "10rem" }}
                    type="submit"
                    onClick={() => prevStep("two")}
                  >
                    <ArrowBackIcon /> Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: "10rem" }}
                    className="submit-btn clicked-btn"
                    type="submit"
                  >
                    Submit <SendIcon />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default IdeaSubmission;
