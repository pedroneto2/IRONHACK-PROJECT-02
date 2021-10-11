import React from "react";
import "./Home.css";

import Advertisings from "../Advertisings/Advertisings";
import { Button, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import WomanIcon from "../../images/woman-icon.png";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="content-container">
          <div className="text-container">
            <h2>CUIDE</h2>
            <h2>-SE</h2>
            <div className="text-background"></div>
          </div>
          <div className="icons-container">
            <img src={WomanIcon} alt="lying down woman" />
          </div>
          <div className="comment-container">
            <h3>SUA PLATAFORMA DE BELEZA</h3>
          </div>
        </div>
      </div>
      <div className="advertisings">
        <Typography
          color="primary"
          variant="h5"
          marginBottom="0.75em"
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          PROCEDIMENTOS EM DESTAQUE
        </Typography>
        <Advertisings />
      </div>
      <Link
        to="/procedimentos"
        style={{ textDecoration: "none", margin: "auto" }}
      >
        <Button
          size="large"
          color="primary"
          variant="contained"
          style={{ margin: "2em auto" }}
        >
          Todos os procedimentos
          <NavigateNextIcon />
        </Button>
      </Link>
      <footer className="footer-container">
        <div className="info-container">
          <p>Razão Social: Empresa de Estética S.A.</p>
          <p>CNPJ: 39.105.345/0001-10</p>
          <p>Endereço: Rua dos alfineiras, 4 - Hogwarts-RO - 12345-876</p>
        </div>
        <div className="social-media-container">
          <Link to="#" style={{ color: "white" }}>
            <FacebookIcon sx={{ fontSize: "3em" }} />
          </Link>
          <Link to="#" style={{ color: "white" }}>
            <InstagramIcon sx={{ fontSize: "3em" }} />
          </Link>
          <Link to="#" style={{ color: "white" }}>
            <TwitterIcon sx={{ fontSize: "3em" }} />
          </Link>
        </div>
        <div className="copyright-container">
          <p>Copyright © 2021-2021 Venere - Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
