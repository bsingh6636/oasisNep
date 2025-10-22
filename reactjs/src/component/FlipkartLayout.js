import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ChevronDown, Grid, List, SlidersHorizontal } from 'lucide-react';
import FlipkartGrid from './FlipkartGrid';

const FlipkartLayout = ({ 
  items = [], 
  isLoading = false, 
  onSearch, 
  onFilter,
  categories = [],
  activeCategory = 'all'
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Filter options
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price -- Low to High' },
    { value: 'price-high', label: 'Price -- High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'rating', label: 'Customer Rating' }
  ];

  const filterCategories = [
    { name: 'All', value: 'all', count: items.length },
    { name: 'VPN', value: 'vpn', count: items.filter(item => item.category === 'vpn').length },
    { name: 'OTT', value: 'ott', count: items.filter(item => item.category === 'ott').length },
    { name: 'Music', value: 'music', count: items.filter(item => item.category === 'music').length },
    { name: '18+', value: '18+', count: items.filter(item => item.category === '18+').length }
  ];

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) onSearch(value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchValue('');
    if (onSearch) onSearch('');
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    if (onFilter) onFilter(category);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header with Search */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Top row - Title and actions */}
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Subscriptions
            </h1>
            
            {/* Desktop view controls */}
            <div className="hidden md:flex items-center gap-3">
              {/* <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <List size={16} />
                </button>
              </div> */}
              
              {/* <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button> */}
            </div>

            {/* Mobile filter button */}
            {/* <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              <Filter size={20} />
            </button> */}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for subscriptions, brands and more..."
              value={searchValue}
              onChange={handleSearch}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-3 pl-11 pr-10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
            {searchValue && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
            {filterCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryFilter(category.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span>{category.name}</span>
                <span className="text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {showFilters && (
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 sticky top-24">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Filters</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Sort by</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Price Range</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>₹0</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <FlipkartGrid items={items} isLoading={isLoading} viewMode={viewMode} />
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setShowFilters(false)}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-xl p-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters & Sort</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Mobile filter content */}
            <div className="space-y-6">
              {/* Sort */}
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Sort by</h4>
                <div className="grid grid-cols-2 gap-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`p-3 rounded-lg text-sm transition-colors ${
                        sortBy === option.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply button */}
              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlipkartLayout;