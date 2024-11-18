import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header
      className="bg-blue-500 text-white shadow-md bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/images/bg.jpg')` }} // Sử dụng url() để đặt ảnh nền
    >
      <div className="container mx-auto flex justify-between items-center p-4 bg-blue-500/80 backdrop-blur-sm">
        <div className="text-2xl font-bold">
          <Link to="/">MyApp</Link>
        </div>

        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-200">
            About
          </Link>
          <Link to="/services" className="hover:text-gray-200">
            Services
          </Link>
          <Link to="/contact" className="hover:text-gray-200">
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <button className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
