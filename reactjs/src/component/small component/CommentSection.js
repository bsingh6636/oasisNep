import React from 'react';

const CommentSection = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Comments</h2>

      {/* Comment Display */}
      {/* <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="text-gray-700">This is a sample comment that is displayed here. It can be any text you want to include.</p>
            </div> */}

      {/* Coming Soon Feature */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg">
        <p className="text-yellow-700 font-semibold">Feature Coming Soon!</p>
        <p className="text-gray-600">We're working hard to bring you this feature. Stay tuned for updates.</p>
      </div>
    </div>
  );
};

export default CommentSection;
