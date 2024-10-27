// ProductShimmer.js
import React from 'react';

const AllPricesShimmer = () => {
  const shimmerBoxes = Array.from({ length: 12 }); // Adjust length for 10-20 boxes

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {shimmerBoxes.map((_, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-4 space-y-4 animate-pulse"
        >
          {/* Image Shimmer */}
          <div className="w-full h-32 bg-gray-300 rounded-md"></div>

          {/* Price Shimmer */}
          <div className="w-1/2 h-5 bg-gray-300 rounded-md mx-auto"></div>
        </div>
      ))}
    </div>
  );
};

export default AllPricesShimmer;
