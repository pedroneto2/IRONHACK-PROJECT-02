import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

import CalendarSecheduler from "../../CalendarScheduler/CalendarScheduler";
import Spinner from "../../Spinner/Spinner";
import { useHistory } from "react-router";

const findSelected = (userData, selected) => {
  if (selected) {
    return userData.schedule.find((elem) => elem.date === selected);
  }
};

const handleChange = (e, updateSchedule, setUpdateSchedule) => {
  const { name, value } = e.target;
  setUpdateSchedule({ ...updateSchedule, [name]: value });
};

const updateData = (
  updateSchedule,
  setEditSchedule,
  userData,
  selected,
  setSelected,
  setSchedulesRows,
  date,
  clientID,
  ProfessionalID,
  setLoading,
  history
) => {
  const confirm = window.confirm("Você tem certeza?");
  if (!confirm) {
    return;
  }

  const dataFiltred = userData.schedule.filter((ele) => {
    return String(ele.date) !== String(selected[0]);
  });

  const mergeData = userData.schedule.find((ele) => {
    return String(ele.date) === String(selected[0]);
  });

  updateSchedule.name && (mergeData["clientName"] = updateSchedule.name);
  updateSchedule.service && (mergeData["serviceName"] = updateSchedule.service);
  updateSchedule.value && (mergeData["servicePrice"] = updateSchedule.value);
  updateSchedule.status && (mergeData["status"] = updateSchedule.status);

  mergeData.date = date;

  const newUserData = {
    ...userData,
    schedule: [...dataFiltred, mergeData],
  };

  const userId = userData._id;
  delete newUserData["_id"];
  const editData = [];
  setLoading(true);
  axios
    .put(`https://ironrest.herokuapp.com/venere/${clientID}`, newUserData)
    .then(() => {
      axios
        .put(
          `https://ironrest.herokuapp.com/venere/${ProfessionalID}`,
          newUserData
        )
        .then(() => {
          axios
            .get(`https://ironrest.herokuapp.com/venere/${userId}`)
            .then((response) => {
              selected.shift();
              setSelected(selected);
              response.data.schedule.forEach((ele) => {
                editData.push({
                  date: ele.date,
                  clientName: ele.clientName,
                  serviceName: ele.serviceName,
                  servicePrice: ele.servicePrice,
                  status: ele.status,
                });
              });
              setSchedulesRows(editData);
              setLoading(false);
              setEditSchedule(false);
              history.go(0);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

const typeStatus = [
  { value: "Concluido", label: "Concluido" },
  { value: "Aguardando Pagamento", label: "Aguardando Pagamento" },
  { value: "Remarcar", label: "Remarcar" },
  { value: "Confirmado o agendamento", label: "Confirmado o agendamento" },
];

function FormCalender(props) {
  const {
    editSchedule,
    userData,
    selected,
    setSelected,
    setEditSchedule,
    setSchedulesRows,
  } = props;
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);
  const [updateSchedule, setUpdateSchedule] = useState({
    status: "",
  });
  const [accepted, setAccepted] = useState(false);

  const renderUpdate = findSelected(userData, selected[0]);

  const history = useHistory();

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
          <CalendarSecheduler
            name="date"
            value={date}
            setValue={setDate}
            setAccepted={setAccepted}
            professionalID={renderUpdate.professionalID}
            clientID={renderUpdate.clientID}
            editMode
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
            id="outlined-required"
            label="Serviço"
            name="service"
            type="text"
            defaultValue={renderUpdate.serviceName}
            onChange={(e) => handleChange(e, updateSchedule, setUpdateSchedule)}
          />
          <TextField
            fullWidth
            id="outlined-required"
            label="Valor"
            name="value"
            type="number"
            defaultValue={renderUpdate.servicePrice}
            onChange={(e) => handleChange(e, updateSchedule, setUpdateSchedule)}
          />
          <TextField
            fullWidth
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
              disabled={!accepted || loading}
              sx={{ marginBottom: "10px" }}
              variant="outlined"
              onClick={() => {
                updateData(
                  updateSchedule,
                  setEditSchedule,
                  userData,
                  selected,
                  setSelected,
                  setSchedulesRows,
                  date,
                  renderUpdate.clientID,
                  renderUpdate.professionalID,
                  setLoading,
                  history
                );
              }}
            >
              {loading ? <Spinner size="2em" /> : "Salvar"}
            </Button>
            <Button
              disabled={loading}
              sx={{ marginBottom: "10px", width: "90px" }}
              variant="outlined"
              onClick={() => setEditSchedule(false)}
            >
              {loading ? <Spinner size="2em" /> : "Cancelar"}
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
