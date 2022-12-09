import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const StaffRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user && user.is_staff) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default StaffRoute;
