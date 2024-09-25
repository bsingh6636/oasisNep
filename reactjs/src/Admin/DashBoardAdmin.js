// src/AdminDashboard.js
import React, { useContext, useState } from 'react';
import { Context } from './RoutesAdmin';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isProfileVisible, setProfileVisible] = useState(true);
  const { userInfo } = useContext(Context);
  const { userName, name, email, phone } = userInfo;

  return (
    <div className="flex h-screen bg-gray-50">
      <aside
        className={`inset-y-0 left-0 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <div className="p-5">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            className="mt-5 px-4 py-2 w-full text-sm bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
          <Link to="/admin/whatsNewVideo">
            <button className="mt-3 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-300">
              What's New Video
            </button>
          </Link>
          <Link to="/admin/update">
            <button className="mt-3 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-300">
              Updates New
            </button>
          </Link>
        </div>
        <nav className="mt-8 space-y-2 px-4">
          <ul>
            {/* Add sidebar navigation links here */}
          </ul>
        </nav>
      </aside>

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
