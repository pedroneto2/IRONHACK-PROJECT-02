import React, { useState } from "react";
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

const INITIAL_CREDENTIALS = {
  name: "",
  email: "",
  password: "",
  profileType: "clients",
};

const handleChange = (e, credentials, setCredentials) => {
  const { name, value } = e.target;
  setCredentials({ ...credentials, [name]: value });
};

const handleSubmit = (e, credentials, history) => {
  e.preventDefault();

  axios
    .post("https://ironrest.herokuapp.com/venere", credentials)
    .then(() => {
      history.push("/");
    })
    .catch((error) => console.log(error));
};

const Register = () => {
  const [credentials, setCredentials] = useState({ ...INITIAL_CREDENTIALS });

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
        />
        <TextField fullWidth label="Sobrenome" variant="outlined" type="text" />
        <TextField fullWidth label="CPF" variant="outlined" type="number" />
        <TextField
          fullWidth
          name="email"
          label="Email (será o seu login)"
          variant="outlined"
          type="email"
          value={credentials.email}
          onChange={(e) => handleChange(e, credentials, setCredentials)}
        />
        <TextField
          fullWidth
          name="password"
          label="Senha"
          variant="outlined"
          type="password"
          value={credentials.password}
          onChange={(e) => handleChange(e, credentials, setCredentials)}
        />
        <TextField fullWidth label="Telefone" variant="outlined" type="tel" />
        <TextField fullWidth label="Endereço" variant="outlined" type="text" />
        <FormControl component="fieldset">
          <FormLabel component="legend">Genero</FormLabel>
          <RadioGroup defaultValue="female" name="radio-buttons-group">
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
          onClick={(e) => handleSubmit(e, credentials, history)}
          variant="contained"
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Register;
