import { createAxiosJWT } from "./api";

const axios = createAxiosJWT();

// get search users
const getListBookTemps = async () => {
  try {
    const res = await axios.get(`/book-temps`);
    if (res.status === 200) {
      return res.data;
    }

    return [];
  } catch (error) {
    console.log(error);
    return error;
  }
};

const acceptPublishBook = async (bookTemp) => {
  try {
    const res = await axios.post(`/book-temps/accept`, bookTemp);
    if (res.status === 200) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const refusePublishBook = async (bookTemp) => {
  try {
    const res = await axios.post(`/book-temps/refuse`, bookTemp);
    if (res.status === 200) {
      return res.data;
    }

    return null;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const BookTempService = {
  getListBookTemps,
  acceptPublishBook,
  refusePublishBook,
};

export default BookTempService;
