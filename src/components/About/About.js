import { Typography } from "@mui/material";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <Typography color="white" variant="h4" align="center" marginBottom="1em">
        O QUE É A VENERE?
      </Typography>
      <Typography color="white" variant="h5" align="justify" marginBottom="1em">
        A Venere é uma plataforma de serviços onde você pode tanto oferecer
        quanto consumir qualquer tipo de serviço.
      </Typography>
      <Typography color="white" variant="h5" align="justify">
        Para isso, a Venere conta com um sistema de agendamento dinâmico que não
        permite o encontro de horários.
      </Typography>
    </div>
  );
};

export default About;
