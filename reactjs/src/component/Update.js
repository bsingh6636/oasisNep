import React, { useEffect, useState } from "react";

// This component is self-contained and does not need Redux state for now.
// It relies on Tailwind's dark mode feature, which is toggled in the Header.

function Update() {
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUpdates = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Assuming BackendPort is correctly configured elsewhere
      const BackendPort = 'http://localhost:8080'; 
      const response = await fetch(`${BackendPort}/admin/update`);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const json = await response.json();
      
      if (json.success) {
        const groupByMonth = (data) => {
            if (!Array.isArray(data)) return {};
            return data.reduce((acc, item) => {
                if (!item || !item.createdAt) return acc;
                const date = new Date(item.createdAt);
                if (isNaN(date)) return acc;
                const monthYear = date.toLocaleString("default", { month: "long", year: "numeric" });
                if (!acc[monthYear]) acc[monthYear] = [];
                acc[monthYear].push(item);
                return acc;
            }, {});
        };
        const grouped = groupByMonth(json.data || []);
        setGroupedData(grouped);
      } else {
        setError(json.message || "Failed to fetch updates");
      }
    } catch (error) {
      setError(error.message || "An error occurred while fetching updates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUpdates();
  }, []);

  const ErrorDisplay = ({ message }) => (
    <div className="w-full p-6 rounded-lg shadow-md bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800">
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-400">Error Loading Updates</h3>
      <p className="text-gray-700 dark:text-gray-300">{message}</p>
      <button onClick={getUpdates} className="mt-4 px-4 py-2 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
        Try Again
      </button>
    </div>
  );

  return (
    <div className="p-4 mx-auto text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Updates</h1>
      
      {loading ? (
        renderSkeletons()
      ) : error ? (
        <ErrorDisplay message={error} />
      ) : Object.keys(groupedData).length > 0 ? (
        Object.keys(groupedData).map((monthYear) => (
          <div key={monthYear} className="my-10">
            <h2 className="text-2xl font-bold text-center mb-6">{monthYear}</h2>
            {/* Content */}
          </div>
        ))
      ) : (
        <div className="text-center py-20">
          <p>No updates available.</p>
        </div>
      )}
    </div>
  );
}

export default Update;

 export const renderSkeletons = () => {
    return Array(3).fill(0).map((_, index) => (
        <div key={`skeleton-${index}`} className="my-10 animate-pulse">
          <div className="h-5 w-40 mx-auto rounded bg-gray-200 dark:bg-gray-700 mb-6"></div>
          <div className="flex overflow-x-auto space-x-5 px-4">
            {Array(3).fill(0).map((_, cardIndex) => (
              <div key={`card-skeleton-${cardIndex}`} className="flex-none w-80 p-5 rounded-xl bg-gray-50 dark:bg-gray-800">
                <div className="h-44 w-full rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-3/4 mt-5 rounded-md bg-gray-200 dark:bg-gray-700"></div>
              </div>
            ))}
          </div>
        </div>
      ));
};
