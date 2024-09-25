// src/AdminDashboard.js
import React, { useContext, useState } from 'react';
import { Context } from './RoutesAdmin';

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isProfileVisible, setProfileVisible] = useState(true);
  const {userInfo} = useContext(Context)
  const { userName, password, name, email, phone } = userInfo ;
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className={` inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
        </div>
        <nav className="mt-8">
          <ul>
          
            {/* <li><a href="" className="block px-4 py-2 hover:bg-gray-700">Dashboard</a></li>
            <li><a href="" className="block px-4 py-2 hover:bg-gray-700">Users</a></li>
            <li><a href="" className="block px-4 py-2 hover:bg-gray-700">Settings</a></li> */}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-gray-800">Welcome, {userName}</h2>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => setProfileVisible(!isProfileVisible)}
          >
            {isProfileVisible ? 'Hide Profile' : 'Show Profile'}
          </button>
        </header>

        {/* Main Content */}
        <main className="mt-8">
          {isProfileVisible && (
            <section className="p-4 bg-white rounded shadow-md">
              <h3 className="text-xl font-bold">Admin Profile</h3>
              <p className="mt-2 text-gray-600">Name: {name}</p>
              <p className="text-gray-600">Email: {email}</p>
              <p className="text-gray-600">Phone: {phone}</p>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
