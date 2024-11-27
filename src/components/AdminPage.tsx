import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../AxiosInstance"; // Đảm bảo axios đã được cấu hình đúng

interface NewsItem {
  _id: string; // Sử dụng _id thay vì typeNews
  title: string;
  typeNews: string;
  content: string;
  timeUp: string;
  urlImg: string;
}

const AdminPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // Dùng useNavigate để điều hướng

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsItem[]>("/api/admin/news"); // Lấy danh sách bài viết
        setNewsItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleDelete = async (_id: string) => {
    // Sử dụng _id thay vì typeNews
    try {
      await axios.delete(`/api/admin/delete/${_id}`); // Gửi yêu cầu DELETE để xoá bài viết
      setNewsItems(newsItems.filter((news) => news._id !== _id)); // Xoá bài viết khỏi state
      alert("News deleted successfully!");
    } catch (error) {
      console.error("Failed to delete news:", error);
      alert("Failed to delete news.");
    }
  };

  const handleEdit = (_id: string) => {
    // Sử dụng _id thay vì typeNews
    navigate(`/news/edit/${_id}`); // Điều hướng đến trang chỉnh sửa bài viết sử dụng _id
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Page - Manage News</h1>
      {newsItems.length === 0 ? (
        <p>No news available.</p>
      ) : (
        newsItems.map((news) => (
          <div
            key={news._id} // Sử dụng _id làm key
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
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleEdit(news._id)} // Khi bấm vào "Edit", điều hướng đến trang chỉnh sửa
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(news._id)} // Sử dụng _id để xoá bài viết
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
