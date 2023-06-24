import { Route, Routes } from "react-router-dom";

import ConfirmEmail from "./ConfirmEmail";
import ConfirmRequire from "./ConfirmRequire";

const Confirmation = () => {
  return (
    <Routes>
      <Route path="/" index={true} element={<ConfirmEmail />} />
      <Route index={false} path="/require" element={<ConfirmRequire />} />
    </Routes>
  );
};

export default Confirmation;
