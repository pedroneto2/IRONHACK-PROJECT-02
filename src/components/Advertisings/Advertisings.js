import axios from "axios";
import { useEffect, useState } from "react";
import "./Advertisings.css";

import useMediaQuery from "@mui/material/useMediaQuery";

import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";

const retrieveAdvertisings = (
  setAdvertisings,
  setLoading,
  setRenderedAds,
  qtyRendered
) => {
  const advertisings = [];
  axios
    .get("https://ironrest.herokuapp.com/venere")
    .then((response) => {
      response.data.forEach(
        (user) =>
          user.advertisings &&
          user.advertisings.img &&
          advertisings.push({
            img: user.advertisings.img,
            user: user.name,
            email: user.email,
            description: user.advertisings.description,
            link: user.advertisings.link,
          })
      );
      advertisings.sort(() => (Math.random() > 0.5 ? 1 : -1)); // shuffle ads is fairer
      let rotatedAds = advertisings.slice(0, qtyRendered);
      setAdvertisings([...advertisings]);
      setRenderedAds([...rotatedAds]);
      setLoading(false);
    })
    .catch((error) => console.log(error));
};

const rotatesAds = (
  setRenderedAds,
  setIntervalID,
  setAdvertisings,
  advertisings,
  qtyRendered
) => {
  let rotatedAds = advertisings.slice(0, qtyRendered);
  setRenderedAds([...rotatedAds]);
  const intervalID = setInterval(() => {
    const lastQueuedAd = advertisings.shift();
    lastQueuedAd && advertisings.push(lastQueuedAd);
    setAdvertisings([...advertisings]);
    rotatedAds = advertisings.slice(0, qtyRendered);
    setRenderedAds([...rotatedAds]);
  }, 5000);
  setIntervalID(intervalID);
};

const retrieveQntyRendered = (matchesSM, matchesMD, matchesLG, matchesXL) => {
  let qty;
  switch (true) {
    case matchesXL:
      qty = 5;
      break;
    case matchesLG:
      qty = 4;
      break;
    case matchesMD:
      qty = 3;
      break;
    case matchesSM:
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

  const [advertisings, setAdvertisings] = useState([]);
  const [intervalID, setIntervalID] = useState(null);

  const matchesSM = useMediaQuery("(min-width:720px)");
  const matchesMD = useMediaQuery("(min-width:1080px)");
  const matchesLG = useMediaQuery("(min-width:1440px)");
  const matchesXL = useMediaQuery("(min-width:1800px)");

  const [qtyRendered, setQtyRendered] = useState(retrieveQntyRendered());

  useEffect(() => {
    const qty = retrieveQntyRendered(
      matchesSM,
      matchesMD,
      matchesLG,
      matchesXL
    );
    setQtyRendered(qty);
  }, [matchesSM, matchesMD, matchesLG, matchesXL]);

  useEffect(() => {
    retrieveAdvertisings(
      setAdvertisings,
      setLoading,
      setRenderedAds,
      qtyRendered
    );
    return () => {
      clearInterval(intervalID);
      setIntervalID(null);
    };
  }, []);

  useEffect(() => {
    intervalID && clearInterval(intervalID);
    rotatesAds(
      setRenderedAds,
      setIntervalID,
      setAdvertisings,
      advertisings,
      qtyRendered
    );
  }, [qtyRendered, advertisings]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="advertising-container">
      {renderedAds.map((ad) => (
        <Link
          key={ad.email}
          to={ad.link ? ad.link : "#"}
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
