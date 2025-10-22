import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../RoutesAdmin';
import { Home, DollarSign, Video, Bell, Image, Menu, ChevronRight, LogOut } from 'lucide-react';
import { handleAdminLogout } from '../utils/services';

const AdminSideBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { userInfo  } = useContext(Context);
  const location = useLocation();

  // Navigation items array with path, name, and icon
  const navItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: <Home size={18} /> },
    { path: '/admin/prices', name: 'Prices', icon: <DollarSign size={18} /> },
    { path: '/admin/whatsNewVideo', name: 'What\'s New Video', icon: <Video size={18} /> },
    { path: '/admin/update', name: 'Updates', icon: <Bell size={18} /> },
    { path: '/admin/carousel', name: 'Carousel', icon: <Image size={18} /> },
    // { path: '/admin/settings', name: 'Settings', icon: <Settings size={18} /> },
  ];

  useEffect(() => {
    if (userInfo) setSidebarOpen(true);
    else setSidebarOpen(false);
  }, [userInfo]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const logOut = async () =>{
    try {
      await handleAdminLogout();
      setLoginState(false);
    } catch (error) {
      console.log(error)
    }
  }

  if(!userInfo) return null;

  return (
    <>
      <button
        className="fixed z-20 bottom-4 left-4 p-2 rounded-full bg-blue-600 text-white shadow-lg md:hidden"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`w-64 bg-gray-900 text-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={toggleSidebar}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-semibold">
              A
            </div>
            <div>
              <p className="font-medium">{userInfo?.name}</p>
              <p className="text-xs text-gray-400">{userInfo?.email}</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-4 px-2">Main Navigation</p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                  {location.pathname === item.path && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            <li  >
              {/* Logout */}
              <div>
                <button
                  className="flex items-center w-full px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
                  onClick={logOut}
                >
                  <LogOut size={18} className="mr-3" />
                  <span>Logout</span>
                </button>
              </div>

            </li>
          </ul>


          {/* <button
            className="flex items-center w-full px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
            onClick={() => {
              console.log('Logging out');
            }}
          >
            <LogOut size={18} className="mr-3" />
            <span>Logout</span>
          </button> */}
        </nav>


        {/* <div className="absolute bottom-0 w-full p-4">
          <p className="text-xs text-gray-500 text-center">
            Admin Panel v1.0.0
          </p>
        </div> */}
      </aside>
    </>
  );
};

export default AdminSideBar;