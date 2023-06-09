import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { NewsContext } from "../App";
import { useNavigate } from "react-router-dom";

const AuthorizationPage = () => {
  const [loading, setLoading] = useState(false);
  const { setUserProfile } = useContext(NewsContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (!localStorage.getItem("token")) {
      setLoading(false);
      return;
    }

    setUserProfile(JSON.parse(localStorage.getItem("profile")));
    navigate("/news");
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <CircularProgress />
        </div>
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
      )}
    </>
  );
};

export default AuthorizationPage;
