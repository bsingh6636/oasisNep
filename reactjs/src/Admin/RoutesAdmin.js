import React, { Suspense, createContext, lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import WhatsNewVideoComponent from './Pages/WhatsNewVideoComponent';
import Update from './Pages/update';
import AdminSideBar from './Pages/AdminSideBar';
import AdminPrices from './AdminPrices';


const AdminDashboard = lazy(() => import('./DashBoardAdmin'))
const AdminDisplay = lazy(() => import('./AdminDisplay'))
const AdminLogin = lazy(() => import('./AdminLogin'))

export const Context = createContext()

const AdminRoutes = () => {
    const [loginState, setLoginState] = useState(false)
    const [userInfo, setUserInfo] = useState('')
    return (
        <Suspense fallback={<div>Loading...Admins</div>}>
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
                        </Routes>
                    </div>
                </div>

            </Context.Provider>
        </Suspense>
    );
};

export default AdminRoutes;
