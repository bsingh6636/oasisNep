import React, { Suspense, createContext, lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import WhatsNewVideoComponent from './Pages/WhatsNewVideoComponent';


const AdminDashboard = lazy(()=>import('./DashBoardAdmin'))
const AdminDisplay = lazy(()=> import('./AdminDisplay'))
const AdminLogin = lazy(()=>import('./AdminLogin'))

export const Context = createContext()

const AdminRoutes = () => {
const [loginState , setLoginState] = useState(false)
const [userInfo , setUserInfo] = useState('')
    return (
        <Suspense fallback={<div>Loading...Admins</div>}>
           <Context.Provider value={{loginState , setLoginState , setUserInfo ,userInfo}}>
           <div>
           <AdminDisplay/>
           <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="login" element={<AdminLogin />} />
                <Route path = "dashboard" element={<AdminDashboard/>}/>
                <Route path = 'whatsNewVdieo' element={<WhatsNewVideoComponent/>}/>
            </Routes>
            </div>
           </Context.Provider>
        </Suspense>
    );
};

export default AdminRoutes;
