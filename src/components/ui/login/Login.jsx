import { Route, Routes } from "react-router-dom";

import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Routes>
      <Route path="/" index={true} element={<LoginForm />} />
    </Routes>
  );
};

export default Login;
