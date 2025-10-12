import React, { useContext, useEffect, useState, useMemo } from "react";
import { Pricelist as PricelistMock } from "../const";
import { useParams, Link } from "react-router-dom";
import "../css/body.css";
import { MyContext } from "../App";
import { priceUpdate } from "../helper/priceUpdate";

import { Search, Filter, X, ChevronRight } from "lucide-react";
import { renderSkeletons } from "./Update";

export const Prices = () => {
  const { priceListAll, setPriceListAll } = useContext(MyContext);
  const { cat } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [priceListCopy, setPriceListCopy] = useState(priceListAll || PricelistMock);
  const [isLoading, setIsLoading] = useState(!priceListAll.length);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Memoize filtering logic to avoid recalculating on every render
  const filteredPrices = useMemo(() => {
    return priceListCopy.filter((item) => {
      const matchesCategory = cat ? item.category === cat : true;
      const matchesSearch = item.Name.toLowerCase().includes(searchValue.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [priceListCopy, cat, searchValue]);

  useEffect(() => {
    // Fetch and update prices only if priceListAll is empty
    if (!priceListAll.length) {
      const updatePrices = async () => {
        setIsLoading(true);
        try {
          const response = await priceUpdate(PricelistMock);
          setPriceListAll(response);
          setPriceListCopy(response);
        } catch (error) {
          console.log('Failed to fetch prices', error);
          // Fallback to mock data if API fails
          setPriceListCopy(PricelistMock);
        } finally {
          setIsLoading(false);
        }
      };
      updatePrices();
    }
  }, [priceListAll, setPriceListAll]);

  // Set initial filter based on cat param
  useEffect(() => {
    if (cat) {
      setActiveFilter(cat);
    }
  }, [cat]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  const buttonFilter = (buttonName) => {
    setActiveFilter(buttonName);
    setShowFilterDrawer(false);
    
    if (buttonName === "all") {
      setPriceListCopy(priceListAll.length ? priceListAll : PricelistMock);
      return;
    }
    
    setPriceListCopy(
      priceListAll.length ? 
        priceListAll.filter((data) => data.category === buttonName) : 
        PricelistMock.filter((data) => data.category === buttonName)
    );
  };

  // Filter options for categories
  const filterOptions = [
    { name: "All", category: "all" },
    { name: "VPN", category: "vpn" },
    { name: "OTT", category: "ott" },
    { name: "Music", category: "music" },
    { name: "18+", category: "18+" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 text-gray-800 dark:text-gray-100">
      {/* Fixed Header with sticky search - Always visible */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-3 py-3">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-xl font-bold truncate flex-shrink-0 text-gray-900 dark:text-white">Subscriptions</h1>
            
            <div className="flex items-center gap-2">
              {/* Filter button for mobile */}
              <button 
                onClick={() => setShowFilterDrawer(true)}
                className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full relative"
                aria-label="Filter options"
              >
                <Filter size={20} className="text-gray-700 dark:text-gray-300" />
                {activeFilter !== "all" && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-purple-600 rounded-full border-2 border-white dark:border-gray-900"></span>
                )}
              </button>
            </div>
          </div>

          {/* Search bar - Full width on mobile */}
          <div className="mt-3 relative">
            <div className="relative flex items-center">
              <Search size={18} className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscriptions..."
                value={searchValue}
                onChange={handleSearch}
                className="w-full bg-gray-100 dark:bg-gray-800 rounded-full py-2 pl-10 pr-10 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 shadow-inner border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              {searchValue && (
                <button 
                  onClick={clearSearch}
                  className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Horizontal filter pills - scrollable */}
          <div className="flex mt-3 pb-1 space-x-1.5 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {filterOptions.map((option) => (
              <button
                key={option.category}
                onClick={() => buttonFilter(option.category)}
                className={`px-3 py-1.5 text-xs rounded-full transition-colors whitespace-nowrap flex-shrink-0 ${
                  activeFilter === option.category
                    ? 'bg-purple-600 dark:bg-purple-700 text-white font-medium shadow-sm'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${showFilterDrawer ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setShowFilterDrawer(false)}>
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-xl p-4 transition-transform duration-300 ${showFilterDrawer ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Subscriptions</h3>
            <button 
              onClick={() => setShowFilterDrawer(false)}
              className="p-1 rounded-full bg-gray-100 dark:bg-gray-800"
            >
              <X size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {filterOptions.map((option) => (
              <button
                key={option.category}
                onClick={() => buttonFilter(option.category)}
                className={`py-3 rounded-lg transition-colors flex items-center justify-center ${
                  activeFilter === option.category
                    ? 'bg-purple-600 dark:bg-purple-700 text-white font-medium'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {option.name}
                {activeFilter === option.category && (
                  <ChevronRight size={16} className="ml-1" />
                )}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setShowFilterDrawer(false)}
            className="w-full py-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 font-medium"
          >
            Close
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-3 pb-6">
        {/* Results count */}
        <div className="py-3 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
          <span>
            {filteredPrices.length} {filteredPrices.length === 1 ? 'subscription' : 'subscriptions'} found
          </span>
          {activeFilter !== "all" && (
            <button
              onClick={() => buttonFilter("all")}
              className="text-purple-600 dark:text-purple-400 flex items-center"
            >
              Clear filter <X size={14} className="ml-1" />
            </button>
          )}
        </div>
        
        {/* Cards Grid */}
        {isLoading ? (
          // <AllPricesShimmer />
          renderSkeletons()
        ) : (
          <AllPrices Pricelistcopy={filteredPrices} />
        )}
      </div>
    </div>
  );
};

// AllPrices component directly in the same file
const AllPrices = ({ Pricelistcopy }) => {
  // If no data provided, use empty array to prevent errors
  if (!Pricelistcopy || Pricelistcopy.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Search size={24} className="text-gray-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">No subscriptions found</p>
        <p className="text-gray-500 dark:text-gray-500 text-xs">Try a different search or filter</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {Pricelistcopy.map((item, index) => {
        // Get the first plan if available
        let firstPlanKey, firstPlanValue;
        if (item.plans && Object.keys(item.plans).length > 0) {
          firstPlanKey = Object.keys(item.plans)[0];
          firstPlanValue = item.plans[firstPlanKey];
        }

        return (
          <Link 
            to={`/prices/${item.Name}`} 
            key={index} 
            className="block group"
          >
            <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 hover:shadow-purple-500/10 dark:hover:shadow-purple-600/10">
              {/* Card with fixed aspect ratio */}
              <div className="pb-[130%] relative">
                {/* Category badge */}
                <div className="absolute top-2 right-2 z-10">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-sm uppercase tracking-wide font-medium ${getCategoryStyle(item.category)}`}>
                    {item.category}
                  </span>
                </div>
                
                {/* Logo Container centered in the top 2/3 of the card */}
                <div className="absolute top-0 left-0 w-full h-3/5 p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                  <img 
                    src={item.imgid || item.ImageId || "/api/placeholder/400/250"} 
                    alt={item.Name} 
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/api/placeholder/400/250";
                    }}
                  />
                </div>
                
                {/* Content section */}
                <div className="absolute bottom-0 left-0 w-full h-2/5 p-3 flex flex-col justify-between">
                  {/* Title */}
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {item.Name}
                  </h3>
                  
                  {/* Price badge - bottom aligned */}
                  {item.plans && firstPlanKey ? (
                    <div className="mt-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500 dark:text-gray-400">
                          {firstPlanKey} month
                        </span>
                        <span className="text-xs font-semibold text-purple-700 dark:text-purple-400">
                          NPR {firstPlanValue}
                        </span>
                      </div>
                      <div className="w-full h-1 bg-gray-100 dark:bg-gray-700 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{width: '30%'}}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                      Contact for pricing
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

// Helper function for category styling
const getCategoryStyle = (category) => {
  if (!category) return 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
  
  const styles = {
    'vpn': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
    'ott': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
    'music': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400',
    '18+': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
  };
  
  return styles[category.toLowerCase()] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
};

// Add custom CSS through Tailwind's extend for scrollbars
const scrollbarStyles = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer utilities {
    .scrollbar-thin {
      scrollbar-width: thin;
    }
    .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
      background-color: #D1D5DB;
      border-radius: 20px;
    }
    .scrollbar-thumb-gray-700::-webkit-scrollbar-thumb {
      background-color: #4B5563;
      border-radius: 20px;
    }
    .scrollbar-track-transparent::-webkit-scrollbar-track {
      background-color: transparent;
    }
    .scrollbar-thin::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  /* Animation for drawer */
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
`;

// Insert the style into the document (in a real app, this would be in your CSS file)
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = scrollbarStyles;
  document.head.appendChild(styleElement);
}

export default Prices;