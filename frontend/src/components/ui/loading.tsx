import React from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="w-full max-w-6xl px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT SIDE (TEXT SKELETON) */}
        <div className="space-y-6">
          
          {/* Badge */}
          <div className="w-40 h-6 rounded-full bg-gray-300 animate-pulse"></div>

          {/* Heading */}
          <div className="space-y-3">
            <div className="h-10 w-3/4 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-10 w-1/2 bg-purple-300 rounded-lg animate-pulse"></div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-6 w-12 bg-purple-300 rounded animate-pulse"></div>
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <div className="h-12 w-36 bg-purple-400 rounded-xl animate-pulse"></div>
            <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>

        {/* RIGHT SIDE (IMAGE SKELETON + ANIMATION) */}
        <div className="relative flex items-center justify-center">
          
          {/* Floating linear blob */}
          <div className="absolute w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-40 animate-blob"></div>

          {/* Card Skeleton */}
          <div className="relative z-10 w-full max-w-md h-72 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6">
            
            {/* Top bars */}
            <div className="space-y-3">
              <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Center circle */}
            <div className="mt-6 flex justify-center">
              <div className="w-20 h-20 bg-purple-300 rounded-full animate-pulse"></div>
            </div>

            {/* Bottom bars */}
            <div className="mt-6 space-y-2">
              <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-4/5 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -20px) scale(1.05); }
            66% { transform: translate(-20px, 20px) scale(0.95); }
          }
          .animate-blob {
            animation: blob 6s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingPage;