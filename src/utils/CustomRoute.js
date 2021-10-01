import { useContext } from "react";
import { Route, useHistory } from "react-router";

import AuthContext from "../store/contexts/AuthContext";

import LoadingPage from "../components/LoadingPage/LoadingPage";

const CustomRoute = ({ privateType, path, ...restProps }) => {
  const { authentication, loading } = useContext(AuthContext);

  const history = useHistory();

  if (loading) {
    return <LoadingPage />;
  }

  if (authentication != privateType) {
    return history.push("/");
  }

  if (authentication && (path === "/login" || path === "/register")) {
    return history.push("/");
  }

  return <Route {...restProps} />;
};

export default CustomRoute;
