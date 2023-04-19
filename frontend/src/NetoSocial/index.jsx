import AuthenticationForm from "./AuthenticationForm";
import NewsList from "./NewsList";
import UserInfo from "./UserInfo";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const NetoSocial = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!localStorage.getItem("token")) {
      setLoading(false);
      return;
    }
    setUserProfile(JSON.parse(localStorage.getItem("profile")));
    setLoading(false);
  }, []);

  const getProfile = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/private/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.setItem("profile", JSON.stringify(data));
      setUserProfile(data);
    } catch (err) {
      if (err?.response?.status === 401) {
        localStorage.clear();
      }
      if (err?.response?.data?.message) {
        throw new Error(err.message);
      } else {
        throw new Error(err.message);
      }
    }
  };

  const logOut = () => {
    localStorage.clear();
    setUserProfile(null);
  };

  const headerRight = !!userProfile ? (
    <UserInfo userProfile={userProfile} onLogOut={logOut} />
  ) : (
    <AuthenticationForm onGetProfile={getProfile} />
  );

  const bodyContent = !!userProfile ? (
    <NewsList userProfile={userProfile} />
  ) : (
    <section className="info-section">
      <Box
        className="info-section__box"
        sx={{
          width: "75%",
          height: 300,
          backgroundColor: "#d3dae9",
        }}
      >
        <h1>Neto Social</h1>
        <h4>Facebook and VK killer.</h4>
      </Box>
    </section>
  );

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

export default NetoSocial;
