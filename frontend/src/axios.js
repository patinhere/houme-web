import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://houme-web.onrender.com/api/",
  withCredentials: true,
});
