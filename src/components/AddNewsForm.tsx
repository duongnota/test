import React, { useState } from "react";
import { NewsType } from "../types/NewsType";

interface NewsFormProps {
  onSubmit: (news: {
    title: string;
    content: string;
    urlImg: string;
    timeUp: string;
    typeNews: NewsType;
  }) => void;
}

const AddNewsForm: React.FC<NewsFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [timeUp, setTimeUp] = useState("");
  const [typeNews, setTypeNews] = useState<NewsType>(NewsType.General);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, urlImg, timeUp, typeNews });
    setTitle("");
    setContent("");
    setUrlImg("");
    setTimeUp("");
    setTypeNews(NewsType.General);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add News</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="flex items-center">
          <label className="w-32 text-gray-700 font-bold" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label
            className="block text-gray-700 font-bold mb-1"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            rows={4}
            required
          ></textarea>
        </div>

        {/* Image URL */}
        <div className="flex items-center">
          <label className="w-32 text-gray-700 font-bold" htmlFor="urlImg">
            Image URL
          </label>
          <input
            type="text"
            id="urlImg"
            value={urlImg}
            onChange={(e) => setUrlImg(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Time Up
        <div className="flex items-center">
          <label className="w-32 text-gray-700 font-bold" htmlFor="timeUp">
            Time Up
          </label>
          <input
            type="datetime-local"
            id="timeUp"
            value={timeUp}
            onChange={(e) => setTimeUp(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg"
          />
        </div> */}

        {/* News Type */}
        <div className="flex items-center">
          <label className="w-32 text-gray-700 font-bold" htmlFor="typeNews">
            News Type
          </label>
          <select
            id="typeNews"
            value={typeNews}
            onChange={(e) => setTypeNews(e.target.value as NewsType)}
            className="flex-1 px-3 py-2 border rounded-lg"
            required
          >
            {Object.values(NewsType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add News
        </button>
      </form>
    </div>
  );
};

export default AddNewsForm;
