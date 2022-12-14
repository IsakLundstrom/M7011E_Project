import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, logoutUser } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    try {
      const response = await axios.post(`${baseURL}/auth/refresh/`, {
        refresh: authTokens.refresh,
      });

      console.log("refresh OK!", response);

      localStorage.setItem("authTokens", JSON.stringify(response.data));

      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));

      req.headers.Authorization = `Bearer ${response.data.access}`;
      return req;
    } catch {
      console.log("refresh NOT ok");

      logoutUser();
      navigate("/login");
    }
  });

  return axiosInstance;
};

export default useAxios;
