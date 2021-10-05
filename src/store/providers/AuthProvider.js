import AuthContext from "../contexts/AuthContext";
import useAuth from "./useAuth";

const AuthProvider = ({ children }) => {
  const { authentication, loading, user, handleLogin, handleLogout } =
    useAuth();

  return (
    <AuthContext.Provider
      value={{
        authentication,
        loading,
        user,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
