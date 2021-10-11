import axios from "axios";

export default function deleteSchedule(
  userId,
  selected,
  scheduleRows,
  setSchedulesRows,
  dataToUpdate,
  setDataToUpdate,
  setSelected,
  history
) {
  const scheduleChange = dataToUpdate.schedule.filter((schedule) => {
    return String(schedule.date) !== String(selected);
  });
  if (scheduleChange) {
    delete dataToUpdate["_id"];

    const newData = { ...dataToUpdate, schedule: [...scheduleChange] };

    axios
      .put(`https://ironrest.herokuapp.com/venere/${userId}`, newData)
      .then(() => {
        axios
          .get(`https://ironrest.herokuapp.com/venere/${userId}`)
          .then(() => {
            setSchedulesRows(scheduleChange);
            setDataToUpdate(newData);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  setSelected([]);
}
