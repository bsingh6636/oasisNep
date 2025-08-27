import React from "react";

const Card = ({ title, description, children, className = "" }) => {
  return (
    <div className={`group relative rounded-2xl ${className}`}>
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Actual card content */}
      <div className="relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-md transition-transform duration-300 group-hover:scale-[1.02]">
        {title && (
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h3>
        )}
        {description && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}

        {/* Custom children inside */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Card;
