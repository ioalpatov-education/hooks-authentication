import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardMedia } from "@mui/material";
import axios from "axios";

const NewsPage = () => {
  const [newsById, setNewsById] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }

    (async () => {
      await getNewsById();
    })();
  }, []);

  const getNewsById = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/private/news/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNewsById(data);
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

  return (
    <Card className="news-card" sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="green iguana" image={newsById.image} />
    </Card>
  );
};

export default NewsPage;
