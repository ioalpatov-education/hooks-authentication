import axios from "axios";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    (async () => {
      await getNews();
    })();
  }, []);

  const getNews = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/private/news`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNews(data);
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

  const newsList = news.map((el) => {
    const { id, title, image, content } = el;

    return (
      <Card className="news-card" sx={{ maxWidth: 345 }} key={id}>
        <Link to={`/news/${id}`}>
          <CardMedia component="img" alt="green iguana" image={image} />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </Card>
    );
  });

  return <div className="news-list">{newsList}</div>;
};

export default NewsList;
