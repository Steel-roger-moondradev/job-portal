"use client";

import React from "react";

const loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f8f9ff] via-[#eef1ff] to-[#f0f4ff] dark:from-[#0f1117] dark:via-[#13151f] dark:to-[#111420]">
      
      <div className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 shadow-md">
        
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-500 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </p>

      </div>
    </div>
  );
};

export default loading;