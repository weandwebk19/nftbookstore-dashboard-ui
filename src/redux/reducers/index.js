import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth";
import message from "./message";
import presentation from "./presentation";
import role from "./role";

export default combineReducers({
  auth,
  message,
  presentation,
  role,
});
