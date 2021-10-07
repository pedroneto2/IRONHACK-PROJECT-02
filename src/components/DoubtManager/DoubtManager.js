import "./DoubtManager.css";

import Typography from "@mui/material/Typography";
import { Paper, Button, Divider } from "@mui/material";

import AuthContext from "../../store/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

import Spinner from "../Spinner/Spinner";
import LoadingPage from "../LoadingPage/LoadingPage";

import axios from "axios";

const retrieveData = async (setDoubts, setBtnLoading, userID) => {
  await axios
    .get("https://ironrest.herokuapp.com/venere/" + userID)
    .then((response) => {
      const doubts = response.data.doubts || [];
      setDoubts([...doubts.reverse()]);
      setBtnLoading(false);
    })
    .catch((error) => {
      setBtnLoading(false);
      console.log(error);
    });
};

const handleDelete = (setDoubts, setBtnLoading, doubts, index, userID) => {
  const confirm = window.confirm("Tem certeza?");
  if (!confirm) {
    return;
  }
  setBtnLoading(true);
  doubts.splice(index, 1);
  axios
    .put("https://ironrest.herokuapp.com/venere/" + userID, {
      doubts: [...doubts],
    })
    .then((response) => {
      retrieveData(setDoubts, setBtnLoading, userID);
    })
    .catch((error) => {
      setBtnLoading(false);
      console.log(error);
    });
};

const DoubtManager = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [doubts, setDoubts] = useState([]);

  useEffect(() => {
    (async () => {
      await retrieveData(setDoubts, setBtnLoading, user._id);
      setLoading(false);
    })();
  }, []);

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="doubt-manager-container">
      <Typography
        variant="h4"
        color="primary"
        align="center"
        sx={{ margin: "1em auto" }}
      >
        GERENCIADOR DE DÚVIDAS
      </Typography>
      {doubts.length > 0
        ? doubts.map((doubt, index) => (
            <Paper
              key={doubt.email + index}
              elevation={3}
              sx={{
                padding: "1em",
                margin: "1em",
                width: "75%",
                minWidth: "300px",
              }}
              align="center"
            >
              <Typography variant="h6" color="primary" align="left">
                Name: {doubt.name}
              </Typography>
              <Typography variant="h6" color="primary" align="left">
                Email: {doubt.email}
              </Typography>
              <Divider />
              <Typography
                variant="h6"
                color="primary"
                align="left"
                sx={{ marginTop: "0.5em", marginLeft: "1em" }}
              >
                Dúvida:
              </Typography>
              <div className="text-container">
                <Typography variant="p">{doubt.doubt}</Typography>
              </div>
              <Divider />
              <Button
                disabled={btnLoading}
                onClick={() =>
                  handleDelete(
                    setDoubts,
                    setBtnLoading,
                    doubts,
                    index,
                    user._id
                  )
                }
                variant="outlined"
                color="primary"
                sx={{ margin: "1em", width: "200px" }}
              >
                {btnLoading ? <Spinner size="2em" /> : "Deletar esta dúvida"}
              </Button>
            </Paper>
          ))
        : "Nenhuma dúvida registrada!"}
    </div>
  );
};

export default DoubtManager;
