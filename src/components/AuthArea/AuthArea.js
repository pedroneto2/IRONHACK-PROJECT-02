import React, { useContext } from "react";
import "./AuthArea.css";

import { Link } from "react-router-dom";

import AuthContext from "../../store/contexts/AuthContext";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import SettingsIcon from "@mui/icons-material/Settings";

const AuthArea = () => {
  const { authentication, user, handleLogout } = useContext(AuthContext);

  return (
    <div className="auth-area-container">
      {authentication ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "1em",
            fontWeight: "bolder",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography>{`Olá ${user.name}!`}</Typography>
          <Box>
            <Button
              size="small"
              color="secondary"
              variant="outlined"
              sx={{
                marginLeft: "1em",
                fontSize: "0.8em",
                fontWeight: "bolder",
                color: "white",
              }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
            <Link
              style={{ color: "white" }}
              to={
                authentication === "clients"
                  ? "/clients-settings"
                  : "/professionals-settings"
              }
            >
              <SettingsIcon
                style={{ marginLeft: "0.5em", transform: "translateY(5px)" }}
              />
            </Link>
          </Box>
        </Box>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default AuthArea;
