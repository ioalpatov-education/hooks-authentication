import { useEffect, useContext } from "react";
import { NewsContext } from "../App";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const { setUserProfile } = useContext(NewsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }

    setUserProfile(JSON.parse(localStorage.getItem("profile")));
  }, []);

  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>Not Found</h2>
    </div>
  );
};

export default ErrorPage;
