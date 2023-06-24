import { createAxiosJWT } from "./api";
import TokenService from "./tokenService";

const axios = createAxiosJWT();

// get search users
const getSearchUsers = async (term) => {
  try {
    const res = await axios.get(`/users/search/items?term=${term}`);
    if (res.status === 200) {
      return res.data;
    }

    return [];
  } catch (error) {
    console.log(error);
    return error;
  }
};

// get user info
const getUserByUsername = async () => {
  try {
    const user = TokenService.getUser();
    const username = user?.user.username;

    const res = await axios.get(`/users/profile/${username}`);
    if (res.status === 200) {
      return res.data;
    }

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// get user verify status
const getVerifyStatus = async () => {
  try {
    const user = TokenService.getUser();
    const username = user?.user.username;

    const res = await axios.get("/users/verify-status");
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

// update profile user
const updateProfileUser = async (userInfo) => {
  const user = TokenService.getUser();
  const username = user?.user.username;
  try {
    const formData = new FormData();

    // append data
    for (const key in userInfo) {
      formData.append(key, userInfo[key]);
    }

    const res = await axios({
      method: "post",
      url: `/users/profile/${username}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 200) {
      return res.data;
    }
    return res;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

const generateResetPasswordLink = async (email) => {
  try {
    const res = await axios({
      method: "post",
      url: `/auth/reset-password/generate-link`,
      data: {email},
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err) {
    if (err.response !== undefined) {
      return {
        success: false,
        message: err.response.data.message,
      };
    }
    return {
      success: false,
      message: err.message,
    };
  }
};

const resetPassword = async (token, password) => {
  try {
    const res = await axios({
      method: "post",
      url: `/auth/reset-password/reset`,
      data: {token, password},
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err) {
    console.log(err);
    if (err.response !== undefined) {
      return {
        success: false,
        message: err.response.data.message,
      };
    }
    console.log(err.response.data.message)
    return {
      success: false,
      message: err.message,
    };
  }
};

const UserService = {
  getSearchUsers,
  getUserByUsername,
  getVerifyStatus,
  updateProfileUser,
  generateResetPasswordLink,
  resetPassword,
};

export default UserService;
