// src/AdminDashboard.js
import React, { useContext, useState } from 'react';
import { Context } from './RoutesAdmin';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  
  const [isProfileVisible, setProfileVisible] = useState(true);
  const { userInfo } = useContext(Context);
  const { userName, name, email, phone } = userInfo;

  return (
    <div className="flex h-screen bg-gray-50">
     

      <div className="flex-1 p-6 space-y-6 transition-all">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow p-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900">Welcome, {userName}</h2>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
            onClick={() => setProfileVisible(!isProfileVisible)}
          >
            {isProfileVisible ? 'Hide Profile' : 'Show Profile'}
          </button>
        </header>

        {/* Main Content */}
        <main>
          {isProfileVisible && (
            <section className="p-6 bg-white rounded-lg shadow-lg space-y-4">
              <h3 className="text-xl font-bold">Admin Profile</h3>
              <p className="text-gray-700">Name: {name}</p>
              <p className="text-gray-700">Email: {email}</p>
              <p className="text-gray-700">Phone: {phone}</p>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                onClick={() => alert('Profile updated')}
              >
                Update Profile
              </button>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
