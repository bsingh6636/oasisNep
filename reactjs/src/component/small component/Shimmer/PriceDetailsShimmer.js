

const PriceDetailsShimmer = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 shadow-lg rounded-lg bg-gradient-to-br from-gray-50 to-gray-200 animate-pulse">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <div className="w-full h-[350px] bg-gray-300 rounded-lg shadow-inner"></div>
        </div>
        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-8 space-y-4">
          <div className="h-8 bg-gray-300 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-12 bg-gray-300 rounded-md"></div>
          <div className="flex space-x-2">
            <div className="w-20 h-10 bg-gray-300 rounded-md"></div>
            <div className="w-20 h-10 bg-gray-300 rounded-md"></div>
            <div className="w-20 h-10 bg-gray-300 rounded-md"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded-md"></div>
          <div className="flex space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default PriceDetailsShimmer;
;
