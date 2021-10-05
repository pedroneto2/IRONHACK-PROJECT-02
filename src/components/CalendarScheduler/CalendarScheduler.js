import React, { useEffect, useState } from "react";
import "./CalendarScheduler.css";

import axios from "axios";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import Spinner from "../Spinner/Spinner";

const retrieveUsers = (
  clientID,
  professionalID,
  setClientUser,
  setProfessionalUser,
  setMaxDate,
  setLoading
) => {
  axios
    .get("https://ironrest.herokuapp.com/venere/" + clientID)
    .then((response) => {
      const { schedule } = response.data;
      setClientUser({ schedule });
    })
    .catch((err) => {
      console.log(err);
    });

  axios
    .get("https://ironrest.herokuapp.com/venere/" + professionalID)
    .then((response) => {
      const {
        maxDays,
        notWorkingDays,
        weekNotWorkingDays,
        dayNotWorkingHours,
        schedule,
      } = response.data;
      setProfessionalUser({
        maxDays,
        notWorkingDays,
        weekNotWorkingDays,
        dayNotWorkingHours,
        schedule,
      });
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + maxDays);
      setMaxDate(maxDate);
      setLoading(false);
    })
    .catch((err) => console.log(err));
};

const retrieveDisabledHours = (
  currentDate,
  setDisabledHours,
  clientSchedule,
  professionalSchedule,
  disabledDays,
  setDisabledDays
) => {
  const allDisabledHours = [];
  const allDisabledDateHours = [...clientSchedule, ...professionalSchedule];
  allDisabledDateHours.forEach((date) => {
    if (new Date(date.date).getDate() === currentDate.getDate()) {
      const disabledHour = new Date(date.date).getHours();
      for (let i = 0; i < date.duration; i++) {
        allDisabledHours.push(disabledHour + i);
      }
    }
    !allDisabledHours.some((hour) => hour <= 24) &&
      setDisabledDays([...disabledDays, date]);
  });
  setDisabledHours([...allDisabledHours]);
};

const CalendarSecheduler = ({ value, setValue, clientID, professionalID }) => {
  const [loading, setLoading] = useState(true);

  const [maxDate, setMaxDate] = useState();
  const [disabledDays, setDisabledDays] = useState([]);
  const [disabledHours, setDisabledHours] = useState([]);

  const [clientUser, setClientUser] = useState({
    schedule: [],
  });
  const [professionalUser, setProfessionalUser] = useState({
    maxDays: 0,
    notWorkingDays: [],
    weekNotWorkingDays: [],
    dayNotWorkingHours: [],
    schedule: [],
  });

  useEffect(() => {
    retrieveUsers(
      clientID,
      professionalID,
      setClientUser,
      setProfessionalUser,
      setMaxDate,
      setLoading
    );
  }, []);

  useEffect(() => {
    retrieveDisabledHours(
      value,
      setDisabledHours,
      clientUser.schedule,
      professionalUser.schedule,
      disabledDays,
      setDisabledDays
    );
  }, [value]);

  return (
    <div className="calendar-scheduler-container">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => (
            <TextField
              {...props}
              inputProps={{
                ...props.inputProps,
                readOnly: true,
              }}
            />
          )}
          showToolbar={false}
          ampm={false}
          loading={loading}
          renderLoading={() => <Spinner />}
          disableHighlightToday
          views={["day", "hours"]}
          label="DateTimePicker"
          value={value}
          minDate={new Date()}
          maxDate={maxDate}
          shouldDisableTime={(hour) =>
            disabledHours.some((disabledHour) => disabledHour === hour) ||
            professionalUser.dayNotWorkingHours.some(
              (disabledHour) => disabledHour === hour
            )
          }
          shouldDisableDate={(date) =>
            disabledDays.some(
              (disabledDay) =>
                new Date(disabledDay.date).getDate() === date.getDate()
            ) ||
            professionalUser.weekNotWorkingDays.some(
              (disabledWeekDay) => disabledWeekDay === date.getDay()
            ) ||
            professionalUser.notWorkingDays.some(
              (notWorkingDay) =>
                new Date(notWorkingDay).getDate() === date.getDate()
            )
          }
          onChange={(newValue) => {
            newValue.setMinutes(0);
            setValue(newValue);
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CalendarSecheduler;
