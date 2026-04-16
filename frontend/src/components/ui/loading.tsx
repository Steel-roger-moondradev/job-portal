"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br 
      from-gray-100 via-gray-50 to-gray-200 
      dark:from-[#0b0e14] dark:via-[#0f1320] dark:to-[#0a0d18]">

      <div className="flex flex-col items-center gap-4 p-6 rounded-3xl 
        bg-white/80 dark:bg-gray-900/80 
        backdrop-blur-xl 
        border border-gray-200 dark:border-gray-700 
        shadow-lg dark:shadow-black/40">

        {/* Spinner */}
        <div className="w-10 h-10 border-4 
          border-indigo-200 dark:border-gray-700 
          border-t-indigo-500 dark:border-t-indigo-400 
          rounded-full animate-spin">
        </div>

        {/* Text */}
        <p className="text-sm 
          text-gray-600 dark:text-gray-300 
          font-medium tracking-wide">
          Loading...
        </p>

      </div>
    </div>
  );
};

export default Loading;