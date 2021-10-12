import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "./NewService.css";

import Spinner from "../Spinner/Spinner";

import axios from "axios";

const INITIAL_SERVICE_STATE = {
  name: "",
  price: "",
  duration: "",
  category: "",
  description: "",
};

const createServiceID = (userCPF, serviceName) => {
  //CREATE SERVICE ID FUNCTION
  const servicePart = serviceName.split(" ").join("-").toLowerCase();
  const cpfArray = userCPF.match(/[0-9]/g);
  cpfArray.forEach((number, index) => {
    cpfArray[index] = String.fromCharCode(+number + 97);
  });
  const cpfPart = cpfArray.join("");
  return servicePart + "-" + cpfPart.slice(0, -2);
};

const handleSubmit = (
  userID,
  userCPF,
  newService,
  services,
  setOpen,
  open,
  setRefresh,
  refresh,
  setLoading
) => {
  if (Object.values(newService).some((value) => !value)) {
    window.alert("Preencha todos os campos!");
    return;
  }
  const confirm = window.confirm("Você tem certeza?");
  if (!confirm) {
    return;
  }
  setLoading(true);
  newService.id = createServiceID(userCPF, newService.name);
  newService.editable = false;

  axios
    .put("https://ironrest.herokuapp.com/venere/" + userID, {
      services: [...services, { ...newService }],
    })
    .then((response) => {
      setLoading(false);
      window.alert("Serviço adicionado!");
      setOpen({ ...open, services: false });
      setRefresh(!refresh);
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    });
};

const handleChange = (e, newService, setNewService) => {
  const { name, value } = e.target;
  let newValue = value;
  if (name === "price") {
    if (value < 0) {
      return;
    }
  }
  if (name === "duration") {
    if (value < 0 || value > 24) {
      return;
    }
    newValue = Math.round(newValue);
  }

  setNewService({ ...newService, [name]: newValue });
};

const NewService = ({
  userID,
  userCPF,
  services,
  setOpen,
  open,
  setRefresh,
  refresh,
}) => {
  const [newService, setNewService] = useState({ ...INITIAL_SERVICE_STATE });
  const [loading, setLoading] = useState(false);

  return (
    <div className="new-service-container">
      <Typography variant="h5" color="primary" margin="1em" align="center">
        Novo Serviço
      </Typography>
      <TextField
        fullWidth
        value={newService.name}
        label="Nome"
        name="name"
        variant="outlined"
        color="primary"
        type="text"
        sx={{ marginBottom: "1em" }}
        inputProps={{ maxLength: 100 }}
        onChange={(e) => handleChange(e, newService, setNewService)}
      />
      <TextField
        fullWidth
        value={newService.price.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
        label="Preço"
        name="price"
        variant="outlined"
        color="primary"
        type="number"
        sx={{ marginBottom: "1em" }}
        onChange={(e) => handleChange(e, newService, setNewService)}
      />
      <TextField
        fullWidth
        value={newService.duration}
        label="Duração (horas)"
        name="duration"
        variant="outlined"
        color="primary"
        type="number"
        sx={{ marginBottom: "1em" }}
        onChange={(e) => handleChange(e, newService, setNewService)}
      />
      <TextField
        fullWidth
        value={newService.category}
        label="Categoria"
        name="category"
        variant="outlined"
        color="primary"
        type="text"
        sx={{ marginBottom: "1em" }}
        inputProps={{ maxLength: 100 }}
        onChange={(e) => handleChange(e, newService, setNewService)}
      />
      <TextField
        fullWidth
        value={newService.description}
        label="Descrição"
        name="description"
        rows={3}
        variant="outlined"
        color="primary"
        type="text"
        sx={{ marginBottom: "1em" }}
        inputProps={{ maxLength: 500 }}
        onChange={(e) => handleChange(e, newService, setNewService)}
      />
      <Button
        disabled={loading}
        variant="outlined"
        color="primary"
        sx={{ width: "250px", margin: "1em auto" }}
        onClick={() =>
          handleSubmit(
            userID,
            userCPF,
            newService,
            services,
            setOpen,
            open,
            setRefresh,
            refresh,
            setLoading
          )
        }
      >
        {loading ? <Spinner size="2em" /> : "ENVIAR!"}
      </Button>
    </div>
  );
};

export default NewService;
