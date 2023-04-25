import "./App.css";
import AuthorizationPage from "./NetoSocial/AuthorizationPage";
import NewsPage from "./NetoSocial/NewsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import axios from "axios";

export const NewsContext = createContext(null);

function App() {
  const [userProfile, setUserProfile] = useState(null);

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

  return (
    <div className="app">
      <NewsContext.Provider
        value={{ userProfile, setUserProfile, getProfile, logOut }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<AuthorizationPage />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </Router>
      </NewsContext.Provider>
    </div>
  );
}

export default App;
