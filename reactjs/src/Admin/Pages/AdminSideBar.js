import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../RoutesAdmin';


const AdminSideBar = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const { loginState } = useContext(Context)
  console.log(loginState)
  useEffect(() => {
    if (loginState) setSidebarOpen(true)
    else setSidebarOpen(false);
  }, [loginState])
  console.log(isSidebarOpen)
  return (
    <aside
      className={`inset-y-0 left-0 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
    >
      <div className="p-5">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          className="mt-5 px-4 py-2 w-full text-sm bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        // onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>
        <Link to="/admin/prices">
          <button className="mt-3 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-300">
            Prices
          </button>
        </Link>
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
  )
}

export default AdminSideBar