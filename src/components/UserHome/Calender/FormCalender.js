import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import axios from "axios";

import CalendarSecheduler from "../../CalendarScheduler/CalendarScheduler";
import { useHistory } from "react-router";

import AuthContext from "../../../store/contexts/AuthContext";

const findSelected = (userData, selected) => {
  if (selected) {
    return userData.schedule.find((elem) => elem.date === selected);
  }
};

const handleChange = (e, updateSchedule, setUpdateSchedule) => {
  const { name, value } = e.target;
  setUpdateSchedule({ ...updateSchedule, [name]: value });
};

const updateData = async (
  updateSchedule,
  userData,
  selected,
  date,
  clientID,
  professionalID,
  history,
  disabledDate,
  setLoading
) => {
  const confirm = window.confirm("Você tem certeza?");
  if (!confirm) {
    return;
  }

  setLoading(true);

  const newSchedule = userData.schedule.find((ele) => {
    return String(ele.date) === String(selected[0]);
  });

  updateSchedule.name && (newSchedule["clientName"] = updateSchedule.name);
  updateSchedule.service &&
    (newSchedule["serviceName"] = updateSchedule.service);
  updateSchedule.value && (newSchedule["servicePrice"] = updateSchedule.value);
  updateSchedule.status && (newSchedule["status"] = updateSchedule.status);

  if (!disabledDate) {
    newSchedule.date = date;
  }

  const newProfessionalData = {};
  const newClientData = {};

  //RETRIEVE DATA
  try {
    await axios
      .get(`https://ironrest.herokuapp.com/venere/${professionalID}`)
      .then((response) => {
        const schedule = response.data.schedule || [];
        newProfessionalData.schedule = schedule;
      });

    await axios
      .get(`https://ironrest.herokuapp.com/venere/${clientID}`)
      .then((response) => {
        const schedule = response.data.schedule || [];
        newClientData.schedule = schedule;
      });
  } catch (errors) {
    console.error(errors);
  }
  //TREAT DATA

  newProfessionalData.schedule.find((meeting, index) => {
    if (meeting.date === selected[0]) {
      newProfessionalData.schedule.splice(index, 1, newSchedule);
      return true;
    }
    return false;
  });

  newClientData.schedule.find((meeting, index) => {
    if (meeting.date === selected[0]) {
      newClientData.schedule.splice(index, 1, newSchedule);
      return true;
    }
    return false;
  });

  //SEND DATA
  try {
    await axios.put(
      `https://ironrest.herokuapp.com/venere/${professionalID}`,
      newProfessionalData
    );

    await axios.put(
      `https://ironrest.herokuapp.com/venere/${clientID}`,
      newClientData
    );
  } catch (errors) {
    console.error(errors);
  }
  history.go(0);
};

const typeStatus = [
  { value: "Concluido", label: "Concluido" },
  { value: "Aguardando Pagamento", label: "Aguardando Pagamento" },
  { value: "Remarcar", label: "Remarcar" },
  { value: "Confirmado o agendamento", label: "Confirmado o agendamento" },
];

function FormCalender(props) {
  const { editSchedule, setEditSchedule, userData, selected, setLoading } =
    props;
  const [date, setDate] = useState();
  const [updateSchedule, setUpdateSchedule] = useState({
    status: "",
  });
  const [accepted, setAccepted] = useState(true);

  const [disabledDate, setDisabledDate] = useState(true);

  const renderUpdate = findSelected(userData, selected[0]);

  const history = useHistory();

  const { authentication } = useContext(AuthContext);

  const isClient = authentication === "clients";

  if (editSchedule && renderUpdate) {
    return (
      <div>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            "& .MuiTextField-root": { margin: "5px" },
          }}
        >
          <FormGroup sx={{ margin: "auto" }}>
            <FormControlLabel
              control={
                <Switch
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDisabledDate(false);
                      setAccepted(false);
                    } else {
                      setDisabledDate(true);
                      setAccepted(true);
                    }
                  }}
                />
              }
              label="Editar data"
            />
          </FormGroup>
          <CalendarSecheduler
            name="date"
            value={date}
            setValue={setDate}
            setAccepted={setAccepted}
            professionalID={renderUpdate.professionalID}
            clientID={renderUpdate.clientID}
            editMode={selected[0]}
            disabled={disabledDate}
          />
          <TextField
            fullWidth
            id="outlined-required"
            label="Nome"
            name="name"
            type="text"
            defaultValue={renderUpdate.clientName}
            onChange={(e) => handleChange(e, updateSchedule, setUpdateSchedule)}
          />
          <TextField
            fullWidth
            disabled={isClient}
            id="outlined-required"
            label="Serviço"
            name="service"
            type="text"
            defaultValue={renderUpdate.serviceName}
            onChange={(e) => handleChange(e, updateSchedule, setUpdateSchedule)}
          />
          <TextField
            fullWidth
            disabled={isClient}
            id="outlined-required"
            label="Valor"
            name="value"
            type="number"
            defaultValue={renderUpdate.servicePrice}
            onChange={(e) => handleChange(e, updateSchedule, setUpdateSchedule)}
          />
          <TextField
            fullWidth
            disabled={isClient}
            id="outlined-required"
            label="Situação"
            value={updateSchedule.status}
            name="status"
            select
            type="text"
            onChange={(e) => handleChange(e, updateSchedule, setUpdateSchedule)}
          >
            {typeStatus.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <div
            className="div-button"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              disabled={!accepted}
              sx={{ marginBottom: "10px" }}
              variant="outlined"
              onClick={async () => {
                await updateData(
                  updateSchedule,
                  userData,
                  selected,
                  date,
                  renderUpdate.clientID,
                  renderUpdate.professionalID,
                  history,
                  disabledDate,
                  setLoading
                );
              }}
            >
              Salvar
            </Button>
            <Button
              sx={{ marginBottom: "10px", width: "90px" }}
              variant="outlined"
              onClick={() => {
                setDisabledDate(true);
                setEditSchedule(false);
              }}
            >
              Cancelar
            </Button>
          </div>
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default FormCalender;
