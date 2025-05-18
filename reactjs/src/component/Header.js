import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../css/Header.css';
import { whatsappImageUrl } from '../Const/url';

export const Navbar = () => {
  const cartItems = useSelector(store => store.cart.items);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-200 shadow-md">
      <HeaderSocial />
      
      <nav className="container mx-auto px-4 py-1 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="relative !h-14 !w-14 sm:!h-10 sm:!w-10 rounded-full overflow-hidden p-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 shadow-lg hover:shadow-xl transition-shadow">
              <img 
                className="h-full w-full rounded-full border-2 border-white object-cover" 
                src="/bsinghLogo.jpeg" 
                alt="Company Logo" 
              />
            </div>
          </Link>
        </div>
  
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {[
              { path: '/', name: 'Home' },
              { path: '/prices', name: 'Prices' },
              { path: '/updates', name: 'Updates' },
              { path: '/aboutUs', name: 'About Us' },
              { path: '/help', name: 'Help' },
              { path: '/contact', name: 'Contact' }
            ].map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
  
          <Link to="/cart" className="relative group">
            <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <i className="fa-solid fa-cart-shopping text-xl text-gray-700 group-hover:text-blue-600 transition-colors"></i>
              {cartItems && cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-xs text-white font-bold flex items-center justify-center rounded-full animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>
        </div>
  
        <div className="md:hidden flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <i className="fa-solid fa-cart-shopping text-xl text-gray-700"></i>
            {cartItems && cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-xs text-white font-bold flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
          
          <button 
            onClick={handleToggle}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
  
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6">
            <ul className="space-y-4">
              {[
                { path: '/', name: 'Home' },
                { path: '/prices', name: 'Prices' },
                { path: '/updates', name: 'Updates' },
                { path: '/aboutUs', name: 'About Us' },
                { path: '/help', name: 'Help' },
                { path: '/contact', name: 'Contact' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="block py-2 text-gray-700 hover:text-blue-600 font-medium border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;


const HeaderSocial = () => {
  return (
    <header className="w-full bg-black text-white p-2">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* <div className="mb-4 md:mb-0">
            <h1 className="text-xl font-bold">Your Brand</h1>
          </div> */}
          <div className='flex flex-grow' />
          
          <div className="flex space-x-6">
            <a 
              href="https://www.facebook.com/onlinepurchasenepal6636" 
              className="flex items-center transition-transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="https://i.pinimg.com/474x/f7/99/20/f79920f4cb34986684e29df42ec0cebe.jpg" 
                alt="Facebook" 
                className="w-6 h-6 rounded-full"
              />
              <span className="ml-2 hidden lg:inline">Facebook</span>
            </a>
            
            <a 
              href="https://t.me/bsingh4474" 
              className="flex items-center transition-transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="https://img.icons8.com/?size=100&id=5mIvDYZUWDCF&format=png&color=000000" 
                alt="Telegram" 
                className="w-6 h-6 bg-white rounded-full"
              />
              <span className="ml-2 hidden lg:inline">Telegram</span>
            </a>
            
            <a 
              href="https://wa.me/+9779804805541" 
              className="flex items-center transition-transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src={whatsappImageUrl}
                alt="WhatsApp" 
                className="w-6 h-6 bg-green-500 rounded-full p-1"
              />
              <span className="ml-2 hidden lg:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
