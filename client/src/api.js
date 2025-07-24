import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Your Express server
});

export default API;
