import React, { useState } from 'react';
import { FlipkartCategoryCards } from './FlipkartCategoryCards';
import FlipkartLayout from './FlipkartLayout';
import { Pricelist as mockData } from '../const';

const FlipkartDemo = () => {
  const [filteredItems, setFilteredItems] = useState(mockData);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredItems(mockData);
      return;
    }
    
    const filtered = mockData.filter(item =>
      item.Name?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleFilter = (category) => {
    setActiveCategory(category);
    
    if (category === 'all') {
      setFilteredItems(mockData);
    } else {
      const filtered = mockData.filter(item => item.category === category);
      setFilteredItems(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section with Categories */}
      <div className="bg-white dark:bg-gray-900 shadow-sm">
        <FlipkartCategoryCards />
      </div>

      {/* Main Products Section */}
      <FlipkartLayout
        items={filteredItems}
        isLoading={isLoading}
        onSearch={handleSearch}
        onFilter={handleFilter}
        activeCategory={activeCategory}
      />

      {/* Footer Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Get the Best Subscription Deals
          </h2>
          <p className="text-blue-100 mb-4">
            Save up to 70% on premium subscriptions with our exclusive offers
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Explore All Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlipkartDemo;