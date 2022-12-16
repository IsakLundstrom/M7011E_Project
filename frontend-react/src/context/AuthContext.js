import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    //return object
    const res = {
      err: false,
      need2FA: false,
    };

    const response = await fetch("http://127.0.0.1:8000/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      console.log("login user", data);

      if (data.details) {
        res.need2FA = true;
        return res;
      }

      setAuthTokens(data);
      setUser(jwt_decode(data.access));

      // console.log("authTokens " + authTokens);
      // console.log("data " + data);
      // console.log("json(data) " + JSON.stringify(data));
      // console.log(data);

      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
      console.log("Logged in!");

      return res;
    } else {
      res.err = true;
      return res;
    }
  };

  const loginUser2FA = async (email, password, token) => {
    //return object
    const res = {
      err: false,
    };

    const response = await fetch("http://127.0.0.1:8000/auth/login/2fa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        token: token,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));

      console.log(data);

      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
      console.log("Logged in with 2FA!");

      return res;
    } else {
      res.err = true;
      return res;
    }
  };

  const registerUser = async (fName, lName, email, password) => {
    const response = await fetch("http://localhost:8000/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fName: fName,
        lName: lName,
        email: email,
        password: password,
        // rpassword: rpassword,
      }),
    });
    if (response.status === 201) {
      navigate("/login");
      console.log("Registerd!");
    } else {
      alert("Something went wrong!");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
    console.log("Logged out!");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    loginUser2FA,
    logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
