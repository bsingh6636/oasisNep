import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../css/Header.css';

export const Navbar = () => {
  const cartItems = useSelector(store => store.cart.items);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <header>
      <div className='navbar'>
        <div className='logo'>
          <Link to="/">
            <div className="relative h-16 w-16 max-sm:h-11 max-sm:w-11 rounded-full overflow-hidden p-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 shadow-lg">
              <img className='h-full w-full rounded-full border-2 border-white' src='/bsinghLogo.jpeg' alt='logo' />
            </div>
          </Link>
        </div>
        <ul className={`links ${isOpen ? 'open' : ''}`}>
          {['/', '/prices', '/updates', '/aboutUs', '/help', '/contact'].map((path, index) => (
            <li key={index}>
              <Link className="hover:text-blue-600 no-underline" to={path}>{path.slice(1).toUpperCase() || 'HOME'}</Link>
            </li>
          ))}
        </ul>
        <Link className='action_btn w-auto' to="/cart">
          <div className="relative group">
            <i className="fa-solid fa-cart-shopping text-3xl transition-transform duration-200 hover:text-yellow-300 cursor-pointer group-hover:scale-110"></i>
            {cartItems && cartItems.length > 0 && (
              <span className="absolute top-0 right-0 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-600 text-xs text-white font-bold flex items-center justify-center rounded-full shadow-lg animate-pulse">
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>
        <div className='toggle_btn' onClick={handleToggle}>
          <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-white text-2xl transition-transform duration-300`}></i>
        </div>
        {isOpen && (
          <div className='dropdown_menu open'>
            <ul>
              {['/', '/prices', '/updates', '/aboutUs', '/help', '/contact'].map((path, index) => (
                <li key={index}><Link to={path}>{path.slice(1).toUpperCase() || 'HOME'}</Link></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
