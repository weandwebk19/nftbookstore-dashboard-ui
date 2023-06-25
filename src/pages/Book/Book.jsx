import { Route, Routes } from "react-router-dom";

import { Read } from "./Read";

const Book = () => {
  return (
    <Routes>
      <Route path="/:bookId" element={<Read />} />
    </Routes>
  );
};

export default Book;
