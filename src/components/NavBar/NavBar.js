import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { NavLink, Link } from "react-router-dom";

import "./NavBar.css";
import { Divider, ListItem } from "@mui/material";

import AuthArea from "../AuthArea/AuthArea";

const drawerWidth = 210;

function NavBar({ linkList = [], children }) {
  const [state, setState] = React.useState(false);

  const handleDrawerToggle = () => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(!state);
  };

  const list = (
    <div>
      <List>
        {linkList.map((item, index) => (
          <ListItem key={index}>
            <div className="nav-bar-menu-links">
              <NavLink exact to={`/${item}`}>
                {item.toUpperCase()}
              </NavLink>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className="nav-bar-container">
      <Box>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <div className="nav-bar-logo-links-container">
              <Link to={"/"}>
                <Typography variant="h3" noWrap component="div">
                  Venere
                </Typography>
              </Link>
              <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                {linkList.map((item, index) => (
                  <NavLink key={index} exact to={`/${item}`}>
                    {item.toUpperCase()}
                  </NavLink>
                ))}
              </Box>
            </div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle()}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                minWidth: "225px",
              }}
            >
              <AuthArea />
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav" aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <SwipeableDrawer
            anchor={"right"}
            open={state}
            onClose={handleDrawerToggle()}
            onOpen={handleDrawerToggle()}
            sx={{
              position: "relative",
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                background: "#1976d2",
              },
            }}
          >
            {list}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: "1em",
                minWidth: "220px",
              }}
            >
              <Divider sx={{ marginBottom: "1em", background: "white" }} />
              <AuthArea />
            </Box>
          </SwipeableDrawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </div>
  );
}

export default NavBar;
