import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup"; 
const Home = () => {
  const navigate = useNavigate();
  const jump_to = (paths) => {
    navigate(paths);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-slate-700">
      <h1 className="text-3xl text-center text-white md:text-5xl sm:text-4xl">
        User Management System
      </h1>

      <div className="flex-wrap items-center justify-around w-full mx-4 mt-8 text-center sm:w-1/2 sm:flex text">
        <button
          onClick={() => jump_to("/add")}
          className="px-8 py-2 mb-4 text-white bg-transparent border border-white rounded hover:bg-white sm:mb-0 hover:text-slate-700 hover:border-transparent"
        >
          Add User
        </button>
        <button
          onClick={() => jump_to("/view")}
          className="px-8 py-2 mx-4 text-white bg-transparent border border-white rounded hover:bg-white hover:text-slate-700 hover:border-transparent"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default Home;
