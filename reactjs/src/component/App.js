import React, { Suspense, lazy, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Navbar } from './Header';
import { Footer } from './Footer';
import { Body } from './Body';
import AdminRoutes from '../Admin/RoutesAdmin';
import { subscribeToPush } from '../utils/push';
import { useSelector } from 'react-redux';

const Prices = lazy(() => import('./Prices'));
const Error = lazy(() => import('./Error'));
const PriceDetails = lazy(() => import('./PriceDetails'));
const AboutUs = lazy(() => import('./AboutUs'));
const ContactUs = lazy(() => import('./ContactUs'));
const Update = lazy(() => import('./Update'));
const Help = lazy(() => import('./Help'));
const Cart = lazy(() => import('./Cart'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const OrderTrackingPage = lazy(() => import('../pages/OrderTrackingPage'));
const ChatPage = lazy(() => import('../pages/ChatPage'));
const HouseHoldCode = lazy(() => import('../pages/HouseHoldCode'));

export const AppLayout = () => {
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      subscribeToPush();
    }
  }, [user]);

  return (
    <div className='bg-gradient-to-br from-gray-200 via-blue-200 to-green-300  min-h-screen'>
      <Navbar />
      <div className='' >
        <Suspense fallback={<div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

const Approuter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Body /> },
      { path: 'aboutUs', element: <AboutUs /> },
      { path: 'contact', element: <ContactUs /> },
      { path: 'help', element: <Help /> },
      { path: 'prices', element: <Prices /> },
      { path: 'updates', element: <Update /> },
      { path: 'cart', element: <Cart /> },
      { path: '/prices/:object', element: <PriceDetails /> },
      { path: '/price/:cat', element: <Prices /> },
      { path: 'admin/*', element: <AdminRoutes /> },
      { path : '/netflixCode' , element : <HouseHoldCode/>},
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/orders', element: <OrderTrackingPage /> },
      { path: '/chat', element: <ChatPage /> },
      { path: '*', element: <Error /> }
    ]
  }
]);


function App() {
  return <RouterProvider router={Approuter} />;
}

export default App;
