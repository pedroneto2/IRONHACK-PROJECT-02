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
    console.log("aqui esta o erro 0 ---->", scheduleChange);
    console.log("aqui esta o erro 1 ---->", dataToUpdate);
    console.log("aqui esta o erro 2 ---->", newData);
    axios
      .put(`https://ironrest.herokuapp.com/venere/${userId}`, newData)
      .then((response) => {
        console.log("response do put --->", response);
        axios
          .get(`https://ironrest.herokuapp.com/venere/${userId}`)
          .then((response) => {
            console.log("response do get ", response);
            setSchedulesRows(scheduleChange);
            setDataToUpdate(newData);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  setSelected([]);
}
