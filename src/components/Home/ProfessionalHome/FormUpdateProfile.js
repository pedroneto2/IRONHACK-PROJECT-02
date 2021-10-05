import React from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

import "./FormUpdateProfile.css";

const handleChange = (e, updateProfile, setUpdateProfile) => {
  const { name, value } = e.target;
  setUpdateProfile({ ...updateProfile, [name]: value });
};

function FormUpdateProfile(props) {
  const [updateProfile, setUpdateProfile] = useState({
    name: "",
    age: null,
    job: "",
    photo: "",
  });

  function updateDados() {
    console.log("cliquei para salvar --->");
    console.log(props.setdata(updateProfile));
    props.setdata(updateProfile);
  }

  if (props.show) {
    return (
      <div className="form-update">
        <Container maxWidth="sl">
          <TextField
            sx={{ marginTop: "10px" }}
            name="name"
            label="Nome"
            variant="outlined"
            type="text"
            value={updateProfile.name}
            onChange={(e) => handleChange(e, updateProfile, setUpdateProfile)}
            //   onBlur={(e) =>
            //     handleError(e, credentials, error, setError, errorMsg, setErrorMsg)
            //   }
            //   onFocus={(e) =>
            //     handleFocus(e, error, setError, errorMsg, setErrorMsg)
            //   }
            //   error={error.lastName}
            //   helperText={errorMsg.lastName}
          />
          <br />
          <TextField
            sx={{ marginTop: "10px" }}
            name="age"
            label="Idade"
            variant="outlined"
            type="number"
            value={updateProfile.age}
            onChange={(e) => handleChange(e, updateProfile, setUpdateProfile)}
            //   onBlur={(e) =>
            //     handleError(e, credentials, error, setError, errorMsg, setErrorMsg)
            //   }
            //   onFocus={(e) =>
            //     handleFocus(e, error, setError, errorMsg, setErrorMsg)
            //   }
            //   error={error.lastName}
            //   helperText={errorMsg.lastName}
          />
          <br />
          <TextField
            sx={{ marginTop: "10px" }}
            name="job"
            label="Profssão"
            variant="outlined"
            type="text"
            value={updateProfile.job}
            onChange={(e) => handleChange(e, updateProfile, setUpdateProfile)}
            //   onBlur={(e) =>
            //     handleError(e, credentials, error, setError, errorMsg, setErrorMsg)
            //   }
            //   onFocus={(e) =>
            //     handleFocus(e, error, setError, errorMsg, setErrorMsg)
            //   }
            //   error={error.lastName}
            //   helperText={errorMsg.lastName}
          />
          <br />
          <TextField
            sx={{ marginTop: "10px" }}
            name="photo"
            label="Url Foto"
            variant="outlined"
            type="text"
            value={updateProfile.photo}
            onChange={(e) => handleChange(e, updateProfile, setUpdateProfile)}
            //   onBlur={(e) =>
            //     handleError(e, credentials, error, setError, errorMsg, setErrorMsg)
            //   }
            //   onFocus={(e) =>
            //     handleFocus(e, error, setError, errorMsg, setErrorMsg)
            //   }
            //   error={error.lastName}
            //   helperText={errorMsg.lastName}
          />
          <br />
          <Button
            variant="outlined"
            sx={{ marginTop: "1em" }}
            onClick={updateDados}
          >
            Salvar
          </Button>
        </Container>
        {console.log(updateProfile)}
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default FormUpdateProfile;
