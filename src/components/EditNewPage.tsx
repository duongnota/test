import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../AxiosInstance"; // Đảm bảo axios đã được cấu hình đúng

interface NewsItem {
  title: string;
  typeNews: string;
  content: string;
  timeUp: string;
  urlImg: string;
}

const EditNewsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Lấy `id` từ URL params
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch detail of the news by ID
  const fetchNewsDetail = async () => {
    try {
      console.log(id);
      // Gọi API để lấy bài viết theo `id`
      const response = await axios.get(`/api/admin/news/${id}`);
      console.log(response.data);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!news) return;

    try {
      // Gửi yêu cầu PUT để cập nhật bài viết theo `id`
      await axios.post(`/api/admin/news/edit/${id}`, news);
      alert("News updated successfully!");
      navigate("/admin"); // Redirect to admin page after updating
    } catch (error) {
      console.error("Failed to update news:", error);
      alert("Failed to update news.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (news) {
      setNews({
        ...news,
        [name]: value,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit News</h1>
      {news && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={news.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Content</label>
            <textarea
              name="content"
              value={news.content}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Image URL</label>
            <input
              type="text"
              name="urlImg"
              value={news.urlImg}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Time Up</label>
            <input
              type="text"
              name="timeUp"
              value={news.timeUp}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Type News</label>
            <input
              type="text"
              name="typeNews"
              value={news.typeNews}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default EditNewsPage;
