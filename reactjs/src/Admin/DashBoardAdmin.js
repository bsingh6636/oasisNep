// src/AdminDashboard.js
import React, { useContext, useState, useEffect } from 'react';
import { Context } from './RoutesAdmin';

const AdminDashboard = () => {
  const [isProfileVisible, setProfileVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const { userInfo } = useContext(Context);
  const { userName, name, email, phone } = userInfo;

  // Set up the current time display
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  // Check system preference for dark mode
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Top Navigation */}
      <nav className={`w-full px-6 py-3 flex justify-between items-center ${darkMode ? 'bg-gray-800 shadow-md' : 'bg-white shadow-sm'}`}>
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h1 className="text-xl font-bold">Admin Portal</h1>
        </div>

        <div className="flex items-center space-x-4">
          <span className={`hidden sm:block ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{currentTime}</span>

          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <div className="relative">
            <button className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-medium">
              {userName ? userName.charAt(0).toUpperCase() : 'A'}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 space-y-6">
        {/* Welcome Banner */}
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between ${
          darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-green-50 to-teal-50'
        } rounded-xl p-6 shadow-sm`}>
          <div>
            <h2 className="text-2xl font-bold">
              Welcome back, {userName}
              <span className="block mt-1 text-sm font-normal opacity-75">
                {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </h2>
          </div>

          <button
            className={`mt-4 md:mt-0 px-4 py-2 rounded-lg transition-all duration-300 ${
              darkMode
                ? 'bg-gray-700 text-green-400 hover:bg-gray-600 border border-gray-600'
                : 'bg-white text-green-600 hover:bg-green-50 shadow-sm'
            }`}
            onClick={() => setProfileVisible(!isProfileVisible)}
          >
            {isProfileVisible ? 'Hide Profile' : 'Show Profile'}
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          {isProfileVisible && (
            <div className={`${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            } rounded-xl shadow-sm overflow-hidden lg:col-span-1`}>
              <div className={`p-6 ${darkMode ? 'border-b border-gray-700' : 'border-b'}`}>
                <h3 className="text-xl font-semibold">Admin Profile</h3>
              </div>

              <div className="p-6 space-y-4">
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-green-500 text-white flex items-center justify-center text-3xl font-semibold">
                      {name ? name.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Profile Details */}
                <div className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'} p-4 rounded-lg`}>
                  <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-sm">{name}</p>
                  </div>

                  <div className="flex items-center space-x-3 mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">{email}</p>
                  </div>

                  <div className="flex items-center space-x-3 mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-sm">{phone}</p>
                  </div>
                </div>

                <button
                  className={`w-full mt-6 px-4 py-3 rounded-lg ${
                    darkMode
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  } transition-colors duration-300 font-medium`}
                  onClick={() => alert('Profile updated')}
                >
                  Update Profile
                </button>
              </div>
            </div>
          )}

          {/* Dashboard Stats */}
          <div className={`${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          } rounded-xl shadow-sm p-6 ${isProfileVisible ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <h3 className="text-xl font-semibold mb-6">Dashboard Overview</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-green-600'}`}>Total Users</p>
                    <p className="text-2xl font-bold mt-1">1,284</p>
                  </div>
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-green-400' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    +14% from last month
                  </span>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-blue-600'}`}>Revenue</p>
                    <p className="text-2xl font-bold mt-1">$32,450</p>
                  </div>
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    +5.2% from last month
                  </span>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-purple-600'}`}>Tickets</p>
                    <p className="text-2xl font-bold mt-1">42</p>
                  </div>
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    12 new today
                  </span>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-amber-50'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-amber-600'}`}>Avg. Response</p>
                    <p className="text-2xl font-bold mt-1">1.5 hours</p>
                  </div>
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-amber-400' : 'text-amber-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                    -30 minutes from last month
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
