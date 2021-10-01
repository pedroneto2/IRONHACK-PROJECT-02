import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const fakeValidateToken = async () => {
  const token = localStorage.getItem("token");
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
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleLogin = async (userType) => {
    setLoading(true);
    const token = await fakeRetrieveToken(userType);
    localStorage.setItem("token", token);
    setAuthentication(token);
    setLoading(false);
    history.goBack();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthentication("");
    history.push("/");
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const validated = await fakeValidateToken();
      setAuthentication(validated);
      setLoading(false);
    })();
  }, []);

  return { authentication, loading, handleLogin, handleLogout };
};

export default useAuth;
