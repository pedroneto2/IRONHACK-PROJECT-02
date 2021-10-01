import { useContext } from "react";
import { Route, Redirect } from "react-router";

import AuthContext from "../store/contexts/AuthContext";

import LoadingPage from "../components/LoadingPage/LoadingPage";

const CustomRoute = ({ privateType, path, ...restProps }) => {
  const { authentication, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingPage />;
  }

  if (privateType && authentication !== privateType) {
    return <Redirect to="/" />;
  }

  if (authentication && (path === "/login" || path === "/register")) {
    return <Redirect to="/" />;
  }

  return <Route {...restProps} />;
};

export default CustomRoute;
