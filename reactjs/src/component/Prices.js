import React, { useContext, useEffect, useState } from "react";
import { Pricelist } from "../const";
import { useParams } from "react-router-dom";
import "../css/body.css";
import AllPrices from "./AllPrices";
import { MyContext } from "./App";
import { priceUpdate } from "../helper/priceUpdate";

export const Prices = () => {
  const { priceListAll, setPriceListAll } = useContext(MyContext);
  const { cat } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [priceListCopy, setPriceListCopy] = useState(Pricelist);

  // Function to filter the price list based on category and search value
  const filterPrices = () => {
    return Pricelist.filter((item) => {
      const matchesCategory = cat ? item.category === cat : true;
      const matchesSearch = item.Name.toLowerCase().includes(searchValue.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  useEffect(() => {
    const filteredList = filterPrices();
    setPriceListCopy(filteredList);
  }, [cat, searchValue]); // Dependency on both cat and searchValue

  useEffect(() => {
    const updatePrices = async () => {
      const response = await priceUpdate(priceListCopy);
      setPriceListCopy(response);
      setPriceListAll(response);
      console.log('Updated Prices:', response);
    };
    
    if (priceListCopy.length) {
      updatePrices();
    }
  }, [priceListCopy.length, setPriceListAll]); // Run when priceListCopy length changes

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const buttonFilter = (buttonName) => {
    setSearchValue(""); // Clear search when applying a filter
    setPriceListCopy(Pricelist.filter((data) => data.category === buttonName));
  };

  const clearFilters = () => {
    setSearchValue(""); // Clear search input
    setPriceListCopy(Pricelist); // Reset to the full list
  };

  return (
    <div className="mt-3 min-h-screen p-6">
      <div className="flex flex-wrap items-center justify-center mb-6 space-x-4">
        <input
          type="text"
          className="px-4 py-2 border mb-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out hover:shadow-lg"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Enter text"
        />
        <button
          onClick={clearFilters}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-full hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
        >
          Search
        </button>
        <button
          onClick={() => buttonFilter("vpn")}
          className="bg-gradient-to-r from-green-400 to-green-600 text-white px-5 py-2 rounded-full hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
        >
          VPN
        </button>
        <button
          onClick={() => buttonFilter("18+")}
          className="bg-gradient-to-r from-red-400 to-red-600 text-white px-5 py-2 rounded-full hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50 shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
        >
          18+
        </button>
        <button
          onClick={clearFilters}
          className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-5 py-2 rounded-full hover:from-gray-600 hover:to-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
        >
          Clear All
        </button>
      </div>
      <AllPrices Pricelistcopy={priceListCopy} />
    </div>
  );
};

export default Prices;
