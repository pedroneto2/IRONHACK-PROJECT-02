import "./ManageServices.css";

import Spinner from "../Spinner/Spinner";
import NewService from "./NewService";
import Hide from "../Hide/Hide";

import AuthContext from "../../store/contexts/AuthContext";

import { Button, Modal, Paper, Typography, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Box } from "@mui/system";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  minWidth: "325px",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

const retrieveData = (userID, setServices, setLoadingBtn) => {
  axios
    .get("https://ironrest.herokuapp.com/venere/" + userID)
    .then((response) => {
      response.data.services && setServices([...response.data.services]);
      setLoadingBtn && setLoadingBtn(false);
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteService = (userID, services, index, setServices, setLoadingBtn) => {
  const confirm = window.confirm("Você tem certeza?");
  if (!confirm) {
    return;
  }
  setLoadingBtn(true);
  services.splice(index, 1);
  axios
    .put("https://ironrest.herokuapp.com/venere/" + userID, {
      services: [...services],
    })
    .then((response) => {
      retrieveData(userID, setServices, setLoadingBtn);
    })
    .catch((error) => {
      setLoadingBtn(false);
      console.log(error);
    });
};

const handleChange = (e, index, services, setServices) => {
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

  services[index][name] = newValue;

  setServices([...services]);
};

const editService = (userID, services, index, setServices, setLoadingBtn) => {
  if (!services[index].editable) {
    services[index].editable = true;
    setServices([...services]);
    return;
  }

  let repeatedServiceName = false;

  services.find((service2, index2) => {
    if (index2 === index) return false;
    if (service2.name === services[index].name) {
      repeatedServiceName = true;
      return true;
    }
    return false;
  });

  if (repeatedServiceName) {
    window.alert("Este serviço já existe!");
    return;
  }

  if (Object.values(services[index]).some((value) => !value)) {
    window.alert("Preencha todos os campos!");
    return;
  }

  const confirm = window.confirm("Você tem certeza?");
  if (!confirm) {
    return;
  }

  services[index].editable = false;
  setLoadingBtn(true);
  axios
    .put("https://ironrest.herokuapp.com/venere/" + userID, {
      services: [...services],
    })
    .then((response) => {
      retrieveData(userID, setServices, setLoadingBtn);
    })
    .catch((error) => {
      setLoadingBtn(false);
      console.log(error);
    });
};

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState({ services: false });

  const [refresh, setRefresh] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    retrieveData(user._id, setServices, setLoading);
    setLoading(false);
  }, [refresh]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="service-manager-container">
      <Typography
        variant="h5"
        color="primary"
        align="center"
        sx={{ margin: "1em auto" }}
      >
        GERENCIADOR DE SERVIÇOS
      </Typography>
      <Button
        style={{ width: "250px" }}
        variant="contained"
        onClick={() => setOpen({ ...open, services: true })}
      >
        CADASTRAR NOVO SERVIÇO
      </Button>
      <div className="services-container">
        {services.map((service, index) => (
          <Paper
            key={service.id}
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "2em",
              margin: "2em",
            }}
          >
            <TextField
              fullWidth
              disabled={!service.editable}
              value={service.name}
              label="Nome"
              name="name"
              variant="outlined"
              color="primary"
              type="text"
              sx={{ marginBottom: "1em" }}
              inputProps={{ maxLength: 100 }}
              onChange={(e) => handleChange(e, index, services, setServices)}
            />
            <TextField
              fullWidth
              disabled={!service.editable}
              value={service.price.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
              label="Preço"
              name="price"
              variant="outlined"
              color="primary"
              type="number"
              sx={{ marginBottom: "1em" }}
              onChange={(e) => handleChange(e, index, services, setServices)}
            />
            <TextField
              fullWidth
              disabled={!service.editable}
              value={service.duration}
              label="Duração (horas)"
              name="duration"
              variant="outlined"
              color="primary"
              type="number"
              sx={{ marginBottom: "1em" }}
              onChange={(e) => handleChange(e, index, services, setServices)}
            />
            <TextField
              fullWidth
              disabled={!service.editable}
              value={service.category}
              label="Categoria"
              name="category"
              variant="outlined"
              color="primary"
              type="text"
              sx={{ marginBottom: "1em" }}
              inputProps={{ maxLength: 100 }}
              onChange={(e) => handleChange(e, index, services, setServices)}
            />
            <TextField
              fullWidth
              disabled={!service.editable}
              value={service.description}
              label="Descrição"
              name="description"
              multiline
              rows={3}
              variant="outlined"
              color="primary"
              type="text"
              sx={{ marginBottom: "1em" }}
              inputProps={{ maxLength: 500 }}
              onChange={(e) => handleChange(e, index, services, setServices)}
            />
            <Hide hide={service.editable}>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  marginTop: "1em",
                  width: "100px",
                }}
                disabled={loadingBtn}
                onClick={() => {
                  service.editable = false;
                  setServices([...services]);
                }}
              >
                Cancelar
              </Button>
            </Hide>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                margin: "auto",
                marginTop: "2em",
                width: "95%",
                maxWidth: "250px",
              }}
              disabled={loadingBtn}
              onClick={() =>
                editService(
                  user._id,
                  services,
                  index,
                  setServices,
                  setLoadingBtn
                )
              }
            >
              {loadingBtn ? (
                <Spinner size="2em" />
              ) : service.editable ? (
                "SALVAR ALTERAÇÕES"
              ) : (
                "EDITAR ESTE SERVIÇO"
              )}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                margin: "auto",
                marginTop: "2em",
                width: "95%",
                maxWidth: "250px",
              }}
              disabled={loadingBtn}
              onClick={() =>
                deleteService(
                  user._id,
                  services,
                  index,
                  setServices,
                  setLoadingBtn
                )
              }
            >
              {loadingBtn ? <Spinner size="2em" /> : "DELETAR ESTE SERVIÇO"}
            </Button>
          </Paper>
        ))}

        <Modal
          open={open.services}
          onClose={() => setOpen({ ...open, services: false })}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <NewService
              userID={user._id}
              userCPF={user.cpf}
              services={services}
              setServices={setServices}
              setOpen={setOpen}
              open={open.services}
              setRefresh={setRefresh}
              refres={refresh}
            />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ManageServices;
