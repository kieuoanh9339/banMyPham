import axios from "axios";
const AxiosConfig = axios.create({
  
  baseURL: "https://ban-my-pham-7c6l.vercel.app/api",
  // baseURL: "http://localhost:5000/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: localStorage.getItem("token")
  }
});
AxiosConfig.interceptors.request.use(async (config) => config);
AxiosConfig.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return error.response;
  }
);

export default AxiosConfig;