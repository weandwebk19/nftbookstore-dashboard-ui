import { toSnake } from "utils/nomalizer";

import { createAxiosJWT } from "./api";

const axios = createAxiosJWT();

const getListAuthorRequests = async () => {
  try {
    const res = await axios.get(`/author/request`);
    if (res.status === 200) {
      return res.data;
    }

    return [];
  } catch (error) {
    console.log(error);
    return error;
  }
};

// const acceptBecomeAuthor = async (hash) => {
//   try {
//     const res = await axios.post(`/author/request/accept`, hash);
//     if (res.status === 200) {
//       return res.data;
//     }

//     return null;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

const acceptBecomeAuthor = async (authorInfo) => {
  try {
    // const res = await axios.get(
    //   `${process.env.REACT_APP_MAIN_PAGE_URL}api/authors/accept?hash=${hash}`
    // );

    const res = await axios.post("/author/request/accept", {
      authorInfo: toSnake(authorInfo),
    });
    if (res.status === 200) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const refuseBecomeAuthor = async (authorInfo) => {
  try {
    // const res = await axios.get(
    //   `${process.env.REACT_APP_MAIN_PAGE_URL}api/authors/refuse?hash=${hash}`
    // );

    const res = await axios.post("/author/request/refuse", {
      authorInfo: toSnake(authorInfo),
    });
    if (res.status === 200) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// const refuseBecomeAuthor = async (hash) => {
//   try {
//     const res = await axios.post(`/author/request/refuse`, hash);
//     if (res.status === 200) {
//       return res.data;
//     }

//     return null;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

const authorRequestService = {
  getListAuthorRequests,
  acceptBecomeAuthor,
  refuseBecomeAuthor,
};

export default authorRequestService;
