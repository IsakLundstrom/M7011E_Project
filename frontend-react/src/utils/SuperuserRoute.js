import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const SuperuserRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user && user.is_superuser) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default SuperuserRoute;
