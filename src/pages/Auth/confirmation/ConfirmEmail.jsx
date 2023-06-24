import { useLocation } from "react-router-dom";

const ConfirmEmail = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const paramSuccess = JSON.parse(query.get("success"));
  return <p>{paramSuccess === true ? "Verify success" : "Verify failure"}</p>;
};

export default ConfirmEmail;
