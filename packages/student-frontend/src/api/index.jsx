import axios from "axios";
//  process.env.MYTIME_BACKEND
import TokenService from "../services/TokenService";

const api = axios.create({
  baseURL: "http://localhost:3001/students/",
  timeout: 5000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const access_token = TokenService.getLocalAccessToken();
    if (config.url !== "register" && config.url !== "login") {
      if (access_token) {
        config.headers["Authorization"] = "Bearer " + access_token;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest.url === "token") {
      console.log("i am rejecting");
      router.push("/login");
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post("token", {
          refresh_token: TokenService.getLocalRefreshToken(),
        })
        .then((res) => {
          if (res.status === 201) {
            // 1) put token to LocalStorage
            TokenService.setLocalAccessToken(res.data.access_token);

            // 2) Change Authorization header
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + TokenService.getLocalAccessToken();
            // 3) return originalRequest object with Axios.
            return axios(originalRequest);
          }
        });
    }
  }
);

export default api;
