import axios from "axios";

const findSelected = (userData, selected) => {
  if (selected) {
    return userData.schedule.find((elem) => elem.date === selected);
  }
};

export default function deleteSchedule(
  userId,
  selected,
  setSchedulesRows,
  dataToUpdate,
  setDataToUpdate,
  setSelected
) {
  const scheduleChange = dataToUpdate.schedule.filter((schedule) => {
    return String(schedule.date) !== String(selected);
  });
  if (scheduleChange) {
    delete dataToUpdate["_id"];

    const renderUpdate = findSelected(dataToUpdate, selected[0]);

    const newData = { ...dataToUpdate, schedule: [...scheduleChange] };
    axios
      .put(
        `https://ironrest.herokuapp.com/venere/${renderUpdate.professionalID}`,
        newData
      )
      .then(() => {
        axios
          .put(
            `https://ironrest.herokuapp.com/venere/${renderUpdate.clientID}`,
            newData
          )
          .then(() => {
            axios
              .get(`https://ironrest.herokuapp.com/venere/${userId}`)
              .then(() => {
                setSchedulesRows(scheduleChange);
                setDataToUpdate(newData);
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.error(err));
  }

  setSelected([]);
}
