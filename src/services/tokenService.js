import axios from "axios";
import jwt_decode from "jwt-decode";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "redux/actions/types";
import { store } from "redux/store";

import config from "../config";

const getRefreshToken = async () => {
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
const getAccessToken = () => {
  const state = store.getState();
  const auth = state?.auth;
  const accessToken = auth?.user?.accessToken;

  return accessToken;
};

const getAuthToken = async () => {
  const accessToken = getAccessToken();
  if (accessToken) {
    const decodedToken = jwt_decode(accessToken);
    const date = new Date();
    if (decodedToken.exp < date.getTime() / 1000) {
      const data = await getRefreshToken();
      const user = getUser();

      const refreshUser = {
        ...user,
        accessToken: data.accessToken,
      };
      setUser(refreshUser);
      return data.accessToken;
    }
  }
  return Promise.resolve(accessToken);
};

const updateAccessToken = (token) => {
  let user = getUser();
  user = { ...user, accessToken: token };
  store.dispatch({
    type: LOGIN_SUCCESS,
    payload: { user },
  });
};

const getUser = () => {
  const state = store.getState();
  const auth = state?.auth;
  const user = auth?.user;

  return user;
};

const getCurrentUser = () => {
  const state = store.getState();
  const auth = state?.auth;
  const user = auth?.user?.user;

  return user;
};

const setUser = (user) => {
  // localStorage.setItem("user", JSON.stringify(user));
  store.dispatch({
    type: LOGIN_SUCCESS,
    payload: { user },
  });
};

const removeUser = () => {
  // localStorage.removeItem("user");
  store.dispatch({
    type: LOGOUT_SUCCESS,
    payload: { user: null },
  });
};

const TokenService = {
  getAuthToken,
  getRefreshToken,
  getAccessToken,
  updateAccessToken,
  getUser,
  getCurrentUser,
  setUser,
  removeUser,
};

export default TokenService;
