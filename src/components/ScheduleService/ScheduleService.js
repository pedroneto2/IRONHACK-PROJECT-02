import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import CalendarSecheduler from "../CalendarScheduler/CalendarScheduler";
import Spinner from "../Spinner/Spinner";
import "./ScheduleService.css";

const sendSchedule = (
  date,
  professionalID,
  professionalName,
  professionalEmail,
  clientID,
  clientEmail,
  clientName,
  servicePrice,
  serviceName,
  professionalSchedule = [],
  clientSchedule,
  duration,
  setLoading,
  history
) => {
  const confirmation = window.confirm("Você tem certeza?");
  setLoading(true);
  if (!confirmation) {
    setLoading(false);
    return;
  }
  const schedule = {
    date: date,
    duration: duration,
    professionalEmail: professionalEmail,
    clientEmail: clientEmail,
    clientName: clientName,
    servicePrice: servicePrice,
    serviceName: serviceName,
    professionalID: professionalID,
    professionalName: professionalName,
    clientID: clientID,
  };
  const newProfessionalSchedule = [...professionalSchedule, { ...schedule }];
  const newClientSchedule = [...clientSchedule, { ...schedule }];
  axios
    .put("https://ironrest.herokuapp.com/venere/" + professionalID, {
      schedule: newProfessionalSchedule,
    })
    .then((response) => {
      axios
        .put("https://ironrest.herokuapp.com/venere/" + clientID, {
          schedule: newClientSchedule,
        })
        .then((response) => {
          window.alert("Serviço agendado com sucesso!");
          setLoading(false);
          history.go(0);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

const ScheduleService = ({
  professionalID,
  clientID,
  professionalName,
  professionalEmail,
  clientEmail,
  clientName,
  servicePrice,
  serviceName,
  professionalSchedule,
  clientSchedule,
  duration,
}) => {
  const [date, setDate] = useState();

  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const history = useHistory();

  return (
    <div>
      <Typography color="primary" variant="h6" align="center">
        Agende um horário!
      </Typography>
      <div className="calendar-scheduler-container">
        <CalendarSecheduler
          value={date}
          setValue={setDate}
          setAccepted={setAccepted}
          professionalID={professionalID}
          clientID={clientID}
        />
      </div>
      <Button
        disabled={!accepted}
        sx={{ width: "280px" }}
        variant="contained"
        color="primary"
        onClick={() =>
          sendSchedule(
            date,
            professionalID,
            professionalName,
            professionalEmail,
            clientID,
            clientEmail,
            clientName,
            servicePrice,
            serviceName,
            professionalSchedule,
            clientSchedule,
            duration,
            setLoading,
            history
          )
        }
      >
        {loading ? <Spinner size="2em" /> : "Agendar Serviço!"}
      </Button>
    </div>
  );
};

export default ScheduleService;
