import React from "react";
import AddNewsForm from "../components/AddNewsForm";
import dayjs from "dayjs";

const AddNewsPage: React.FC = () => {
  const handleAddNews = async (news: {
    title: string;
    content: string;
    urlImg: string;
    timeUp: string;
    typeNews: string;
  }) => {
    try {
      news.timeUp = dayjs().format("YYYY-MM-DD HH:mm");
      const response = await fetch("http://localhost:3001/api/admin/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(news),
      });

      if (response.ok) {
        const data = await response.json();
        alert("News added successfully!");
        console.log("Response:", data);
      } else {
        const error = await response.json();
        alert(`Failed to add news: ${error.error}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <AddNewsForm onSubmit={handleAddNews} />
    </div>
  );
};

export default AddNewsPage;
