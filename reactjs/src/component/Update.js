import React from "react";
import { BackendPort } from "../Const/url";

function Update() {
  const [groupedData, setGroupedData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  // Function to group data by month
  const groupByMonth = (data) => {
    return data.reduce((acc, item) => {
      const createdAt = item.createdAt || new Date(); // Fallback to current date if createdAt is missing

      const date = new Date(createdAt);

      

      // Handle invalid date
      if (isNaN(date)) {
        console.warn(`Invalid date for item with ID ${item._id}: ${createdAt}`);
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

      return acc;
    }, {});
  };

  // Fetch updates
  async function getUpdates() {
    try {
      const response = await fetch(`${BackendPort}/admin/update`);
      const json = await response.json();
      if (json.success) {
        const grouped = groupByMonth(json.data);
        setGroupedData(grouped);
      } else {
        console.warn("Fetch unsuccessful:", json.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  }

  React.useEffect(() => {
    getUpdates();
  }, []);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      {loading ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : Object.keys(groupedData).length > 0 ? (
        Object.keys(groupedData).map((monthYear) => (
          <div key={monthYear} className="my-6">
            {/* Month and Year Heading */}
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
              {monthYear}
            </h2>

            {/* Horizontal Scrollable Container */}
            <div className="flex overflow-x-auto space-x-4 p-4">
              {groupedData[monthYear].map((data) => (
                <div
                  key={data._id}
                  className="flex-none w-72 sm:w-80 lg:w-96 p-4 border border-gray-200 rounded-lg shadow-lg bg-white"
                >
                  {/* Image with overlay text and glass blur effect */}
                  <div className="relative">
                    <img
                      className="rounded-xl shadow-2xl h-48 w-full object-cover"
                      src={data.ImageUrl}
                      alt="IPTV"
                    />
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-md rounded-b-xl p-4">
                      <span className="text-white text-center text-lg font-semibold">
                        {data.Description || "No description available"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-700">No updates available.</p>
      )}
    </div>
  );
}

export default Update;
