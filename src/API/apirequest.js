import axios from "axios";
const baseURL = `http://kellogs.aivolved.in/api/`;
const API = axios.create({
  baseURL,
});

export { API, baseURL };
