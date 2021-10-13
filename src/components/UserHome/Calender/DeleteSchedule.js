import axios from "axios";

export default async function deleteSchedule(
  selected,
  userData,
  history,
  setLoading
) {
  const confirm = window.confirm("Você tem certeza?");

  if (!confirm) {
    return;
  }

  setLoading(true);
  const newProfessionalData = {};
  const newClientData = {};

  let professionalID;
  let clientID;
  userData.schedule.find((elem) => {
    if (elem.date === selected[0]) {
      professionalID = elem.professionalID;
      clientID = elem.clientID;
      return true;
    }
    return false;
  });

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
      newProfessionalData.schedule.splice(index, 1);
      return true;
    }
    return false;
  });

  newClientData.schedule.find((meeting, index) => {
    if (meeting.date === selected[0]) {
      newClientData.schedule.splice(index, 1);
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
}
