import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { display } from "@mui/system";
import axios from "axios";

const handleChange = (e, updateSchedule, setUpdateSchedule) => {
  const { name, value } = e.target;
  setUpdateSchedule({ ...updateSchedule, [name]: value });
};

const updateData = (
  updateSchedule,
  userData,
  selected,
  setUserData,
  history
) => {
  const dataFiltred = userData.schedule.filter((ele) => {
    return String(ele.date) !== String(selected[0]);
  });

  const mergeData = userData.schedule.find((ele) => {
    return String(ele.date) === String(selected[0]);
  });

  if (updateSchedule.date) {
    const yearToData = updateSchedule.date.slice(0, 4);
    const mounthToData = updateSchedule.date.slice(5, 7) - 1;
    const dayToData = updateSchedule.date.slice(8, 10);

    const hourToData = updateSchedule.hour.slice(0, 2);
    const dateToData = new Date(
      yearToData,
      mounthToData,
      dayToData,
      hourToData
    );
    mergeData["date"] = dateToData.toJSON();
  }

  // console.log("teste slice", dateToData);
  // console.log("data antes de formatada", updateSchedule.date);
  // console.log("data formatada", dateToData);
  updateSchedule.name && (mergeData["clientName"] = updateSchedule.name);
  updateSchedule.service && (mergeData["serviceName"] = updateSchedule.service);
  updateSchedule.value && (mergeData["servicePrice"] = updateSchedule.value);
  updateSchedule.status && (mergeData["status"] = updateSchedule.status);

  const newUserData = {
    ...userData,
    schedule: [...dataFiltred, mergeData],
  };
  const userId = userData._id;
  delete newUserData["_id"];
  console.log("newuser   ->>>>>>>", newUserData);

  console.log("filtrando objeto para atualizar", dataFiltred);
  console.log("Objeto com os dados atualizados", mergeData);
  console.log("oque eu estou atualizando", {
    ...userData,
    schedule: [...dataFiltred, mergeData],
  });

  axios
    .put(`https://ironrest.herokuapp.com/venere/${userId}`, newUserData)
    .then(() => {
      axios
        .get(`https://ironrest.herokuapp.com/venere/${userId}`)
        .then((response) => {
          console.log("response data ---> ", response.data);
          setUserData(response.data);
          history.go(0);
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

function formateDate(date) {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const days = newDate.getDate();

  if (month < 10 && days < 10) {
    return `${year}-0${month}-0${days}`;
  } else if (days >= 10 && month < 10) {
    return `${year}-0${month}-${days}`;
  } else if (days < 10 && month >= 10) {
    return `${year}-${month}-0${days}`;
  } else {
    return `${year}-${month}-${days}`;
  }
}

function formateHour(date) {
  const newDate = new Date(date);
  const hour = newDate.getHours();
  return `${hour}:00`;
}

const findSelected = (userData, selected) => {
  if (selected) {
    return userData.schedule.find((elem) => elem.date === selected);
  }
};

function FormCalender(props) {
  const { editSchedule, userData, selected, setUserData, history } = props;
  const renderUpdate = findSelected(userData, selected[0]);
  const [updateSchedule, setUpdateSchedule] = useState({
    // date: `${selected}`,
    // hour: `${formateHour(selected)}`,
    // clientName: `${renderUpdate.clientName}`,
    // serviceName: `${renderUpdate.serviceName}`,
    // serciePrice: `${renderUpdate.servicePrice}`,
  });
  console.log(userData);
  if (editSchedule && renderUpdate) {
    const dateToDefault = formateDate(selected);
    const hourToDefault = formateHour(selected);
    return (
      <div>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            "& .MuiTextField-root": { margin: "5px" },
          }}
        >
          <TextField
            fullWidth
            id="outlined-required"
            label="Date"
            name="date"
            type="date"
            defaultValue={dateToDefault}
            onChange={(e) => handleChange(e, updateSchedule, setUpdateSchedule)}
          />
          <TextField
            fullWidth
            id="outlined-required"
            label="Horário"
            name="hour"
            type="time"
            defaultValue={hourToDefault}
            onChange={(e) => handleChange(e, updateSchedule, setUpdateSchedule)}
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
              sx={{ marginBottom: "10px" }}
              variant="outlined"
              onClick={() => {
                updateData(
                  updateSchedule,
                  userData,
                  selected,
                  setUserData,
                  history
                );
              }}
            >
              Salvar
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
