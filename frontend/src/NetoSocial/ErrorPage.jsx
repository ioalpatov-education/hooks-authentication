import UserInfo from "./components/UserInfo";
import { useEffect, useContext } from "react";
import { NewsContext } from "../App";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const { userProfile, setUserProfile } = useContext(NewsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }

    setUserProfile(JSON.parse(localStorage.getItem("profile")));
  }, []);

  const headerRight = !!userProfile ? <UserInfo /> : null;

  return (
    <div className="neto-social">
      <header className="neto-social__header">
        <h3>Neto Social</h3>
        {headerRight}
      </header>
      <div className="error-page">
        <h1>404</h1>
        <h2>Not Found</h2>
      </div>
    </div>
  );
};

export default ErrorPage;
