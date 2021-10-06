import React from "react";
import "./Home.css";

import Advertisings from "../Advertisings/Advertisings";
import { Button, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();

  return (
    <div className="home-container">
      <div className="advertisings">
        <Typography
          color="primary"
          variant="h5"
          marginBottom="0.75em"
          align="center"
        >
          SERVIÇOS EM DESTAQUE
        </Typography>
        <Advertisings />
      </div>
      <Button
        size="large"
        color="primary"
        variant="contained"
        style={{ margin: "3em auto" }}
        onClick={() => history.push("/services")}
      >
        Ir para serviços
        <NavigateNextIcon />
      </Button>
    </div>
  );
};

export default Home;
