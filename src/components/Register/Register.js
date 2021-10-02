import React, { useEffect, useState } from "react";
import "./Register.css";

import axios from "axios";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import { useHistory } from "react-router";
import { Typography } from "@mui/material";

const INITIAL_CREDENTIALS = {
  name: "",
  lastName: "",
  email: "",
  cpf: null,
  password: "",
  tel: null,
  end: "",
  profileType: "clients",
};

const handleChange = (e, credentials, setCredentials) => {
  const { name, value } = e.target;
  setCredentials({ ...credentials, [name]: value });
};

const handleSubmit = (
  e,
  credentials,
  history,
  error,
  setBtnSubmit,
  setMsgSubmit
) => {
  e.preventDefault();
  const emptyField = Object.values(credentials).some((elem) => !elem);
  if (emptyField) {
    setBtnSubmit("error");
    setMsgSubmit("Campo Obrigatório não preenchido");
    setTimeout(() => {
      setBtnSubmit("primary");
      setMsgSubmit("");
    }, 2000);
  } else {
    console.log("arquivar");
  }

  // console.log(Object.keys(credentials), Object.values(credentials));
  // axios
  //   .post("https://ironrest.herokuapp.com/venere", credentials)
  //   .then(() => {
  //     history.push("/");
  //   })
  //   .catch((error) => console.log(error));
};

const handleError = (e, error, setError, setErrorMsg) => {
  const { name, value } = e.target;
  console.log(" error ---> ", error);
  if (value === "") {
    setError({ ...error, [name]: true });
    setErrorMsg("Campo Obrigatório");
  } else {
    setError(false);
    setErrorMsg("");
  }
};

const Register = () => {
  const [credentials, setCredentials] = useState({ ...INITIAL_CREDENTIALS });
  const [error, setError] = useState({
    name: false,
    lastName: false,
    cpf: false,
    email: false,
    password: false,
    telephone: false,
    address: false,
    genre: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    name: "",
    lastName: "",
    cpf: "",
    email: "",
    password: "",
    telephone: "",
    address: "",
    genre: "",
  });

  const [btnSubmit, setBtnSubmit] = useState("primary");
  const [msgSubmit, setMsgSubmit] = useState("");

  const history = useHistory();

  return (
    <div className="register-container">
      <div className="register-form-container">
        <TextField
          fullWidth
          name="name"
          label="Nome"
          variant="outlined"
          type="text"
          value={credentials.name}
          onChange={(e) => handleChange(e, credentials, setCredentials)}
          onBlur={(e) => handleError(e, error, setError, setErrorMsg)}
          error={error.name}
          helperText={errorMsg.name}
        />
        <TextField
          fullWidth
          name="lastName"
          label="Sobrenome"
          variant="outlined"
          type="text"
          onChange={(e) => handleChange(e, credentials, setCredentials)}
          onBlur={(e) => handleError(e, error, setError, setErrorMsg)}
          error={error.lastName}
          helperText={errorMsg.lastName}
        />
        <TextField
          fullWidth
          name="cpf"
          label="CPF"
          variant="outlined"
          type="number"
          onChange={(e) =>
            handleChange(e, credentials, setCredentials, setError, setErrorMsg)
          }
          onBlur={(e) => handleError(e, error, setError, setErrorMsg)}
          error={error.cpf}
          helperText={errorMsg.cpf}
        />
        <TextField
          fullWidth
          label="email"
          name="email"
          variant="outlined"
          type="email"
          value={credentials.email}
          onChange={(e) =>
            handleChange(e, credentials, setCredentials, setError, setErrorMsg)
          }
          onBlur={(e) => handleError(e, error, setError, setErrorMsg)}
          error={error.email}
          helperText={errorMsg.email}
        />
        <TextField
          fullWidth
          name="password"
          label="Senha"
          variant="outlined"
          type="password"
          value={credentials.password}
          onChange={(e) =>
            handleChange(e, credentials, setCredentials, setError, setErrorMsg)
          }
          onBlur={(e) => handleError(e, error, setError, setErrorMsg)}
          error={error.password}
          helperText={errorMsg.password}
        />
        <TextField
          fullWidth
          name="telephone"
          label="Telefone"
          variant="outlined"
          type="tel"
          onChange={(e) =>
            handleChange(e, credentials, setCredentials, setError, setErrorMsg)
          }
          onBlur={(e) => handleError(e, error, setError, setErrorMsg)}
          error={error.telephone}
          helperText={errorMsg.telephone}
        />
        <TextField
          fullWidth
          name="address"
          label="Endereço"
          variant="outlined"
          type="text"
          onChange={(e) =>
            handleChange(e, credentials, setCredentials, setError, setErrorMsg)
          }
          onBlur={(e) => handleError(e, error, setError, setErrorMsg)}
          error={error.address}
          helperText={errorMsg.address}
        />
        <FormControl
          error={error.genre}
          helperText={error.genre}
          component="fieldset"
        >
          <FormLabel component="legend">Genero</FormLabel>
          <RadioGroup
            name="radio-buttons-group"
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value="feminino"
              control={<Radio />}
              label="Feminino"
            />
            <FormControlLabel
              value="masculino"
              control={<Radio />}
              label="Masculino"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    profileType: e.target.checked ? "professionals" : "clients",
                  })
                }
              />
            }
            label="Perfil profissional"
          />
        </FormGroup>
        <Button
          onClick={(e) =>
            handleSubmit(
              e,
              credentials,
              history,
              error,
              setBtnSubmit,
              setMsgSubmit
            )
          }
          variant="contained"
          color={btnSubmit}
        >
          Register
        </Button>

        <Typography sx={{ color: "red" }}> {msgSubmit}</Typography>
      </div>
    </div>
  );
};

export default Register;
