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
      TokenService.setUser(null);
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return api
        .post("token", {
          refresh_token: TokenService.getLocalRefreshToken(),
        })
        .then((res) => {
          if (res.status === 200) {
            // 1) put token to LocalStorage
            TokenService.updateLocalAccessToken(res.data.access_token);
            // 2) Change Authorization header
            api.defaults.headers.common["Authorization"] =
              "Bearer " + TokenService.getLocalAccessToken();
            // 3) return originalRequest object with Axios.
            return api(originalRequest);
          }
        })
        .catch((err) => {
          localStorage.removeItem("student-access-token");
          localStorage.removeItem("student-refresh-token");
          TokenService.setUser(null);
        });
    }
  }
);

export default api;
