import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

const retrieveUserData = async (userID, setUser) => {
  const { data } = await axios.get(
    "https://ironrest.herokuapp.com/venere/" + userID
  );
  setUser({ ...data });
};

const fakeValidateToken = async (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(token);
    }, 1000);
  });
};

const fakeRetrieveToken = (userType) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userType);
    }, 1000);
  });
};

const useAuth = () => {
  const [authentication, setAuthentication] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const handleLogin = async (userType, userID) => {
    setLoading(true);
    const token = await fakeRetrieveToken(userType);
    localStorage.setItem("token", token);
    localStorage.setItem("userID", userID);
    await retrieveUserData(userID, setUser);
    setAuthentication(token);
    setLoading(false);
    history.goBack();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    setUser({});
    setAuthentication("");
    history.push("/");
  };

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      const userID = localStorage.getItem("userID");
      if (token && userID) {
        const validated = await fakeValidateToken(token);
        await retrieveUserData(userID, setUser);
        setAuthentication(validated);
      }
      setLoading(false);
    })();
  }, []);

  return { authentication, loading, user, handleLogin, handleLogout };
};

export default useAuth;
