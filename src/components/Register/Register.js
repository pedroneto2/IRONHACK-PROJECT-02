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
import { Typography } from "@mui/material";
import { cpfMask } from "./cpfMask";
import { telMask } from "./telMask";

const INITIAL_CREDENTIALS = {
  name: "",
  telephone: "",
  address: "",
  profileType: "clients",
};

const handleChange = (e, credentials, setCredentials) => {
  let { name, value } = e.target;
  if (name === "cpf") value = cpfMask(value);
  if (name === "telephone") value = telMask(value);
  setCredentials({ ...credentials, [name]: value });
};

const checkData = async (credentials) => {
  const { data } = await axios.get("https://ironrest.herokuapp.com/venere");
  const checkCPF = data
    .map((ele) => ele.cpf)
    .some((elem) => elem === credentials.cpf);

  const checkEmail = data
    .map((ele) => ele.email)
    .some((elem) => elem === credentials.email);
  return { existsCpf: checkCPF, existEmail: checkEmail };
};

const handleSubmit = async (
  e,
  credentials,
  history,
  setBtnSubmit,
  setMsgSubmit,
  setError,
  errorMsg,
  setErrorMsg
) => {
  e.preventDefault();

  const emptyField = Object.values(credentials).some((elem) => !elem);
  const msgErrorSubmit = Object.values(errorMsg).filter((value) => value);
  const checked = await checkData(credentials);

  if (emptyField) {
    setBtnSubmit("error");
    setMsgSubmit("Campo(s) Obrigatório(s) não preenchido(s) ! ");
    setTimeout(() => {
      setBtnSubmit("primary");
      setMsgSubmit("");
      setError({
        name: false,
        lastName: false,
        cpf: false,
        email: false,
        password: false,
        repeatPassword: false,
        telephone: false,
        address: false,
        genre: false,
      });
      setErrorMsg({
        name: "",
        lastName: "",
        cpf: "",
        email: "",
        password: "",
        repeatPassword: "",
        telephone: "",
        address: "",
        genre: "",
      });
    }, 5000);
  } else if (msgErrorSubmit.length) {
    console.log(msgErrorSubmit);
    setBtnSubmit("error");
    setMsgSubmit(msgErrorSubmit);
  } else if (checked.existsCpf) {
    setBtnSubmit("error");
    setMsgSubmit("CPF já cadastrado!");
  } else if (checked.existEmail) {
    setBtnSubmit("error");
    setMsgSubmit("Email já cadastrado!");
  } else {
    axios
      .post("https://ironrest.herokuapp.com/venere", credentials)
      .then(() => {
        history.push("/");
      })
      .catch((error) => console.log(error));
  }

  setTimeout(() => {
    setBtnSubmit("primary");
    setMsgSubmit("");
  }, 5000);
};

function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const handleError = (
  e,
  credentials,
  error,
  setError,
  errorMsg,
  setErrorMsg
) => {
  const { name, value } = e.target;

  //Verifica Campos vazios
  if (value === "") {
    setError({ ...error, [name]: true });
    setErrorMsg({ ...errorMsg, [name]: "Campo Obrigatório" });
  } else {
    //Verifica CPF Valido
    const onlyNumber = /[0-9]/g;

    if (name === "cpf" && value.match(onlyNumber).length < 11) {
      setError({ ...error, [name]: true });
      setErrorMsg({ ...errorMsg, [name]: "CPF Inválido" });
    }
    //Verifica email valido
    if (name === "email" && !validateEmail(value)) {
      setError({ ...error, [name]: true });
      setErrorMsg({ ...errorMsg, [name]: "Email Inválido" });
    }
    //Verifica senhas iguais
    if (name === "repeatPassword" && credentials.password !== value) {
      setError({ ...error, [name]: true });
      setErrorMsg({ ...errorMsg, [name]: "Senhas diferentes!" });
    } else {
      //Verificar senha forte
      let strongPass =
        /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;

      if (name === "repeatPassword") {
        if (value.length < 6 || value.length > 20 || !strongPass.test(value)) {
          setError({ ...error, [name]: true });
          setErrorMsg({
            ...errorMsg,
            [name]: `Senhas deve ter entre 6 e 20 caracteres! 
            Deve possuir pelo menos uma letra maiúscula e um número`,
          });
        }
      }
    }
    //verifica telefone
    if (name === "telephone" && value.match(onlyNumber).length < 11) {
      setError({ ...error, [name]: true });
      setErrorMsg({
        ...errorMsg,
        [name]: `Telefone Invalido!`,
      });
    }
  }
};

