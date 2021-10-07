import { useContext, useEffect, useState } from "react";
import "./WorkingSettings.css";

import Spinner from "../Spinner/Spinner";
import LoadingPage from "../LoadingPage/LoadingPage";

import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TimePicker from "@mui/lab/TimePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import DateTimeEditor from "./DateTimeEditor/DateTimeEditor";

import AuthContext from "../../store/contexts/AuthContext";

import axios from "axios";
import { useHistory } from "react-router";

const retrieveValues = async (userID, setValues, setServices) => {
  await axios
    .get("https://ironrest.herokuapp.com/venere/" + userID)
    .then((response) => {
      const advertisings = {
        img: "",
        link: "",
        description: "",
        ...response.data.advertisings,
      };
      setValues({
        maxDays: response.data.maxDays || 0,
        notWorkingDays: response.data.notWorkingDays || [],
        weekNotWorkingDays: response.data.weekNotWorkingDays || [],
        dayNotWorkingHours: response.data.dayNotWorkingHours || [],
        advertisings: { ...advertisings },
      });
      const services = response.data.services || [];
      setServices(services);
    })
    .catch((error) => console.log(error));
};

const submitValues = (userID, values, setLoading, history) => {
  const confirmation = window.confirm("Você tem certeza?");
  if (!confirmation) {
    return;
  }
  setLoading(true);
  axios
    .put("https://ironrest.herokuapp.com/venere/" + userID, values)
    .then((response) => {
      window.alert("Alterações salvas com sucesso!");
      history.go(0);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
};

const switchWeekNotWorkingDay = (e, values, setValues) => {
  const { name, checked } = e.target;
  const weekNotWorkingDays = values.weekNotWorkingDays;
  if (!checked) {
    const index = weekNotWorkingDays.indexOf(+name);
    weekNotWorkingDays.splice(index, 1);
    return setValues({ ...values, weekNotWorkingDays });
  }
  weekNotWorkingDays.push(+name);
  setValues({ ...values, weekNotWorkingDays });
};

const renderWeekNotWorkingDays = (values, setValues) => {
  const numberWeekDays = [
    { num: "0", name: "Domingo" },
    { num: "1", name: "Segunda" },
    { num: "2", name: "Terça" },
    { num: "3", name: "Quarta" },
    { num: "4", name: "Quinta" },
    { num: "5", name: "Sexta" },
    { num: "6", name: "Sábado" },
  ];
  return numberWeekDays.map((week) => (
    <FormControlLabel
      key={week.num}
      sx={{ width: "100px" }}
      control={
        <Switch
          name={week.num}
          checked={values.weekNotWorkingDays.includes(+week.num)}
          onChange={(e) => switchWeekNotWorkingDay(e, values, setValues)}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
      label={week.name}
    />
  ));
};

const WorkingSettings = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const [values, setValues] = useState({
    maxDays: "",
    notWorkingDays: [],
    weekNotWorkingDays: [],
    dayNotWorkingHours: [],
    advertisings: {},
  });
  const [services, setServices] = useState([]);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      await retrieveValues(user._id, setValues, setServices);
      setLoadingPage(false);
    })();
  }, []);

  return loadingPage ? (
    <LoadingPage />
  ) : (
    <div className="working-settings-container">
      <Typography
        variant="h4"
        color="primary"
        align="center"
        sx={{ margin: "1em auto" }}
      >
        CONFIGURAÇÕES DE TRABALHO
      </Typography>
      <div>
        <Typography variant="p">Agendar serviços em até </Typography>
        <TextField
          name="maxDays"
          size="small"
          variant="outlined"
          color="primary"
          value={values.maxDays}
          onChange={(e) => setValues({ ...values, maxDays: +e.target.value })}
          inputProps={{ maxLength: 3 }}
          sx={{
            width: "55px",
            transform: "translateY(-10px)",
          }}
        />
        <Typography variant="p"> dias</Typography>
      </div>
      <DateTimeEditor
        titleText={"Dias que não poderei agendar serviços:"}
        labelText={"Selecione um dia"}
        btnText={"Adicionar dia"}
        editedArray={"notWorkingDays"}
        values={values}
        setValues={setValues}
        DateTimePicker={DatePicker}
      />
      <div className="week-not-working-days-container">
        <Typography variant="h7" color="primary" sx={{ margin: "1em" }}>
          Dias da semana que não trabalho:
        </Typography>
        <div className="week-not-working-days-switches-container">
          {renderWeekNotWorkingDays(values, setValues)}
        </div>
      </div>
      <DateTimeEditor
        titleText={"Horas do dia que não trabalho:"}
        labelText={"Selecione uma hora"}
        btnText={"Adicionar hora"}
        editedArray={"dayNotWorkingHours"}
        values={values}
        setValues={setValues}
        DateTimePicker={TimePicker}
        hourPicker
      />
      <div className="advertisings-edition-container">
        <Typography variant="h7" color="primary" sx={{ margin: "1em" }}>
          Configure sua propaganda:
        </Typography>
        <TextField
          fullWidth
          label="Image Link"
          variant="outlined"
          color="primary"
          value={values.advertisings.img}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ maxLength: 100 }}
          onChange={(e) =>
            setValues({
              ...values,
              advertisings: { ...values.advertisings, img: e.target.value },
            })
          }
        />
        <FormControl fullWidth sx={{ margin: "1em auto" }}>
          <InputLabel variant="outlined" color="primary">
            Link da imagem para qual serviço?
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={values.advertisings.link}
            label="Link da imagem para qual serviço?"
            onChange={(e) =>
              setValues({
                ...values,
                advertisings: { ...values.advertisings, link: e.target.value },
              })
            }
          >
            <MenuItem value={""}>Nenhum</MenuItem>
            {services.map((service) => (
              <MenuItem key={service.id} value={"/services/" + service.id}>
                {service.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Descreva seu serviço"
          fullWidth
          multiline
          variant="outlined"
          color="primary"
          rows={3}
          inputProps={{ maxLength: 250 }}
          value={values.advertisings.description}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) =>
            setValues({
              ...values,
              advertisings: {
                ...values.advertisings,
                description: e.target.value,
              },
            })
          }
        />
      </div>
      <Button
        disabled={loading}
        size="large"
        variant="contained"
        color="primary"
        sx={{ margin: "2em auto", width: "75%" }}
        onClick={() => submitValues(user._id, values, setLoading, history)}
      >
        {loading ? <Spinner size="2em" /> : "SALVAR ALTERAÇÕES!"}
      </Button>
    </div>
  );
};

export default WorkingSettings;
