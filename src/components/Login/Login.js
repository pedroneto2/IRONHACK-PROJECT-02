import React, { useContext, useState } from "react";
import "./Login.css";

import AuthContext from "../../store/contexts/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Spinner from "../Spinner/Spinner";

const INITIAL_CREDENTIALS = {
  email: "",
  password: "",
};

const handleSubmit = async (
  e,
  credentials,
  setLoading,
  handleLogin,
  setUser
) => {
  e.preventDefault();
  setLoading(true);
  const { data } = await axios.get("https://ironrest.herokuapp.com/venere");
  const accountFound = data.find((acc) => acc.email === credentials.email);
  if (!accountFound || accountFound.password !== credentials.password) {
    setLoading(false);
    return window.alert("Credentials doesn`t exist or doesn`t match!");
  }
  handleLogin(accountFound.profileType, accountFound._id);
};

const handleChange = (e, credentials, setCredentials) => {
  const { name, value } = e.target;
  setCredentials({ ...credentials, [name]: value });
};

const Login = () => {
  const [credentials, setCredentials] = useState({ ...INITIAL_CREDENTIALS });
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { handleLogin } = useContext(AuthContext);

  return (
    <div className="login-container">
      <form className="login-form">
        <TextField
          disabled={loading}
          name="email"
          label="Email"
          variant="outlined"
          type="text"
          value={credentials.email}
          onChange={(e) => handleChange(e, credentials, setCredentials)}
        />
        <TextField
          disabled={loading}
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          value={credentials.password}
          onChange={(e) => handleChange(e, credentials, setCredentials)}
        />
        <Button
          disabled={loading}
          variant="contained"
          onClick={(e) => handleSubmit(e, credentials, setLoading, handleLogin)}
        >
          {loading ? <Spinner size="2em" /> : "Login"}
        </Button>
        <Button
          disabled={loading}
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
