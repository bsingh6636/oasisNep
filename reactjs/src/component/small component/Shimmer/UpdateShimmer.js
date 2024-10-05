// Shimmer.js
import React from 'react';

function UpdateShimmer() {
  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      {/* Shimmer for loading updates */}
      {[...Array(2)].map((_, index) => (
        <div key={index} className="my-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 shimmer-heading"></h2>
          <div className="flex overflow-x-auto space-x-4 p-4">
            <div className="flex-none w-72 sm:w-80 lg:w-96 p-4 border border-gray-200 rounded-lg shadow-lg bg-white shimmer">
              <div className="relative">
                <div className="rounded-xl shadow-2xl h-48 w-full bg-gray-300 shimmer-image"></div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-md rounded-b-xl p-4">
                  <span className="text-white text-center text-lg font-semibold shimmer-text"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <style jsx>{`
        .shimmer {
          animation: shimmer 1.5s infinite;
          background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
          background-size: 200% 100%;
        }
        .shimmer-heading {
          height: 24px;
          background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
          animation: shimmer 1.5s infinite;
        }
        .shimmer-image {
          height: 192px; /* Equivalent to h-48 */
          background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
          animation: shimmer 1.5s infinite;
        }
        .shimmer-text {
          height: 16px;
          width: 80%;
          background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}

export default UpdateShimmer;
