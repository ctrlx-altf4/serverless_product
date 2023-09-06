import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const Axios = axios.create({
  baseURL: apiUrl,
  // timeout: 1000,
});

export default Axios;
