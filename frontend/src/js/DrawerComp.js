import { IconButton } from "@material-ui/core";
import { ChevronRight, Menu } from "@material-ui/icons";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const changePage = useNavigate("/contact-us");
  const handleContact = () => {
    changePage("/contact-us");
  };

  const handleFaq = () => {
    changePage("/faq");
  };
  return (
    <Fragment>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
      >
        <List>
          <IconButton
            sx={{
              color: "gray",
              position: "absolute",
              top: 0,
              left: 0,
              marginLeft: "8rem",
            }}
            onClick={() => setOpenDrawer(false)}
          >
            <ChevronRight />
          </IconButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>Login</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>SignUp</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>Student/Alumni</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>Investor</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton onClick={handleContact}>
            <ListItemIcon>
              <ListItemText>Contact us</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>About us</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton onClick={handleFaq}>
            <ListItemIcon>
              <ListItemText>FAQ's</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>Success Stories</ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <Menu />
      </IconButton>
    </Fragment>
  );
};

export default DrawerComp;
