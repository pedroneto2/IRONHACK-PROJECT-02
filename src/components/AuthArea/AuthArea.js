import React from "react";
import "./AuthArea.css";

import { Link } from "react-router-dom";

const AuthArea = () => {
  return (
    <div className="auth-area-container">
      <Link to="/login">Login</Link>
    </div>
  );
};

export default AuthArea;
