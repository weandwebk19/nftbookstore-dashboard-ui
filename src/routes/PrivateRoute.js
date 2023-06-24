import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import PropTypes from "prop-types";
import AuthService from "services/authService";

const PrivateRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    (async () => {
      const LoggedInRes = await AuthService.isLoggedIn();
      setIsLoggedIn(LoggedInRes);
    })();
  }, []);

  if (isLoggedIn === false) {
    return <Navigate to="/login" />;
  }
  return children;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
