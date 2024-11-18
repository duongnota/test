import React from "react";

interface ArticleProps {
  title: string;
  description: string;
  image: string;
}

const ArticleCard: React.FC<ArticleProps> = ({ title, description, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
