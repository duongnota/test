import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Dùng Link để điều hướng
import axios from "../AxiosInstance"; // Đảm bảo axios đã được cấu hình đúng

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  timeUp: string;
  typeNews: string;
  urlImg: string;
}

const NewsList: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsItem[]>("/api/client/home"); // Lấy danh sách bài viết
        setNewsItems(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {newsItems.map((news) => (
        <div
          key={news.typeNews}
          className="mb-6 p-4 border rounded-lg shadow-md"
        >
          <img
            src={news.urlImg}
            alt={news.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-2xl font-semibold">{news.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{news.timeUp}</p>
          <p>{news.content.slice(0, 100)}...</p>
          <Link
            to={`/news/id/${news._id}`}
            className="hover:underline text-blue-500"
          >
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
