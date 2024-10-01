import React, { useState } from 'react';
import { Navbar } from './Header';
import Prices from './Prices';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Error } from './Error';
import { Body } from './Body';
import { PriceDetails } from './PriceDetails';
import { AboutUs } from './AboutUs';
import { Footer } from './Footer';
import { ContactUs } from './ContactUs';
import Update from './Update';
import { Provider } from 'react-redux';
import reduxstore from '../Const/Reduxstore';
import { Help } from './Help';
import { Cart } from './Cart';
import AdminRoutes from '../Admin/RoutesAdmin';

export const MyContext = React.createContext();

export const AppLayout = () => {
  
  const [priceListAll, setPriceListAll] = useState([])
  return (
    <div className=' bg-gradient-to-br from-gray-200 via-blue-200 to-green-300  min-h-screen'>
      {/* bg-gradient-to-br from-gray-200 via-blue-200 to-green-300 */}

      <Provider store={reduxstore}>
        <MyContext.Provider value={{ priceListAll, setPriceListAll }} >
          <Navbar />
          <Outlet />
          <Footer />
        </MyContext.Provider>
      </Provider>
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
      { path: '*', element: <Error /> }
    ],
  },
]);


function App() {
  return <RouterProvider router={Approuter} />;
}

export default App;
