import "./App.css";
import AuthorizationPage from "./NetoSocial/AuthorizationPage";
import NewsListPage from "./NetoSocial/NewsListPage";
import ErrorPage from "./NetoSocial/ErrorPage";
import NewsPage from "./NetoSocial/NewsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import axios from "axios";
import UserInfo from "./NetoSocial/components/UserInfo";
import AuthenticationForm from "./NetoSocial/components/AuthenticationForm";

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

  const headerRight = !!userProfile ? <UserInfo /> : <AuthenticationForm />;

  return (
    <div className="app">
      <NewsContext.Provider
        value={{ userProfile, setUserProfile, getProfile, logOut }}
      >
        <Router>
          <div className="neto-social">
            <header className="neto-social__header">
              <h3>Neto Social</h3>
              {headerRight}
            </header>

            <Routes>
              <Route path="/" element={<AuthorizationPage />} />
              <Route path="/news">
                <Route path="" element={<NewsListPage />} />
                <Route path=":id" element={<NewsPage />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </Router>
      </NewsContext.Provider>
    </div>
  );
}

export default App;
