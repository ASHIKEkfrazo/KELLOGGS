import axios from "axios";
const baseURL=`http://kellogs.aivolved.in:8000/`;
const API = axios.create({
  baseURL,
});

export {API,baseURL};
