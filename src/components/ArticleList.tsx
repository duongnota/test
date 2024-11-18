import React from "react";
import ArticleCard from "./ArticleCard";

const articles = [
  {
    title: "New AI Breakthrough",
    description:
      "Researchers have made significant advancements in AI technology.",
    image: "/images/ai.jpg",
  },
  {
    title: "Climate Change Impact",
    description:
      "The effects of climate change are becoming more evident each year.",
    image: "/images/climate.jpg",
  },
  {
    title: "Stock Market Hits Record Highs",
    description:
      "The stock market has reached unprecedented levels this quarter.",
    image: "/images/stock.jpg",
  },
];

const ArticleList: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            description={article.description}
            image={article.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
