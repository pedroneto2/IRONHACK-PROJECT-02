import { useState } from "react";

import AuthContext from "../contexts/AuthContext";
import useAuth from "./useAuth";

const AuthProvider = ({ children }) => {
  const { authentication, loading, handleLogin, handleLogout } = useAuth();
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider
      value={{
        authentication,
        loading,
        handleLogin,
        handleLogout,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
