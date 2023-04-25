import NewsList from "./components/NewsList";
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

  const bodyContent = !!userProfile ? <NewsList /> : null;

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <CircularProgress />
        </div>
      ) : (
        <>{bodyContent}</>
      )}
    </>
  );
};

export default NewsListPage;
