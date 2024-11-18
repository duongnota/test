import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import Footer from "./components/Footer";

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/images/bg.jpg')` }}
    >
      <Router>
        <Header />
        <main className="container mx-auto p-4 bg-white/70 backdrop-blur-sm rounded-lg shadow-lg">
          <Routes>
            <Route path="/" element={<ArticleList />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
