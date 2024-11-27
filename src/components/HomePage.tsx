import React, { useEffect, useState } from "react";
import axios from "../AxiosInstance";

// Định nghĩa kiểu dữ liệu cho bài viết
interface NewsItem {
  typeNews: string;
  title: string;
  content: string;
  timeUp: string;
  urlImg: string;
}

const Home: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsItem[]>("/api/client/home");
        setNewsItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((news, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg shadow-md p-4"
            >
              <img
                src={news.urlImg}
                alt={news.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{news.timeUp}</p>
              <p className="text-gray-800">{news.content}</p>
              <div className="mt-4 text-blue-500">
                <a
                  href={`/news/type/${news.typeNews}`}
                  className="hover:underline"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
