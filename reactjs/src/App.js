import React, { useState } from 'react';
import { Navbar } from './component/Header';
import Prices from './component/Prices';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Error } from './component/Error';
import { Body } from './component/Body';
import { PriceDetails } from './component/PriceDetails';
import { AboutUs } from './component/AboutUs';
import { Footer } from './component/Footer';
import { ContactUs } from './component/ContactUs';
import Update from './component/Update';
import { Provider } from 'react-redux';
import reduxstore from './Const/Reduxstore';
import { Help } from './component/Help';
import { Cart } from './component/Cart';
import AdminRoutes from './Admin/RoutesAdmin';

const HouseHoldCode = React.lazy(()=> import('./pages/HouseHoldCode'))
export const MyContext = React.createContext();

export const AppLayout = () => {
  
  const [priceListAll, setPriceListAll] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div className='bg-gradient-to-br from-gray-200 via-blue-200 to-green-300  min-h-screen'>
      {/* bg-gradient-to-br from-gray-200 via-blue-200 to-green-300 */}

      <Provider store={reduxstore}>
        <MyContext.Provider value={{ priceListAll, setPriceListAll, isDarkMode, setIsDarkMode }} >
          <Navbar />
          <div className='' >

          <Outlet />
          </div>
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
      { path : '/netflixCode' , element : <HouseHoldCode/>},
      { path: '*', element: <Error /> }
    ],
  },
]);


function App() {
  return <RouterProvider router={Approuter} />;
}

export default App;
