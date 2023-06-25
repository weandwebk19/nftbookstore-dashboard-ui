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

const BookTempService = {
  getListBookTemps,
};

export default BookTempService;
