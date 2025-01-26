import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (<>
    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6">
        Welcome to the <span className="underline decoration-white">Form Builder</span>!
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl text-center max-w-3xl mb-8">
        This project is an assignment for <span className="font-semibold">Fiyge Research Inc.</span>, demonstrating a dynamic and responsive form-building tool with a fully integrated backend.
      </p>

      {/* Call to Action */}
      <Link
          to="/form-builder"
          className="px-6 py-3 mb-12 bg-white text-blue-600 font-semibold rounded-md shadow hover:bg-gray-200 transition-all duration-200"
        >
          Start Building Your Form
        </Link>

      {/* Steps Followed */}
      <div className="bg-white text-blue-600 p-6 rounded-md shadow-md mb-10 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Steps Followed:</h2>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>Set up a React project with Tailwind CSS using Vite.js.</li>
          <li>Integrated React DnD for drag-and-drop functionality.</li>
          <li>Created draggable components for form elements like text inputs, checkboxes, and dropdowns.</li>
          <li>Implemented a dynamic canvas to display and edit dropped components.</li>
          <li>Added React Redux for state management to handle form data efficiently.</li>
          <li>Developed a backend using Express.js and Prisma ORM for form storage and retrieval.</li>
          <li>Deployed the project with proper routing using React Router v6.</li>
        </ul>
      </div>

      {/* Backend Features */}
      <div className="bg-white text-blue-600 p-6 rounded-md shadow-md mb-10 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Backend Features:</h2>
        
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>
            Built with <span className="font-semibold">Express.js</span> for routing and handling API endpoints.
          </li>
          <li>
            Integrated <span className="font-semibold">Prisma ORM</span> for seamless database interactions with <span className="font-semibold">PostgreSQL</span>.
          </li>
          <li>
            Provides RESTful APIs for form creation, editing, and data submission.
          </li>
          <li>Supports CRUD operations for form components and user responses.</li>
          <li>Secured endpoints for efficient and scalable interactions.</li>
        </ul>
      </div>

      
    </div>
    </>
  );
};

export default Home;
