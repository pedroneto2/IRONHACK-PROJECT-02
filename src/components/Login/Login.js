import React, { useState } from "react";
import "./Login.css";

import { useHistory } from "react-router-dom";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const INITIAL_CREDENTIALS = {
  login: "",
  password: "",
};

const handleChange = (e, credentials, setCredentials) => {
  const { name, value } = e.target;
  setCredentials({ ...credentials, [name]: value });
};

const Login = () => {
  const [credentials, setCredentials] = useState({ ...INITIAL_CREDENTIALS });

  const history = useHistory();

  return (
    <div className="login-container">
      <form className="login-form">
        <TextField
          name="login"
          label="Login"
          variant="outlined"
          type="text"
          value={credentials.login}
          onChange={(e) => handleChange(e, credentials, setCredentials)}
        />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          value={credentials.password}
          onChange={(e) => handleChange(e, credentials, setCredentials)}
        />
        <Button variant="contained">Login</Button>
        <Button
          variant="outlined"
          sx={{ marginTop: "1em" }}
          onClick={() => history.push("/register")}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Login;
