import React, { Suspense, createContext, lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import WhatsNewVideoComponent from './Pages/WhatsNewVideoComponent';
import Update from './Pages/update';
import AdminSideBar from './Pages/AdminSideBar';
import AdminPrices from './AdminPrices';
import CarouselAdmin from './Carousel';
import { Loader2 } from "lucide-react";


const AdminDashboard = lazy(() => import('./DashBoardAdmin'))
const AdminDisplay = lazy(() => import('./AdminDisplay'))
const AdminLogin = lazy(() => import('./AdminLogin'))

export const Context = createContext()

const AdminRoutes = () => {
    const [loginState, setLoginState] = useState(false)
    const [userInfo, setUserInfo] = useState('')
    return (
        <Suspense fallback={<AdminLoader />}>
            <Context.Provider value={{ loginState, setLoginState, setUserInfo, userInfo }}>

                <AdminDisplay />
                <div className='flex'>
                    <div className=''>
                        <AdminSideBar />
                    </div>
                    <div className='w-full'>
                        <Routes>
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="/" element={<AdminLogin />} />
                            <Route path="login" element={<AdminLogin />} />
                            <Route path='whatsNewVideo' element={<WhatsNewVideoComponent />} />
                            <Route path='update' element={<Update />} />
                            <Route path='prices' element={<AdminPrices/>}/>
                            <Route path='carousel' element={<CarouselAdmin/>}/>
                        </Routes>
                    </div>
                </div>

            </Context.Provider>
        </Suspense>
    );
};

export default AdminRoutes;




const AdminLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <p className="text-gray-300 text-lg font-medium">Loading, please wait...</p>
        <div className="mt-2 text-sm text-gray-500">Preparing your dashboard...</div>
      </div>
    </div>
  );
};



