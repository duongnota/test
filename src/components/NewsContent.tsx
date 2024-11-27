import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../AxiosInstance"; // Đảm bảo axios đã được cấu hình đúng

interface NewsItem {
  title: string;
  content: string;
  urlImg: string;
  timeUp: string;
  typeNews: string;
}

const NewsContent: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Lấy `id` từ URL params
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch news detail by ID
  const fetchNewsDetail = async () => {
    try {
      console.log(id);
      const response = await axios.get(`/api/client/infor/${id}`);
      if (response.data) {
        setNews(response.data); // Lưu dữ liệu bài viết vào state
      } else {
        alert("News not found.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch news detail:", error);
      alert("An error occurred while fetching news details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsDetail();
  }, [id]); // Gọi lại khi `id` thay đổi

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!news) {
    return <div>News not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{news.title}</h1>
      <div className="mb-4">
        <img
          src={news.urlImg}
          alt={news.title}
          className="w-full h-80 object-cover rounded-lg mb-4"
        />
      </div>
      <p className="text-sm text-gray-500 mb-2">Published on: {news.timeUp}</p>
      <p className="text-sm text-gray-500 mb-4">Type: {news.typeNews}</p>
      <div className="mb-4">
        <p className="text-lg">{news.content}</p>
      </div>
    </div>
  );
};

export default NewsContent;
