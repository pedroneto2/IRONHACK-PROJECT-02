import React from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { useState } from "react";
import { Button } from "@mui/material";
import "./FormUpdateProfile.css";

const defaultPhoto =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXMzMz////JycnNzc3n5+f39/fy8vL8/Pzp6enU1NTs7Oz5+fnQ0NDZ2dnf39/09PTgONpwAAAE/ElEQVR4nO2cCZaDIBBEI64o6v1vOzoZJ+ISFZpQSeofII8KvQvcboQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEK2UQ9iL0UcpdJUt11WFyN11rU6TT9Hp1Kmq/oysSn7qjOfIFLd2qxJ9miy9vbeIpXO+l15d/pMv7FGXe1v32wjKx17oW4oXS19b4+yesN9VGl2Vt+vxix9N43dGfu0bLWLveRLmPqivpHaxF72eXTuIDBJ8neJOKq94oFzyvY9nDFz1DeSxV78GSoPgUlSxV7+IamfwEFiGlvCAb4C0XdR+fjgRAYcblQnIDBJOlyJrYjAJGljC9nDuObBJSVqdeNSqm1Tx5ayiUiUmYB0RX21m3hGg1iiytnoSBFbzhqpODoBF0+VW8O0T47miTK5fg5Yz59Kb+GwiVgluLQXjmB5YhFAIVQ41QEEJglQThQtZx4gtVHycWYkjy3rQRgjBYo1gYwUyUyPvqC50scWNpEGEpgkKEk/RLq/g+KI8jXpBEhtqmQ7wzk1SKgJUbLdQSncwuT7EZScLzVEXFPGlvZHMIFJElvaH1RIhVQYHyqkQnyFn5/xJT862aBUbR9feX9B9xRqEIVzCOzzpxjh0kVsYf98/DTxCybCoRwRxg1D5fwmtqwHX/B17eO/kH7BV26hg6U2YGfbApw2iS1pwcefGJJPGECp4o64J4J54YhscQpTks7QkuOaEioXTkgWNiitr00ql/YLlCMKC8TsFNNGb+PFQyGFuNcQhXoMpJ5ihcRgEfM6yYRAtEGNMhPeEiEFKj1flZ+hWiaK8gqBrsv5urzuyVp3ZHVTI6SN9tcsrfDXOd9WtzomM/acReR5m9JTvT1vBVwv5C+u4/95dB/xVRClZ2Fl/l8rp3hTWG6nHj9RxNJoO1xpm5P3yx/Wj8e5wt4uRjONZWPKXAs4lbH3aVEd5RHccV2gLdxItedNtVhWouu/58X9lNp+vWQxeTircaVvM6fmr/TG3aHM6o8+filq/UqUMjsDkReObvZbiNosV2G6qtlLHmVTdeuL6UsHf/IHhuJZXdZvVCGmzYr1qvMia7fu3T+rF17TdqgD59qa5CpldDfIvC++HMR1evPBvaNMWrzAUI9vi+4laKWOn4Y8LPjC3yzdiwJzysxtGVaNtEcf+EWJk+WYS4IeaoRT5WzYBvLIB2fruDhNUumTByQXPx3QFy+d78q7889aKnPlhb5wZ8GujtKaTJ8RqUxbXGu3Qg3jHMahZdHpp26jhmRZXf+6Gmig6vZ4SbmT2EdS3VW5S7cc5umT81FmvaC+7rQ26X9KvKVGt/8VgAMhoo33PHuoZOoq+6WqC99PxgFcMdR9bVfk7TTU+UNXpD8SBzkw44dwtyj2UJkcsk+eKf/nEOWpJDdR9BSCFJJfigPeN/BBsD5FyxQTYpsIuoWCmxju3QtfhJrhYEfx/ZGq3cK9KOCL0BnUcJd+/BH5YAMbZ0ZEYo0Jd4HSn0aidEM2UhEzhTZSGTNFNlKR4+CoFduEd+UG2PraeDfC4G4o4IgK2w0HR/RViFt1T/hW39jZcMQzI8IHGu9QA9w5TXh2UPCh1D+Yoo261/gOv9GThX/dhjgotfF9pSf2+k9AhVSIDxVSIT5USIX4UCEV4kOFVIgPFVIhPlRIhfhQIRXiQ4VUiA8VUiE+VEiF+FAhFeJDhVSIz9cr/AF79V2yoD2oxQAAAABJRU5ErkJggg==";
const handleChange = (e, updateProfile, setUpdateProfile) => {
  const { name, value } = e.target;
  setUpdateProfile({ ...updateProfile, [name]: value });
};

function FormUpdateProfile(props) {
  const [updateProfile, setUpdateProfile] = useState({
    name: "",
    age: "",
    job: "",
    photo: "",
  });

  function updateData() {
    Object.keys(updateProfile).map(
      (key) => updateProfile[key] == "" && delete updateProfile[key]
    );
    console.log(updateProfile);
    props.setData(updateProfile);
  }

  function defaultPhotofunction() {
    props.setData({ photo: defaultPhoto });
  }

  if (props.show) {
    return (
      <div className="form-update">
        <Container>
          <TextField
            sx={{ marginTop: "10px" }}
            fullWidth
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

          <TextField
            fullWidth
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

          <TextField
            sx={{ marginTop: "10px" }}
            fullWidth
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

          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              sx={{ marginTop: "10px" }}
              fullWidth
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
            <Button onClick={defaultPhotofunction}>REmover foto</Button>
          </div>

          <Button
            variant="outlined"
            sx={{ marginTop: "1em" }}
            onClick={updateData}
          >
            Salvar
          </Button>
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default FormUpdateProfile;
