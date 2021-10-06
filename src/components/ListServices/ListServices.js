import "./ListServices.css";
import { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Divider, Paper } from "@mui/material";

import Spinner from "../Spinner/Spinner";

import { Link } from "react-router-dom";

import axios from "axios";

//PASSAR A FUNÇAO ABAIXO PARA O CADASTRO DOS SERVIÇOS
const createServiceID = (userCPF, serviceName) => {
  const servicePart = serviceName.split(" ").join("-").toLowerCase();
  const cpfArray = userCPF.match(/[0-9]/g);
  cpfArray.forEach((number, index) => {
    cpfArray[index] = String.fromCharCode(+number + 97);
  });
  const cpfPart = cpfArray.join("");
  return servicePart + "-" + cpfPart.slice(0, -2);
};
//PASSAR A FUNÇAO ACIMA PARA O CADSASTRO DOS SERVIÇOS

const retrieveServices = (setServices, setLoading) => {
  axios
    .get("https://ironrest.herokuapp.com/venere/")
    .then((response) => {
      const services = [];
      response.data.forEach((user) => {
        const newService = {};
        user.services.forEach((service) => {
          newService.id = createServiceID(user.cpf, service.name);
          newService.user = user.name;
          newService.email = user.email;
          newService.name = service.name;
          newService.price = service.price;
          newService.duration = service.duration;
          newService.category = service.category;
        });
        services.push(newService);
      });
      setServices(services);
      setLoading(false);
    })
    .catch((error) => console.log(error));
};

const ListServices = () => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    retrieveServices(setServices, setLoading);
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className="list-services-container">
      <Typography color="primary" variant="h4" align="center">
        Serviços
      </Typography>
      <div className="services-search-container">
        <TextField
          label="Search"
          variant="outlined"
          color="primary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ marginBottom: "2em" }}
        />
      </div>
      <div className="services-container">
        {services.map((service) => {
          const regex = new RegExp(search, "gi");

          return (
            Object.values(service).some((value) => regex.test(value)) && (
              <Link
                key={service.id}
                to={"/services/" + service.id}
                style={{ textDecoration: "none" }}
              >
                <Paper
                  elevation={4}
                  style={{
                    padding: "1em",
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "3em",
                  }}
                >
                  <Typography color="primary" variant="h5">
                    {service.name}
                  </Typography>
                  <Divider sx={{ margin: "0.5em 0" }} />
                  <Typography color="black" variant="p">
                    <strong>Profissional:</strong> {service.user}
                  </Typography>
                  <Typography color="black" variant="p">
                    <strong>Email:</strong> {service.email}
                  </Typography>
                  <Typography color="black" variant="p">
                    <strong>Categoria:</strong> {service.category}
                  </Typography>
                  <Typography color="black" variant="p">
                    <strong>Duração:</strong>{" "}
                    {`${service.duration} hora${
                      service.duration > 1 ? "s" : ""
                    }`}
                  </Typography>
                  <Typography color="black" variant="p">
                    <strong>Preço:</strong>{" "}
                    {service.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Typography>
                </Paper>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
};

export default ListServices;
