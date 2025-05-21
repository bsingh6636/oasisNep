import React, { useContext, useEffect, useState } from "react";
import { BackendPort } from "../Const/url";
import { MyContext } from "./App";

function Update() {
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useContext(MyContext); // Get isDarkMode from context

  // Function to group data by month - with error handling
  const groupByMonth = (data) => {
    if (!Array.isArray(data)) {
      console.warn("Expected array for groupByMonth, received:", typeof data);
      return {};
    }
    
    return data.reduce((acc, item) => {
      if (!item) return acc; // Skip null or undefined items
      
      try {
        const createdAt = item.createdAt || new Date(); // Fallback to current date if createdAt is missing
        const date = new Date(createdAt);

        // Handle invalid date
        if (isNaN(date)) {
          console.warn(`Invalid date for item with ID ${item._id || 'unknown'}: ${createdAt}`);
          return acc; // Skip invalid dates
        }

        const monthYear = date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });

        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        acc[monthYear].push(item);
      } catch (err) {
        console.error("Error processing item in groupByMonth:", err);
      }

      return acc;
    }, {});
  };

  // Fetch updates - improved error handling
  const getUpdates = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${BackendPort}/admin/update`);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const json = await response.json();
      
      if (json.success) {
        const grouped = groupByMonth(json.data || []);
        setGroupedData(grouped);
      } else {
        console.warn("Fetch unsuccessful:", json.message);
        setError(json.message || "Failed to fetch updates");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message || "An error occurred while fetching updates");
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  useEffect(() => {
    getUpdates();
    // eslint-disable-next-line
  }, []);

  

  // Error display component
  const ErrorDisplay = ({ message }) => (
    <div className={`w-full p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-100'}`}>
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 mr-3 ${isDarkMode ? 'text-red-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-red-400' : 'text-red-800'}`}>
          Error Loading Updates
        </h3>
      </div>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{message}</p>
      <button 
        onClick={getUpdates}
        className={`mt-4 px-4 py-2 rounded-md transition-colors ${
          isDarkMode 
            ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700' 
            : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200'
        }`}
      >
        Try Again
      </button>
    </div>
  );

  // Helper function to safely render image with fallback
  const SafeImage = ({ src, alt, className }) => {
    const [imgError, setImgError] = useState(false);
    
    return imgError ? (
      <div className={`${className} flex items-center justify-center bg-gray-200 dark:bg-gray-700`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    ) : (
      <img
        className={className}
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setImgError(true)}
      />
    );
  };

  return (
    <div className={`p-4  mx-auto transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <h1 className={`text-3xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Updates
      </h1>
      
      {loading ? (
        renderSkeletons()
      ) : error ? (
        <ErrorDisplay message={error} />
      ) : Object.keys(groupedData).length > 0 ? (
        Object.keys(groupedData).map((monthYear) => (
          <div key={monthYear} className="my-10">
            {/* Month and Year Heading */}
            <div className="relative mb-6">
              <div className={`absolute inset-0 flex items-center ${isDarkMode ? 'opacity-70' : 'opacity-40'}`}>
                <div className={`h-px w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
              </div>
              <div className="relative flex justify-center">
                <h2 className={`text-2xl font-bold px-4 ${
                  isDarkMode 
                    ? 'bg-gray-900 text-gray-100' 
                    : 'bg-gray-50 text-gray-800'
                }`}>
                  {monthYear}
                </h2>
              </div>
            </div>

            {/* Horizontal Scrollable Container with improved scroll indicator */}
            <div className="relative">
              {/* Scroll shadows on edges */}
              <div className={`absolute top-0 bottom-0 left-0 w-8 pointer-events-none ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-gray-900 to-transparent' 
                  : 'bg-gradient-to-r from-gray-50 to-transparent'
              }`}></div>
              <div className={`absolute top-0 bottom-0 right-0 w-8 pointer-events-none ${
                isDarkMode 
                  ? 'bg-gradient-to-l from-gray-900 to-transparent' 
                  : 'bg-gradient-to-l from-gray-50 to-transparent'
              }`}></div>
              
              {/* Scrollable content */}
              <div className="flex overflow-x-auto space-x-6 p-4 pb-6" style={{scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth'}}>
                {groupedData[monthYear].map((data) => (
                  <div
                    key={data._id || Math.random().toString(36).substr(2, 9)}
                    className={`flex-none w-72 sm:w-80 lg:w-96 p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-[1.02] ${
                      isDarkMode 
                        ? 'bg-gray-800 border border-gray-700' 
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    {/* Image with overlay text and glass blur effect */}
                    <div className="relative overflow-hidden rounded-xl">
                      <SafeImage
                        className="rounded-xl shadow-lg h-48 sm:h-56 w-full object-cover transition-transform duration-700 hover:scale-110"
                        src={data.ImageUrl || ''}
                        alt="IPTV Update"
                      />
                      <div className={`absolute bottom-0 left-0 right-0 ${isDarkMode ? 'bg-black bg-opacity-60' : 'bg-black bg-opacity-40'} backdrop-blur-md rounded-b-xl p-4`}>
                        <span className="text-white text-center text-lg font-semibold">
                          {data.Description || "No description available"}
                        </span>
                      </div>
                    </div>
                    
                    {/* Additional metadata if available */}
                    {data.Date && (
                      <div className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span>
                          {new Date(data.Date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-16 w-16 ${isDarkMode ? 'text-gray-700' : 'text-gray-400'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
          <p className={`mt-4 text-xl font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            No updates available
          </p>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Check back later for new content
          </p>
          <button 
            onClick={getUpdates}
            className={`mt-6 px-4 py-2 rounded-md transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700' 
                : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200'
            }`}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}

export default Update;

 export const renderSkeletons = () => {
  return Array(3).fill(0).map((_, index) => (
    <div key={`skeleton-${index}`} className="my-10 animate-pulseSoft">
      {/* Section Title Placeholder */}
      <div className="h-5 w-40 mx-auto rounded bg-gray-200 dark:bg-gray-700 mb-6"></div>

      {/* Horizontal Card Row */}
      <div className="flex overflow-x-auto space-x-5 px-4">
        {Array(3).fill(0).map((_, cardIndex) => (
          <div
            key={`card-skeleton-${cardIndex}`}
            className="flex-none w-72 sm:w-80 lg:w-96 p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm transition-all"
          >
            {/* Image Placeholder */}
            <div className="h-44 w-full rounded-lg bg-gray-200 dark:bg-gray-700"></div>

            {/* Title Placeholder */}
            <div className="h-4 w-3/4 mt-5 rounded-md bg-gray-200 dark:bg-gray-700"></div>

            {/* Subtitle Placeholder */}
            <div className="h-4 w-1/2 mt-3 rounded-md bg-gray-200 dark:bg-gray-700"></div>

            {/* Button Placeholder */}
            <div className="h-10 w-full mt-6 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          </div>
        ))}
      </div>
    </div>
  ));
};
