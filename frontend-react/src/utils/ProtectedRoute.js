import { Route, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Route {...rest}>
      {user && user.is_superuser ? children : navigate("/")}
    </Route>
  );
};

export default ProtectedRoute;
