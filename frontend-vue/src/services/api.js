import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
  },
});

export default instance;