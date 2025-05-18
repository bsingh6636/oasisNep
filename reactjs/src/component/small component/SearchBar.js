import React, { useState, useEffect, useRef } from 'react';
import { Pricelist } from '../../const';
import { Link } from 'react-router-dom';

const SearchBar = ({ name, imageUrl }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchedItem, setSearchItem] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchValue(query);
    setSearchItem(
      query.length > 1
        ? Pricelist.filter((item) =>
            item.Name.toLowerCase().includes(query.toLowerCase())
          )
        : []
    );
  };

  return (
    <div 
      ref={searchRef}
      className="relative max-w-2xl mx-auto mt-1"
    >
      {/* User Profile (if imageUrl exists) */}
      {imageUrl && (
        <div className="flex items-center mb-4">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <span className="ml-3 font-medium text-gray-800">{name}</span>
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <input
          value={searchValue}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          type="text"
          placeholder="Search services..."
          className="w-full p-2 py-3 pl-12 pr-5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm text-gray-700 placeholder-gray-400"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {searchValue && (
          <button 
            onClick={() => {
              setSearchValue('');
              setSearchItem([]);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results */}
      {isFocused && searchedItem.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="py-1 max-h-80 overflow-y-auto">
            {searchedItem.slice(0, 5).map(item => {
              const firstPlanKey = Object.keys(item.plans)[0];
              const firstPlanValue = item.plans[firstPlanKey];

              return (
                <Link 
                  to={`/prices/${item.Name}`} 
                  key={item.id} 
                  className="block px-4 py-3 hover:bg-blue-50 transition-colors"
                  onClick={() => {
                    setSearchValue('');
                    setIsFocused(false);
                  }}
                >
                  <div className="flex items-center">
                    <img
                      src={item.ImageId}
                      alt={item.Name}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <div className="ml-3 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.Name}</h3>
                      <p className="text-xs text-gray-500">
                        Starting at Rs. {firstPlanValue} for {firstPlanKey} month
                      </p>
                    </div>
                    <div className="text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {isFocused && searchValue.length > 1 && searchedItem.length === 0 && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 p-4">
          <div className="text-center py-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No results</h3>
            <p className="mt-1 text-xs text-gray-500">We couldn't find any services matching "{searchValue}"</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;