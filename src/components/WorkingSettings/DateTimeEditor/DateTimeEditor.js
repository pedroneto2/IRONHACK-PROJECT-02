import "./DateTimeEditor.css";
import { useState } from "react";

import Typography from "@mui/material/Typography";
import { TextField, Paper, Button } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import brLocale from "date-fns/locale/pt-BR";

const addSingleValue = (
  singleValue,
  setValues,
  values,
  editedArray,
  hourPicker
) => {
  const repeatedValue = values[editedArray].some((value) =>
    hourPicker
      ? value === new Date(singleValue).getHours()
      : new Date(value).getDate() === new Date(singleValue).getDate() &&
        new Date(value).getMonth() === new Date(singleValue).getMonth() &&
        new Date(value).getFullYear() === new Date(singleValue).getFullYear()
  );
  if (repeatedValue) {
    return window.alert(
      hourPicker
        ? "Esta hora já está adicionada!"
        : "Este dia já está adicionado!"
    );
  }
  const newValues = values[editedArray];
  newValues.push(singleValue.getHours());
  setValues({ ...values, singleValues: [...newValues] });
};

const removeSingleValue = (index, setValues, values, editedArray) => {
  const newValues = values[editedArray];
  newValues.splice(index, 1);
  setValues({ ...values, newValues });
};

const DateTimeEditor = ({
  titleText,
  labelText,
  btnText,
  editedArray,
  values,
  setValues,
  DateTimePicker,
  hourPicker,
}) => {
  const [singleValue, setSingleValue] = useState(new Date());

  return (
    <Paper elevation={2} sx={{ padding: "1em", margin: "1em" }} align="center">
      <Typography variant="h7" color="primary">
        {titleText}
      </Typography>
      <div className="values-container">
        {values[editedArray].map((singleValue, index) => {
          const date = new Date(singleValue);
          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();
          return (
            <div className="single-value" key={singleValue}>
              {hourPicker
                ? `${singleValue} horas`
                : `${day}/${month + 1}/${year}`}
              <button
                className="single-value-button"
                onClick={() =>
                  removeSingleValue(index, setValues, values, editedArray)
                }
              >
                {" "}
                - remover
              </button>
            </div>
          );
        })}
      </div>
      <div className="single-value-button-input-container">
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
          <DateTimePicker
            views={hourPicker ? ["hours"] : ["day"]}
            value={singleValue}
            onChange={(newValue) => {
              hourPicker && newValue.setMinutes(0);
              setSingleValue(newValue);
            }}
            label={labelText}
            renderInput={(params) => (
              <TextField {...params} size="small" sx={{ margin: "1em auto" }} />
            )}
          />
        </LocalizationProvider>
        <Button
          onClick={() =>
            addSingleValue(
              singleValue,
              setValues,
              values,
              editedArray,
              hourPicker
            )
          }
          variant="outlined"
          sx={{ padding: "7px 5px", margin: "auto" }}
        >
          {btnText}
        </Button>
      </div>
    </Paper>
  );
};

export default DateTimeEditor;
