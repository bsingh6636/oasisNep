import React from 'react';
import { Category } from "../const";

const DynamicCategorySection = () => {
  return (
    <section className="py-6 md:py-12 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="container mx-auto px-3 md:px-4">
        {/* Header - smaller on mobile */}
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3">Categories</h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg px-2">
            Explore our subscription services at the best prices
          </p>
        </div>
        
        {/* Badge layout - grid for better space utilization */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto px-1 sm:px-2">
          {Category.map((category, index) => (
            <a 
              href={`/price/${category.name}`} 
              key={index} 
              className="relative group"
            >
              <div className="flex items-center space-x-2 md:space-x-3 px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 bg-white dark:bg-gray-900 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 border border-gray-200 dark:border-gray-800 group-hover:border-blue-300 dark:group-hover:border-blue-900">
                {/* Accent dot for select items */}
                {index % 3 === 0 && (
                  <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full hidden sm:block"></div>
                )}
                
                {/* Icon - size responsive to screen */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={category.imgurl} 
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                {/* Category name - size responsive to screen */}
                <span className="font-medium text-sm sm:text-base md:text-lg text-gray-900 dark:text-white truncate">
                  {category.name}
                </span>
                
                {/* Arrow - size responsive to screen */}
                <svg 
                  className="w-4 h-4 md:w-5 md:h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300 flex-shrink-0" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export { DynamicCategorySection };