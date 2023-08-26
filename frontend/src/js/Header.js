import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import {
  Menu,
  MenuItem,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import logo from "../images/logo.JPG";
import { useNavigate } from "react-router-dom";
import DrawerComp from "./DrawerComp";
const PAGES = [
  "STUDENT/ALUMNI",
  "INVESTOR",
  "ABOUT US",
  "CONTACT US",
  "FAQ'S",
  "SUCCESS STORIES",
  "LOGIN",
  "SIGNUP",
  "INVESTORPORTFOLIO",
];
const App = () => {
  const [value, setValue] = useState();
  const [isUserProfileClicked, setUserProfileClicked] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const changePage = useNavigate();

  const storedUser = localStorage.getItem("user");

  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const userRole = parsedUser ? parsedUser.role : null;
  const isAdmin = localStorage.getItem("isAdmin");
  console.log(storedUser);

  const handleClick = () => {
    changePage("/story");
  };
  const handleLogo = () => {
    changePage("/");
  };

  const handleContact = () => {
    changePage("/contact-us");
  };

  const handleIdeaSubmission = () => {
    changePage("/idea-submission");
  };

  const handleFAQ = () => {
    changePage("/faq");
  };
  const handleInvestor = () => {
    changePage("/pitch");
  };
  const userProfileClicked = () => {
    setUserProfileClicked(!isUserProfileClicked);
  };
  const editProfile = () => {
    changePage("/editProfile");
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    changePage("/");
  };
  const handlePortfolio = () => {
    changePage("/investorProfile");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handleStudentClick = () => {
    changePage("/studentAlumni");
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAdminSuccessClick = () => {
    changePage("/storyAdmin");
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAdminPostSuccessClick = () => {
    changePage("/postStory");
  };
  const handleAdminFAQ = () => {
    changePage("/adminfaq");
  };
  return (
    <AppBar style={{ backgroundColor: "white" }}>
      <Toolbar
        sx={{ height: "40px", paddingTop: "10px", paddingBottom: "0.7rem" }}
      >
        <Typography variant="h3" sx={{ flexGrow: 1 }}>
          <img
            src={logo}
            alt="Logo"
            height="75"
            style={{ borderRadius: "1rem", marginTop: "1rem" }}
            onClick={handleLogo}
          />
        </Typography>

        {isMatch ? (
          <div>
            <DrawerComp />
          </div>
        ) : (
          <Tabs
            textColor="primary"
            value={value}
            onChange={(e, value) => setValue(value)}
            indicatorColor="primary"
          >
            {userRole === "Student" && (
              <Tab
                label="Student/Alumni"
                sx={{ pr: 1, pl: 1 }}
                onClick={handleStudentClick}
              />
            )}
            {userRole === "Investor" && isAdmin !== "true" && (
              <Tab
                label="Investor"
                onClick={handleInvestor}
                sx={{ pr: 1, pl: 1 }}
              />
            )}
            {isAdmin !== "true" && (
              <Tab label="About us" sx={{ pr: 1, pl: 1 }} />
            )}
            {isAdmin !== "true" && (
              <Tab
                label="Contact us"
                onClick={handleContact}
                sx={{ pr: 1, pl: 1 }}
              />
            )}
            {userRole === "Student" && (
              <Tab
                label="Idea Submission"
                onClick={handleIdeaSubmission}
                sx={{ pr: 1, pl: 1 }}
              />
            )}{" "}
            {isAdmin === "false" && (
              <Tab label="FAQ's" onClick={handleFAQ} sx={{ pr: 1, pl: 1 }} />
            )}
            {isAdmin === "true" && (
              <Tab
                label="FAQ's"
                onClick={handleAdminFAQ}
                sx={{ pr: 1, pl: 1 }}
              />
            )}
            {isAdmin === "true" && (
              <Tab
                label="View Stories"
                onClick={handleAdminSuccessClick}
                sx={{ pr: 1, pl: 1 }}
              ></Tab>
            )}
            {isAdmin === "true" && (
              <Tab
                label="Post Stories"
                onClick={handleAdminPostSuccessClick}
                sx={{ pr: 1, pl: 1 }}
              ></Tab>
            )}
            {isAdmin === "false" && (
              <Tab
                label="Success Stories"
                onClick={handleClick}
                sx={{ pr: 1, pl: 1 }}
              ></Tab>
            )}
            {userRole === "Investor" && isAdmin !== "true" && (
              <Tab
                label="portfolio"
                onClick={handlePortfolio}
                sx={{ pr: 1, pl: 1 }}
              />
            )}
            {!user && (
              <>
                <Button
                  onClick={() => changePage("/login")}
                  sx={{
                    marginLeft: "auto",
                    "&:hover": {
                      backgroundColor: "#2196f3",
                      color: "white",
                    },
                  }}
                >
                  Login{" "}
                </Button>
                <Button
                  onClick={() => changePage("/signup")}
                  sx={{
                    marginLeft: "10px",
                    "&:hover": {
                      backgroundColor: "#2196f3",
                      color: "white",
                    },
                  }}
                >
                  SignUp
                </Button>
              </>
            )}
            {user && (
              <>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={userProfileClicked}
                  sx={{ pr: 1, pl: 1 }}
                >
                  {user.firstName}
                  {isUserProfileClicked && (
                    <div
                      className="user-profile arrow-top"
                      onClick={editProfile}
                    >
                      Profile
                    </div>
                  )}
                </Button>

                <Button onClick={handleLogout} sx={{ pr: 1, pl: 1 }}>
                  Logout{" "}
                </Button>
              </>
            )}
          </Tabs>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default App;
