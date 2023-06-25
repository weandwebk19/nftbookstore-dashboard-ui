import axios from "axios";
import jwt_decode from "jwt-decode";
import { toCamel } from "utils/nomalizer";

import config from "../config";
import TokenService from "./tokenService";

const refreshToken = async () => {
  try {
    const instance = axios.create({
      withCredentials: true,
      baseURL: `${config.SERVER_URL}`,
    });
    const res = await instance.post("/auth/refresh");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// export const createAxiosJWT = () => {
//   const newInstance = axios.create({
//     withCredentials: true,
//     baseURL: `${config.SERVER_URL}`,
//   });
//   newInstance.interceptors.request.use(
//     async (config) => {
//       const token = TokenService.getLocalAccessToken();
//       if (token) {
//         const decodedToken = jwt_decode(token);
//         const date = new Date();
//         if (decodedToken.exp < date.getTime() / 1000) {
//           const data = await TokenService.getRefreshToken();

//           const user = TokenService.getUser();

//           const refreshUser = {
//             ...user,
//             accessToken: data.accessToken,
//           };
//           TokenService.setUser(refreshUser);
//           config.headers["x-access-token"] = `Bearer ${data.accessToken}`;
//         } else {
//           config.headers["x-access-token"] = `Bearer ${token}`;
//         }
//       }
//       return config;
//     },
//     (err) => {
//       return Promise.reject(err);
//     }
//   );
//   return newInstance;
// };

export const createAxiosJWT = () => {
  const newInstance = axios.create({
    withCredentials: true,
    baseURL: `${config.SERVER_URL}`,
  });
  newInstance.interceptors.request.use(
    async (config) => {
      const token = await TokenService.getAuthToken();
      config.headers["x-access-token"] = `Bearer ${token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  newInstance.interceptors.response.use(
    (response) => {
      const res = toCamel(response);
      return res;
    },
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("persist:main-root");
        /* eslint-disable no-return-assign */
        return (window.location.href = "/login");
      }
      if (error.response?.status === 403) {
        /* eslint-disable no-return-assign */
        return (window.location.href = "/403");
      }

      return Promise.reject(error);
    }
  );
  return newInstance;
};

export const createAxios = () => {
  const instance = axios.create({
    withCredentials: true,
    baseURL: `${config.SERVER_URL}`,
  });
  return instance;
};

export const createAxiosDefault = () => {
  const instance = axios.create({
    baseURL: `${config.SERVER_URL}`,
  });
  return instance;
};
