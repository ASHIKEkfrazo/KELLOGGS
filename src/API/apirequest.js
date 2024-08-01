import axios from "axios";
// const baseURL=`http://kellogs.aivolved.in/api/`;
// const   baseURL =  'https://huldev.aivolved.in/api/';
// const   baseURL =  'https://hul.aivolved.in/api/';

const baseURL =  'http://localhost:8000/api/';

const token = localStorage.getItem("token");
const AuthToken = JSON.parse(token)

const API = axios.create({
  baseURL,
});

export { API, baseURL,AuthToken };
