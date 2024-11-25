import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Sử dụng useParams để lấy tham số từ URL
import axios from "../AxiosInstance"; // Đảm bảo axios đã được cấu hình đúng

interface NewsDetail {
  title: string;
  content: string;
  timeUp: string;
  urlImg: string;
}

const NewsDetailPage: React.FC = () => {
  const { typeNews } = useParams<{ typeNews: string }>(); // Lấy tham số typeNews từ URL
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`/api/news/${typeNews}`); // Lấy chi tiết bài viết dựa trên typeNews
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch news detail:", error);
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [typeNews]); // Khi typeNews thay đổi, gọi lại API

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!news) {
    return <div>News not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{news.title}</h1>
      <img
        src={news.urlImg}
        alt={news.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-600 text-sm mb-2">{news.timeUp}</p>
      <p>{news.content}</p>
    </div>
  );
};

export default NewsDetailPage;
