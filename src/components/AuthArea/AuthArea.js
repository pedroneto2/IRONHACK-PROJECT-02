import React, { useContext } from "react";
import "./AuthArea.css";

import { Link } from "react-router-dom";

import AuthContext from "../../store/contexts/AuthContext";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

const AuthArea = () => {
  const { authentication, user, handleLogout } = useContext(AuthContext);

  return (
    <div className="auth-area-container">
      {authentication ? (
        <Box
          sx={{
            fontSize: "1em",
            fontWeight: "bolder",
            color: "white",
            minWidth: "200px",
          }}
        >
          {`Olá ${user.name}!`}
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
        </Box>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default AuthArea;
