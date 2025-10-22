import React from 'react';
import FlipkartCard from './FlipkartCard';
import { Search } from 'lucide-react';

const FlipkartGrid = ({ items, isLoading = false }) => {
  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>
      
      {/* Content skeleton */}
      <div className="p-3 space-y-2">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        
        {/* Rating skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </div>
        
        {/* Price skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
        </div>
        
        {/* Features skeleton */}
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <Search size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No subscriptions found
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
        We couldn't find any subscriptions matching your criteria. Try adjusting your search or filters.
      </p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {items.length} {items.length === 1 ? 'result' : 'results'}
        </p>
        
        {/* Sort options - Flipkart style */}
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-gray-600 dark:text-gray-400">Sort by:</span>
          <select className="bg-transparent border-none text-gray-900 dark:text-white font-medium cursor-pointer focus:outline-none">
            <option>Relevance</option>
            <option>Price -- Low to High</option>
            <option>Price -- High to Low</option>
            <option>Newest First</option>
            <option>Popularity</option>
          </select>
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {items.map((item, index) => (
          <FlipkartCard key={`${item.Name}-${index}`} item={item} index={index} />
        ))}
      </div>

      {/* Load more button - Flipkart style */}
      {items.length > 0 && items.length % 12 === 0 && (
        <div className="flex justify-center pt-8">
          <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default FlipkartGrid;