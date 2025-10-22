import React from 'react';
import { Category } from "../const";
import { ChevronRight, TrendingUp } from 'lucide-react';

const FlipkartCategoryCards = () => {
  return (
    <section className="py-6 md:py-8 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Explore our wide range of subscription services
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            View All
            <ChevronRight size={16} />
          </button>
        </div>
        
        {/* Categories Grid - Flipkart Style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Category.map((category, index) => (
            <a 
              href={`/price/${category.name}`} 
              key={index} 
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 overflow-hidden">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-500 rounded-full translate-y-8 -translate-x-8"></div>
                </div>

                {/* Trending Badge for select items */}
                {index % 4 === 0 && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium">
                    <TrendingUp size={10} />
                    Hot
                  </div>
                )}
                
                {/* Icon Container */}
                <div className="relative mb-3 md:mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={category.imgurl} 
                      alt={category.name}
                      className="w-8 h-8 md:w-10 md:h-10 object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
                
                {/* Category Info */}
                <div className="text-center relative z-10">
                  <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </h3>
                  
                  {/* Mock item count */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {Math.floor(Math.random() * 50) + 10}+ services
                  </p>
                  
                  {/* Action indicator */}
                  <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs font-medium">Explore</span>
                    <ChevronRight size={12} className="ml-1" />
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="flex justify-center mt-6 md:hidden">
          <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium px-4 py-2 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            View All Categories
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export { FlipkartCategoryCards };