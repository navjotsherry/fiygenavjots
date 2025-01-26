import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold mb-6">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-center max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition-all duration-200"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
