import React, { useState, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import reduxstore from './Const/Reduxstore';

// Lazy imports
const Navbar = React.lazy(() => import('./component/Header').then(m => ({ default: m.Navbar })));
const Prices = React.lazy(() => import('./component/Prices'));
const Error = React.lazy(() => import('./component/Error').then(m => ({ default: m.Error })));
const Body = React.lazy(() => import('./component/Body').then(m => ({ default: m.Body })));
const PriceDetails = React.lazy(() => import('./component/PriceDetails').then(m => ({ default: m.PriceDetails })));
const AboutUs = React.lazy(() => import('./component/AboutUs').then(m => ({ default: m.AboutUs })));
const Footer = React.lazy(() => import('./component/Footer').then(m => ({ default: m.Footer })));
const ContactUs = React.lazy(() => import('./component/ContactUs').then(m => ({ default: m.ContactUs })));
const Update = React.lazy(() => import('./component/Update'));
const Help = React.lazy(() => import('./component/Help').then(m => ({ default: m.Help })));
const Cart = React.lazy(() => import('./component/Cart').then(m => ({ default: m.Cart })));
const AdminRoutes = React.lazy(() => import('./Admin/RoutesAdmin'));
const HouseHoldCode = React.lazy(() => import('./pages/HouseHoldCode'));

export const MyContext = React.createContext();

export const AppLayout = () => {
  const [priceListAll, setPriceListAll] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className='bg-gradient-to-br from-gray-200 via-blue-200 to-green-300 min-h-screen'>
      <Provider store={reduxstore}>
        <MyContext.Provider value={{ priceListAll, setPriceListAll, isDarkMode, setIsDarkMode }} >
          <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
            <Navbar />
            <div>
              <Outlet />
            </div>
            <Footer />
          </Suspense>
        </MyContext.Provider>
      </Provider>
    </div>
  );
};

const Approuter = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
        <AppLayout />
      </Suspense>
    ),
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
      { path: '/netflixCode', element: <HouseHoldCode /> },
      { path: '*', element: <Error /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={Approuter} />;
}

export default App;
