import React from 'react';

export const Household = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Household Steps</h3>
      
      <div className="space-y-8">
        <div className="animate-fadeIn">
          <h3 className="text-lg font-semibold text-gray-700 p-2">Step 1: Close the Netflix App (Remove it from recent too)</h3>
          <img className="w-full max-w-md mx-auto rounded-lg shadow-lg" src="https://res.cloudinary.com/bsingh6636/image/upload/v1716634456/page/IMG_8110_to9q6z.jpg" alt="household step 1" />
        </div>

        <div className="animate-fadeIn delay-100">
          <h3 className="text-lg font-semibold text-gray-700 p-2">Step 2: Turn on ✈️ flight mode (turn off mobile data and Wi-Fi)</h3>
          <img className="w-full max-w-md mx-auto rounded-lg shadow-lg" src="https://res.cloudinary.com/bsingh6636/image/upload/v1716634454/page/IMG_8111_ywwxb4.jpg" alt="household step 2" />
        </div>

        <div className="animate-fadeIn delay-200">
          <h3 className="text-lg font-semibold text-gray-700 p-2">Step 3: Open Netflix. You'll see a "No internet connection" error</h3>
          <img className="w-full max-w-md mx-auto rounded-lg shadow-lg" src="https://res.cloudinary.com/bsingh6636/image/upload/v1716634455/page/IMG_8112_hrfjnp.jpg" alt="household step 3" />
        </div>

        <div className="animate-fadeIn delay-300">
          <h3 className="text-lg font-semibold text-gray-700 p-2">Step 4: Turn off flight mode <span className="text-blue-600 font-bold">(Check below step 5 too)</span></h3>
          <img className="w-full max-w-md mx-auto rounded-lg shadow-lg" src="https://res.cloudinary.com/bsingh6636/image/upload/v1716634456/page/IMG_8113_bgv1xb.jpg" alt="household step 4" />
        </div>

        <div className="p-4 border-2 border-red-500 rounded-lg bg-red-50 animate-fadeIn delay-400">
          <h3 className="text-lg font-semibold text-red-700">Step 5: Netflix settled</h3>
          <p className="text-red-700">Don't remove the Netflix app from recent to avoid this issue</p>
          <img className="w-full max-w-md mx-auto rounded-lg shadow-lg mt-2" src="https://res.cloudinary.com/bsingh6636/image/upload/v1716634456/page/IMG_8114_aegeok.jpg" alt="household step 5" />
        </div>
      </div>
    </div>
  );
};

export default Household;
