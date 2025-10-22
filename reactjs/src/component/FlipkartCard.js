import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import LazyImage from './ui/lazy-image';

const FlipkartCard = ({ item, index }) => {
  // Get the first plan if available
  let firstPlanKey, firstPlanValue, originalPrice;
  if (item.plans && Object.keys(item.plans).length > 0) {
    firstPlanKey = Object.keys(item.plans)[0];
    firstPlanValue = item.plans[firstPlanKey];
    originalPrice = Math.round(firstPlanValue * 1.2);
  }

  const category = (item.category || item.Category)?.toUpperCase();

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm card-hover overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 animate-fade-in-up">
      {/* Wishlist Button */}
      {/* <button className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white dark:hover:bg-gray-700">
        <Heart size={14} className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400" />
      </button> */}


      <Link to={`/prices/${item.Name}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-50 dark:bg-gray-900 p-4 flex items-center justify-center overflow-hidden">
          <LazyImage 
            src={item.imgid || item.ImageId} 
            alt={item.Name}
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Category Badge */}
          <div className="absolute bottom-2 left-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryStyle(category)}`}>
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          {/* Title */}
          <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.Name}
          </h3>



          {/* Price Section */}
          {item.plans && firstPlanKey ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ₹{firstPlanValue}
                </span>
                {originalPrice && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    ₹{originalPrice}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {firstPlanKey} month plan
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 dark:text-gray-400 italic">
              Contact for pricing
            </div>
          )}

    
        </div>
      </Link>

      {/* Add to Cart Button - appears on hover */}
      {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white dark:from-gray-800 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <button className="w-full flipkart-gradient-orange text-white text-sm font-medium py-2.5 rounded-md flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg focus-flipkart">
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div> */}
    </div>
  );
};

const getCategoryStyle = (category) => {
  if (!category) return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
  
  const styles = {
    'vpn': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    'ott': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    'music': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
    '18+': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
  };
  
  return styles[category.toLowerCase()] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
};

export default FlipkartCard;