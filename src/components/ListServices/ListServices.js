import "./ListServices.css";
import { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button, Divider, Paper } from "@mui/material";

import Spinner from "../Spinner/Spinner";

import { Link } from "react-router-dom";

import axios from "axios";

const retrieveServices = (setServices, setLoading) => {
  axios
    .get("https://ironrest.herokuapp.com/venere/")
    .then((response) => {
      const services = [];
      response.data.forEach((user) => {
        user.services &&
          user.services.forEach((service) => {
            const newService = {};
            newService.id = service.id;
            newService.user = user.name;
            newService.email = user.email;
            newService.name = service.name;
            newService.price = service.price;
            newService.duration = service.duration;
            newService.category = service.category;
            services.push(newService);
          });
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
        PROCEDIMENTOS
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
              <Paper
                key={service.id}
                elevation={4}
                style={{
                  padding: "1em",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "3em",
                }}
              >
                <div className="service-name-button-container">
                  <Typography color="primary" variant="h5">
                    {service.name}
                  </Typography>
                  <Link
                    to={"/procedimentos/" + service.id}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{ fontSize: "0.6em", padding: 0 }}
                    >
                      Detalhes
                    </Button>
                  </Link>
                </div>
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
                  {`${service.duration} hora${service.duration > 1 ? "s" : ""}`}
                </Typography>
                <Typography color="black" variant="p">
                  <strong>Preço:</strong>{" "}
                  {Number(service.price).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Typography>
              </Paper>
            )
          );
        })}
      </div>
    </div>
  );
};

export default ListServices;
