import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";

const NewsPage = () => {
  const [newsById, setNewsById] = useState([]);
  const [error, setError] = useState(false);

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
      if (err?.response?.status === 404) {
        setError(true);
      }
      if (err?.response?.data?.message) {
        throw new Error(err.message);
      } else {
        throw new Error(err.message);
      }
    }
  };

  return (
    <div className="news-card-wrapper">
      {error ? (
        <h1>Не найдена новость с таким id</h1>
      ) : (
        <Card className="news-card" sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            image={newsById.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {newsById.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {newsById.content}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NewsPage;
