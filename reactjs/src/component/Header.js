import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../css/Header.css';
import { MyContext } from './App';

export const Navbar = () => {
  const cartItems = useSelector(store => store.cart.items);
  const { isDarkMode, setIsDarkMode} = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for user's preferred color scheme on initial load
  useEffect(() => {
    const isDarkMode = localStorage.getItem('isDarkMode');
    console.log(isDarkMode)
    if (isDarkMode === 'true' || isDarkMode == null) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }else{
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  },[]);

  console.log(isDarkMode)

  useEffect(() => {    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    if(isDarkMode){ 
      document.documentElement.classList.remove('dark');
      localStorage.setItem('isDarkMode', 'false');
    }
    else {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('isDarkMode', 'true');
  }
  };

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isDarkMode ? 'dark' : ''} 
      ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
      <HeaderSocial isDarkMode={isDarkMode} />
      
      <nav className={` mx-auto px-4 py-2 flex items-center justify-between transition-colors duration-300
        ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
        <div className="flex items-center">
      <Link to="/" className="flex items-center group">
        {/* Logo container with optimized size and animation */}
        <div className="relative h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-spin-slow opacity-90"></div>
          
          {/* White inner circle to create border effect */}
          <div className="absolute inset-0.5 bg-white dark:bg-gray-900 rounded-full">
            {/* Actual logo image */}
            <img 
              className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" 
              src="/bsinghLogo.jpeg" 
              alt="Logo" 
              loading="eager"
              width="48"
              height="48"
            />
          </div>
        </div>
        
        {/* Company name with gradient text */}
        <div className="ml-3 flex flex-col">
          <span className="text-base sm:text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-tight leading-none">
            Subscription Nepal
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block leading-tight">
            Premium Services
          </span>
        </div>
      </Link>
    </div>
  
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {[
              { path: '/', name: 'Home', icon: 'fa-home' },
              { path: '/prices', name: 'Prices', icon: 'fa-tag' },
              { path: '/updates', name: 'Updates', icon: 'fa-bell' },
              { path: '/aboutUs', name: 'About Us', icon: 'fa-info-circle' },
              { path: '/help', name: 'Help', icon: 'fa-question-circle' },
              { path: '/contact', name: 'Contact', icon: 'fa-envelope' }
            ].map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className={`flex items-center hover:text-blue-500 font-medium transition-colors duration-200 relative group ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  <i className={`fa-solid ${item.icon} mr-1 text-sm`}></i>
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></span>
                </Link>
              </li>
            ))}
          </ul>
  
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative group">
              <div className={`p-2 rounded-full transition-colors flex text-gray-700 dark:text-white  items-center ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
                <i className="fa-solid fa-cart-shopping text-xl group-hover:text-blue-500 transition-colors"></i>
                {cartItems && cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-xs text-white font-bold flex items-center justify-center rounded-full animate-bounce">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </Link>
            
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
              aria-label="Toggle dark mode"
            >
              <i className={`fa-solid ${isDarkMode ? 'fa-sun text-yellow-300' : 'fa-moon text-gray-700'} text-lg`}></i>
            </button>
          </div>
        </div>
  
        <div className="lg:hidden flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <div className="p-2 text-gray-700 dark:text-white ">
              <i className={`fa-solid fa-cart-shopping text-xl`}></i>
              {cartItems && cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-xs text-white font-bold flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2"
            aria-label="Toggle dark mode"
          >
            <i className={`fa-solid ${isDarkMode ? 'fa-sun text-yellow-300' : 'fa-moon text-gray-700'} text-lg`}></i>
          </button>
          
          <button 
            onClick={handleToggle}
            className={`focus:outline-none p-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className={`lg:hidden absolute top-full left-0 right-0 shadow-xl py-4 px-6 z-50 transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <div className="max-h-[80vh] overflow-y-auto">
            <form className="mb-4">
              <div className="relative">
                <input
                  type="search"
                  className={`w-full py-2 px-4 pl-10 rounded-full focus:outline-none ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                  placeholder="Search services..."
                />
                <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </form>
            
            <ul className="space-y-1">
              {[
                { path: '/', name: 'Home', icon: 'fa-home' },
                { path: '/prices', name: 'Prices', icon: 'fa-tag' },
                { path: '/updates', name: 'Updates', icon: 'fa-bell' },
                { path: '/aboutUs', name: 'About Us', icon: 'fa-info-circle' },
                { path: '/help', name: 'Help', icon: 'fa-question-circle' },
                { path: '/contact', name: 'Contact', icon: 'fa-envelope' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center py-3 px-4 rounded-lg text-gray-700 dark:text-white ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <i className={`fa-solid ${item.icon} mr-3 text-blue-500`}></i>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Connect with us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/onlinepurchasenepal6636" 
                  className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook text-blue-600"></i>
                </a>
                <a 
                  href="https://t.me/bsingh4474" 
                  className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-telegram text-blue-400"></i>
                </a>
                <a 
                  href="https://wa.me/+9779804805541" 
                  className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp text-green-500"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const HeaderSocial = ({ isDarkMode }) => {
  return (
    <div className={` hidden md:block w-full transition-colors duration-300 py-2 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-black text-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-2 sm:mb-0 text-sm">
            <span className="hidden sm:inline-block"><i className="fa-solid fa-headset mr-1"></i> Customer Support: </span>
            <a href="tel:+9779804805541" className="hover:text-blue-400 transition-colors hidden sm:inline-block">+977 9804 805 541</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.facebook.com/onlinepurchasenepal6636" 
              className="flex items-center transition-all hover:text-blue-400 hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook text-lg"></i>
              <span className="ml-1 text-sm hidden lg:inline">Facebook</span>
            </a>
            
            <a 
              href="https://t.me/bsingh4474" 
              className="flex items-center transition-all hover:text-blue-400 hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-telegram text-lg"></i>
              <span className="ml-1 text-sm hidden lg:inline">Telegram</span>
            </a>
            
            <a 
              href="https://wa.me/+9779804805541" 
              className="flex items-center transition-all hover:text-green-400 hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              <span className="ml-1 text-sm hidden lg:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
const style = document.createElement('style');
style.textContent = `
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
`;
document.head.appendChild(style);
export default Navbar;