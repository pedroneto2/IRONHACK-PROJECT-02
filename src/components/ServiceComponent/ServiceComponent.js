import { useContext, useEffect, useState } from "react";
import "./ServiceComponent.css";

import AuthContext from "../../store/contexts/AuthContext";

import axios from "axios";

import { Redirect } from "react-router";

import Spinner from "../Spinner/Spinner";

import { Paper, Divider, TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

import ScheduleService from "../ScheduleService/ScheduleService";

const DOUBT_INITIAL_STATE = {
  name: "",
  email: "",
  doubt: "",
};

const validateDoubts = (doubtField) => {
  const fieldEmpty = Object.values(doubtField).some((value) => !value);
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const invalidEmail = !emailRegex.test(doubtField.email);
  if (fieldEmpty) {
    window.alert("Preencha todos os campos!");
    return true;
  }
  if (invalidEmail) {
    window.alert("Insira um email válido!");
    return true;
  }
  return false;
};

const sendDoubts = (
  userID,
  doubts,
  doubtField,
  setDoubtField,
  setLoadingDoubt
) => {
  const invalidDoubt = validateDoubts(doubtField);
  if (invalidDoubt) {
    return;
  }
  setLoadingDoubt(true);
  const newDoubt = [...doubts, { ...doubtField }];
  axios
    .put("https://ironrest.herokuapp.com/venere/" + userID, {
      doubts: newDoubt,
    })
    .then((response) => {
      setLoadingDoubt(false);
      setDoubtField({ ...DOUBT_INITIAL_STATE });
    })
    .catch((error) => console.log(error));
};

const retrieveService = (setService, setLoading, setDoubts, serviceID) => {
  axios
    .get("https://ironrest.herokuapp.com/venere")
    .then((response) => {
      let targetService;
      let doubts = [];
      response.data.forEach((user) => {
        user.services.find((service) => {
          if (service.id === serviceID) {
            targetService = service;
            targetService.professional = user.name;
            targetService.professionalEmail = user.email;
            targetService.professionalID = user._id;
            targetService.schedule = user.schedule;
            doubts = user.doubts || [];
            return true;
          }
          return false;
        });
      });
      setDoubts([...doubts]);
      setService(targetService);
      setLoading(false);
    })
    .catch((error) => console.log(error));
};

const handleChangeDoubts = (e, doubtField, setDoubtField) => {
  const { name, value } = e.target;
  setDoubtField({ ...doubtField, [name]: value });
};

const renderScheduler = (
  authentication,
  professionalID,
  clientID,
  professionalEmail,
  clientEmail,
  professionalSchedule,
  clientSchedule,
  duration
) => {
  if (!authentication) {
    return "Você precisa fazer login para fazer um agendamento!";
  }
  if (authentication === "professionals") {
    return "Somente clientes podem fazer agendamentos!";
  }
  return (
    <ScheduleService
      professionalID={professionalID}
      clientID={clientID}
      professionalEmail={professionalEmail}
      clientEmail={clientEmail}
      professionalSchedule={professionalSchedule}
      clientSchedule={clientSchedule}
      duration={duration}
    />
  );
};

const ServiceComponents = ({ serviceID }) => {
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(true);

  const [loadingDoubt, setLoadingDoubt] = useState(false);
  const [doubts, setDoubts] = useState([]);
  const [doubtField, setDoubtField] = useState({ ...DOUBT_INITIAL_STATE });

  const { user, authentication } = useContext(AuthContext);

  useEffect(() => {
    retrieveService(setService, setLoading, setDoubts, serviceID);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!service) {
    return <Redirect to="/not-found" />;
  }
  return (
    <div className="service-component-container">
      <Paper
        elevation={4}
        sx={{
          width: "75%",
          minWidth: "325px",
          maxWidth: "600px",
          margin: "1em auto",
          display: "flex",
          flexDirection: "column",
          padding: "1em",
        }}
      >
        <Typography color="primary" variant="h5">
          {service.name}
        </Typography>
        <Divider sx={{ margin: "0.5em 0" }} />
        <Typography color="black" variant="p">
          <strong>Profissional:</strong> {service.professional}
        </Typography>
        <Typography color="black" variant="p">
          <strong>Email:</strong> {service.professionalEmail}
        </Typography>
        <Typography color="black" variant="p">
          <strong>Categoria:</strong> {service.category}
        </Typography>
        <Typography color="black" variant="p">
          <strong>Duração:</strong>{" "}
          {`${service.duration} hora${service.duration > 1 ? "s" : ""}`}
        </Typography>
        <Typography color="black" variant="p">
          <strong>Preço:</strong>{" "}
          {service.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Typography>
        <Typography color="black" variant="p" align="justify">
          <strong>Descrição:</strong> {service.description}
        </Typography>
        <div className="service-question-schedule-container">
          <div className="service-question-container">
            <Typography
              color="primary"
              variant="h6"
              marginBottom="0.5em"
              align="center"
            >
              Tire suas Dúvidas!
            </Typography>
            <TextField
              required
              name="name"
              label="Nome"
              variant="outlined"
              color="primary"
              type="text"
              size="small"
              value={doubtField.name}
              onChange={(e) => handleChangeDoubts(e, doubtField, setDoubtField)}
              sx={{ marginBottom: "0.5em" }}
            />
            <TextField
              required
              name="email"
              label="Email"
              variant="outlined"
              color="primary"
              type="email"
              size="small"
              value={doubtField.email}
              onChange={(e) => handleChangeDoubts(e, doubtField, setDoubtField)}
              sx={{ marginBottom: "0.5em" }}
            />
            <TextField
              required
              name="doubt"
              label="Dúvida"
              variant="outlined"
              color="primary"
              type="text"
              multiline
              rows={3}
              value={doubtField.doubt}
              onChange={(e) => handleChangeDoubts(e, doubtField, setDoubtField)}
              sx={{ marginBottom: "0.5em" }}
            />
            <Button
              disabled={loadingDoubt}
              variant="contained"
              color="primary"
              onClick={() =>
                sendDoubts(
                  user._id,
                  doubts,
                  doubtField,
                  setDoubtField,
                  setLoadingDoubt
                )
              }
            >
              {loadingDoubt ? <Spinner size="2em" /> : "Enviar!"}
            </Button>
          </div>
          <div className="service-schedule-container">
            {renderScheduler(
              authentication,
              service.professionalID,
              user._id,
              service.professionalEmail,
              user.email,
              service.schedule,
              user.schedule,
              service.duration
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ServiceComponents;
