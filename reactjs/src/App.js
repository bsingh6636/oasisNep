import React, { useState } from 'react';
import { Navbar } from './component/Header';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Footer } from './component/Footer';
import { Provider } from 'react-redux';
import reduxstore from './Const/Reduxstore';
import Loader from './component/ui/loader';
// Lazy imports
const Prices = React.lazy(() => import('./component/Prices'));
const Error = React.lazy(() => import('./component/Error').then(m => ({ default: m.Error })));
const Body = React.lazy(() => import('./component/Body').then(m => ({ default: m.Body })));
const PriceDetails = React.lazy(() => import('./component/PriceDetails').then(m => ({ default: m.PriceDetails })));
const AboutUs = React.lazy(() => import('./component/AboutUs').then(m => ({ default: m.AboutUs })));
const ContactUs = React.lazy(() => import('./component/ContactUs').then(m => ({ default: m.ContactUs })));
const Update = React.lazy(() => import('./component/Update'));
const Help = React.lazy(() => import('./component/Help').then(m => ({ default: m.Help })));
const Cart = React.lazy(() => import('./component/Cart').then(m => ({ default: m.Cart })));
const AdminRoutes = React.lazy(() => import('./Admin/RoutesAdmin'));
const HouseHoldCode = React.lazy(() => import('./pages/HouseHoldCode'));
const SignIn = React.lazy(() => import('./app/login'));
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
       

         <React.Suspense fallback={ <Loader /> } >
           <Outlet />
         </React.Suspense>
        
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
      { path: 'signIn', element : <SignIn />  },
      { path: 'signUp', element : <SignIn />  },
      { path: '*', element: <Error /> }
    ],
  },
]);


function App() {
  return <RouterProvider router={Approuter} />;
}

export default App;
