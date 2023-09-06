import axios from "axios";

const Axios = axios.create({
  baseURL: "https://leojjvv0zb.execute-api.ap-northeast-2.amazonaws.com/",
  timeout: 1000,
});

export default Axios;
