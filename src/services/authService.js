import { createAxios, createAxiosJWT } from "./api";
import TokenService from "./tokenService";

const axios = createAxios();
const axiosJWT = createAxiosJWT();

const register = async (user) => {
  try {
    const res = await axios.post("/auth/register", user);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const login = async (user) => {
  try {
    const res = await axios.post("/auth/login", user);

    if (res.status === 200) {
      TokenService.setUser(res.data);
      return {
        success: true,
        message: "successfully login! 🤗",
        user: res.data
      };
    } else {
      return {
        success: false,
        message: res.message
      };
    }
  } catch (err) {
    console.log(err);

    if (err.response !== undefined) {
      return {
        success: false,
        message: err.response.data.message
      };
    }
    return {
      success: false,
      message: err.message
    };
  }
};

const oAuthLogin = async (user) => {
  try {
    const res = await axios.post("/auth/oauth/login", user);
    if (res.status === 200) {
      if (res.data.accessToken) {
        TokenService.setUser(res.data);
      }
      return {
        success: true,
        message: "successfully login! 🤗",
        user: res.data,
        isRegisterd: true
      };
    } else {
      return {
        success: false,
        message: res.message,
        user,
        isRegisterd: false
      };
    }
  } catch (err) {
    if (err.response !== undefined) {
      if (err.response.status === 403) {
        TokenService.setUser(user);
      }
      return {
        success: false,
        message: err.response.data.message,
        user,
        isRegisterd: false
      };
    }
    return {
      success: false,
      message: err.message,
      user,
      isRegisterd: false
    };
  }
};

const logout = async () => {
  try {
    // const user = TokenService.getUser();
    const res = await axiosJWT.post("auth/logout");

    if (res.status === 200) {
      return {
        success: true,
        message: res.data
      };
    } else {
      return {
        success: false,
        message: res.data
      };
    }
  } catch (err) {
    console.error(err);
    if (err.response !== undefined) {
      return {
        success: false,
        message: err.response.data.message
      };
    }
    return {
      success: false,
      message: err.message
    };
  }
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const isLoggedIn = async () => {
  try {
    const res = await axiosJWT.post("auth");
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const anonymousLogin = async (user) => {
  try {
    const res = await axios.post("auth/user/anonymous/login", { user });

    if (res.status === 200) {
      TokenService.setUser(res.data);
      return {
        success: true,
        message: "successfully login! 🤗",
        user: res.data
      };
    } else {
      return {
        success: false,
        message: res.message
      };
    }
  } catch (err) {
    console.log(err);

    if (err.response !== undefined) {
      return {
        success: false,
        message: err.response.data.message
      };
    }
    return {
      success: false,
      message: err.message
    };
  }
};

const AuthService = {
  register,
  login,
  oAuthLogin,
  logout,
  getCurrentUser,
  isLoggedIn,
  anonymousLogin
};

export default AuthService;