const handleFocus = (e, error, setError, errorMsg, setErrorMsg) => {
  const { name } = e.target;
  setError({ ...error, [name]: false });
  setErrorMsg({ ...errorMsg, [name]: "" });
};

const Register = () => {
  const [credentials, setCredentials] = useState({ ...INITIAL_CREDENTIALS });
  const [error, setError] = useState({
    name: false,
    lastName: false,
    cpf: false,
    email: false,
    password: false,
    repeatPassword: false,
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
    repeatPassword: "",
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
          onBlur={(e) =>
            handleError(e, credentials, error, setError, errorMsg, setErrorMsg)
          }
          onFocus={(e) => {
            handleFocus(e, error, setError, errorMsg, setErrorMsg);
          }}
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
          onBlur={(e) =>
            handleError(e, credentials, error, setError, errorMsg, setErrorMsg)
          }
          onFocus={(e) =>
            handleFocus(e, error, setError, errorMsg, setErrorMsg)
          }
          error={error.lastName}
          helperText={errorMsg.lastName}
        />
        <TextField
          fullWidth
          name="cpf"
          label="CPF"
          variant="outlined"
          value={credentials.cpf}
          type="text"
          onChange={(e) =>
            handleChange(e, credentials, setCredentials, setError, setErrorMsg)
          }
          onBlur={(e) =>
            handleError(e, credentials, error, setError, errorMsg, setErrorMsg)
          }
          onFocus={(e) =>
            handleFocus(e, error, setError, errorMsg, setErrorMsg)
          }
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
          onBlur={(e) =>
            handleError(e, credentials, error, setError, errorMsg, setErrorMsg)
          }
          onFocus={(e) => {
            handleFocus(e, error, setError, errorMsg, setErrorMsg);
          }}
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
          onBlur={(e) =>
            handleError(e, credentials, error, setError, errorMsg, setErrorMsg)
          }
          onFocus={(e) => {
            handleFocus(e, error, setError, errorMsg, setErrorMsg);
          }}
          error={error.password}
          helperText={errorMsg.password}
        />
        <TextField
          fullWidth
          name="repeatPassword"
          label="Repetir Senha"
          variant="outlined"
          type="password"
          value={credentials.repeatPassword}
          onChange={(e) =>
            handleChange(e, credentials, setCredentials, setError, setErrorMsg)
          }
          onBlur={(e) =>
            handleError(e, credentials, error, setError, errorMsg, setErrorMsg)
          }
          onFocus={(e) => {
            handleFocus(e, error, setError, errorMsg, setErrorMsg);
          }}
          error={error.repeatPassword}
          helperText={errorMsg.repeatPassword}
        />
        <TextField
          fullWidth
          name="telephone"
          label="Telefone"
          variant="outlined"
          value={credentials.telephone}
          type="tel"
          onChange={(e) =>
            handleChange(e, credentials, setCredentials, setError, setErrorMsg)
          }
          onBlur={(e) =>
            handleError(e, credentials, error, setError, errorMsg, setErrorMsg)
          }
          onFocus={(e) => {
            handleFocus(e, error, setError, errorMsg, setErrorMsg);
          }}
          error={error.telephone}
          helperText={errorMsg.telephone}
        />
        <TextField
          fullWidth
          name="address"
          label="Endereço"
          variant="outlined"
          value={credentials.address}
          type="text"
          onChange={(e) =>
            handleChange(e, credentials, setCredentials, setError, setErrorMsg)
          }
          onBlur={(e) =>
            handleError(e, credentials, error, setError, errorMsg, setErrorMsg)
          }
          onFocus={(e) => {
            handleFocus(e, error, setError, errorMsg, setErrorMsg);
          }}
          error={error.address}
          helperText={errorMsg.address}
        />
        <FormControl error={error.genre} component="fieldset">
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
              setBtnSubmit,
              setMsgSubmit,
              setError,
              errorMsg,
              setErrorMsg
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
