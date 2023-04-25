import NewsList from "./components/NewsList";
import UserInfo from "./components/UserInfo";
import { CircularProgress } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { NewsContext } from "../App";
import { useNavigate } from "react-router-dom";

const NewsListPage = () => {
  const [loading, setLoading] = useState(false);
  const { userProfile, setUserProfile } = useContext(NewsContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (!localStorage.getItem("token")) {
      navigate("/");
      setLoading(false);
      return;
    }

    setUserProfile(JSON.parse(localStorage.getItem("profile")));
    setLoading(false);
  }, []);

  const headerRight = !!userProfile ? <UserInfo /> : null;

  const bodyContent = !!userProfile ? <NewsList /> : null;

  return (
    <div className="neto-social">
      {loading ? (
        <div className="loader-container">
          <CircularProgress />
        </div>
      ) : (
        <>
          <header className="neto-social__header">
            <h3>Neto Social</h3>
            {headerRight}
          </header>
          {bodyContent}
        </>
      )}
    </div>
  );
};

export default NewsListPage;
