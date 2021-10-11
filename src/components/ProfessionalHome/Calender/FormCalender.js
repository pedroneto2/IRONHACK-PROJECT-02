import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import TimePicker from "@mui/lab/TimePicker";

const handleChange = (e, updateSchedule, setUpdateSchedule) => {
  console.log(e);
  const { name, value } = e.target;
  setUpdateSchedule({ ...updateSchedule, [name]: value });
};

const handleChangeDate = (
  e,
  updateSchedule,
  setUpdateSchedule,
  setDateValeu
) => {
  setDateValeu(formateDatePicker(e));
  setUpdateSchedule({ ...updateSchedule, date: formateDatePicker(e) });
};

const handleChangeHour = (
  e,
  updateSchedule,
  setUpdateSchedule,
  setTimeValeu
) => {
  setTimeValeu(e);
  setUpdateSchedule({ ...updateSchedule, hour: e.getHours() });
};

const updateData = (
  updateSchedule,
  editSchedule,
  setEditSchedule,
  userData,
  selected,
  setSelected,
  setSchedulesRows
) => {
  const dataFiltred = userData.schedule.filter((ele) => {
    return String(ele.date) !== String(selected[0]);
  });

  const mergeData = userData.schedule.find((ele) => {
    return String(ele.date) === String(selected[0]);
  });

  if (updateSchedule.date) {
    const yearToData = updateSchedule.date.split("/")[2];
    const dayToData = updateSchedule.date.split("/")[1];
    const mounthToData = updateSchedule.date.split("/")[0] - 1;
    const hourToData = updateSchedule.hour;

    const dateToData = new Date(
      Number(yearToData),
      Number(mounthToData),
      Number(dayToData),
      Number(hourToData) ? Number(hourToData) : new Date(selected).getHours()
    );

    mergeData["date"] = dateToData.toJSON();
  } else if (updateSchedule.hour) {
    const yearToData = new Date(selected).getFullYear();
    const dayToData = new Date(selected).getDate();
    const mounthToData = new Date(selected).getMonth();
    const hourToData = updateSchedule.hour;
    const dateToData = new Date(
      Number(yearToData),
      Number(mounthToData),
      Number(dayToData),
      Number(hourToData)
    );
    mergeData["date"] = dateToData.toJSON();
  }

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
  const editData = [];
  axios
    .put(`https://ironrest.herokuapp.com/venere/${userId}`, newUserData)
    .then(() => {
      axios
        .get(`https://ironrest.herokuapp.com/venere/${userId}`)
        .then((response) => {
          setEditSchedule(!editSchedule);
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

function formateDatePicker(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; /// valor real do mes
  const days = date.getDate();

  if (month < 9 && days < 10) {
    return `0${month}/0${days}/${year}`;
  } else if (days >= 10 && month < 9) {
    return `0${month}/${days}/${year}`;
  } else if (days < 10 && month >= 9) {
    return `${month}/0${days}/${year}`;
  } else {
    return `${month}/${days}/${year}`;
  }
}

function AdjusteDate(date) {
  // usando mes real para funçoes
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const days = newDate.getDate();

  return new Date(year, month - 1, days).toJSON();
}

const findSelected = (userData, selected) => {
  if (selected) {
    return userData.schedule.find((elem) => elem.date === selected);
  }
};

function FormCalender(props) {
  const {
    editSchedule,
    userData,
    selected,
    setSelected,
    setEditSchedule,
    setSchedulesRows,
  } = props;

  const renderUpdate = findSelected(userData, selected[0]);
  const [updateSchedule, setUpdateSchedule] = useState({
    status: "",
  });
  const adjusted = AdjusteDate(selected[0]);
  const adjustedTime = selected[0];
  const [dateValeu, setDateValeu] = useState(adjusted);
  const [timeValeu, setTimeValue] = useState(adjustedTime);

  console.log(updateSchedule);
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <MobileDatePicker
                label="Data"
                inputFormat="dd/MM/yyyy"
                value={dateValeu ? dateValeu : adjusted}
                onChange={(e) =>
                  handleChangeDate(
                    e,
                    updateSchedule,
                    setUpdateSchedule,
                    dateValeu,
                    setDateValeu
                  )
                }
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="Time"
                value={timeValeu ? timeValeu : adjustedTime}
                onChange={(e) =>
                  handleChangeHour(
                    e,
                    updateSchedule,
                    setUpdateSchedule,
                    timeValeu,
                    setTimeValue
                  )
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>

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
              sx={{ marginBottom: "10px" }}
              variant="outlined"
              onClick={() => {
                updateData(
                  updateSchedule,
                  editSchedule,
                  setEditSchedule,
                  userData,
                  selected,
                  setSelected,
                  setSchedulesRows
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
