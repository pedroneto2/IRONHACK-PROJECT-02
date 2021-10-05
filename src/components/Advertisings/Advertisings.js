import axios from "axios";
import { useEffect, useState } from "react";
import "./Advertisings.css";

import useMediaQuery from "@mui/material/useMediaQuery";

import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";

let advertisings = [];
let intervalID;

const retrieveAdvertisings = (setLoading, setRenderedAds, qtyRendered) => {
  axios
    .get("https://ironrest.herokuapp.com/venere")
    .then((response) => {
      response.data.forEach(
        (user) =>
          user.advertisings &&
          advertisings.push({
            img: user.advertisings.img,
            user: user.name,
            email: user.email,
            description: user.advertisings.description,
          })
      );
      advertisings.sort(() => (Math.random() > 0.5 ? 1 : -1)); // shuffle ads is fairer
      let rotatedAds = advertisings.slice(0, qtyRendered);
      setRenderedAds([...rotatedAds]);
      setLoading(false);
    })
    .catch((error) => console.log(error));
};

const rotatesAds = (setRenderedAds, qtyRendered) => {
  let rotatedAds = advertisings.slice(0, qtyRendered);
  setRenderedAds([...rotatedAds]);
  intervalID = setInterval(() => {
    advertisings.push(advertisings.shift());
    rotatedAds = advertisings.slice(0, qtyRendered);
    setRenderedAds([...rotatedAds]);
  }, 5000);
};

const retrieveQntyRendered = () => {
  let qty;
  const width = window.innerWidth;
  switch (true) {
    case width > 1800:
      qty = 5;
      break;
    case width > 1440:
      qty = 4;
      break;
    case width > 1080:
      qty = 3;
      break;
    case width > 720:
      qty = 2;
      break;
    default:
      qty = 1;
      break;
  }
  return qty;
};

const Advertisings = () => {
  const [loading, setLoading] = useState(true);
  const [renderedAds, setRenderedAds] = useState([]);

  const matchesSM = useMediaQuery("(min-width:720px)");
  const matchesMD = useMediaQuery("(min-width:1080px)");
  const matchesLG = useMediaQuery("(min-width:1440px)");
  const matchesXL = useMediaQuery("(min-width:1800px)");

  const [qtyRendered, setQtyRendered] = useState(retrieveQntyRendered());

  useEffect(() => {
    const qty = retrieveQntyRendered();
    setQtyRendered(qty);
  }, [matchesSM, matchesMD, matchesLG, matchesXL]);

  useEffect(() => {
    retrieveAdvertisings(setLoading, setRenderedAds, qtyRendered);
    return () => (advertisings = []);
  }, []);

  useEffect(() => {
    //intervalID && clearInterval(intervalID);
    rotatesAds(setRenderedAds, qtyRendered);
    return () => {
      clearInterval(intervalID);
    };
  }, [qtyRendered]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="advertising-container">
      {renderedAds.map((ad) => (
        <Link
          key={ad.email}
          to="#"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="ad-container">
            <img src={ad.img} alt="advertising" />
            <h3>
              <strong>Profissional:</strong> {ad.user}
            </h3>
            <p>
              <strong>Email:</strong> {ad.email}
            </p>
            <p>{ad.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Advertisings;