import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MyContext } from "../App";
import "../css/Header.css";

// NAV LINKS (used for both desktop + mobile)
const navLinks = [
  { path: "/", name: "Home", icon: "fa-home" },
  { path: "/prices", name: "Prices", icon: "fa-tag" },
  { path: "/updates", name: "Updates", icon: "fa-bell" },
  { path: "/aboutUs", name: "About Us", icon: "fa-info-circle" },
  { path: "/help", name: "Help", icon: "fa-question-circle" },
  { path: "/contact", name: "Suppot", icon: "fa-envelope" },
  { path: "signIn", name: "Sign In", icon: "fa-user" },
];

// SOCIAL LINKS (used for both header + mobile menu)
const socialLinks = [
  {
    href: "https://www.facebook.com/onlinepurchasenepal6636",
    icon: "fa-facebook",
    color: "text-blue-600 hover:text-blue-400",
    label: "Facebook",
  },
  {
    href: "https://t.me/bsingh4474",
    icon: "fa-telegram",
    color: "text-blue-400 hover:text-blue-300",
    label: "Telegram",
  },
  {
    href: "https://wa.me/+9779804805541",
    icon: "fa-whatsapp",
    color: "text-green-500 hover:text-green-400",
    label: "WhatsApp",
  },
];

export const Navbar = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const { isDarkMode, setIsDarkMode } = useContext(MyContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ Load dark mode preference
  useEffect(() => {
    const stored = localStorage.getItem("isDarkMode");
    const prefersDark = stored === "true" || stored === null;
    setIsDarkMode(prefersDark);

    document.documentElement.classList.toggle("dark", prefersDark);
  }, [setIsDarkMode]);

  // ✅ Detect scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("isDarkMode", newMode);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isDarkMode ? "dark" : ""
        } ${isScrolled ? "shadow-lg" : "shadow-md"}`}
    >
      {/* Social Bar */}
      <HeaderSocial />

      <nav
        className={`mx-auto px-4 py-2 flex items-center justify-between transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
          }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <div className="relative h-12 w-12 rounded-full overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90"></div>
            <div className="absolute inset-0.5 bg-white dark:bg-gray-900 rounded-full">
              <img
                src="/bsinghLogo.jpeg"
                alt="Logo"
                className="h-full w-full rounded-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
          </div>
          <div className="ml-3 flex flex-col">
            <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Subscription Nepal
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              Premium Services
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center hover:text-blue-500 font-medium relative group ${isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                >
                  <i className={`fa-solid ${item.icon} mr-1 text-sm`} />
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isDarkMode ? "bg-blue-400" : "bg-blue-600"
                      }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Cart + Dark Toggle */}
          <NavActions
            cartItems={cartItems}
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Mobile Nav Toggle */}
        <div className="lg:hidden flex items-center space-x-4">
          <NavActions
            cartItems={cartItems}
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
          />
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={`p-2 ${isDarkMode ? "text-white" : "text-gray-700"}`}
          >
            <i
              className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} text-2xl`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`lg:hidden absolute top-full left-0 right-0 shadow-xl py-4 px-6 z-50 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
        >
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="search"
                className={`w-full py-2 px-4 pl-10 rounded-full focus:outline-none ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100"
                  }`}
                placeholder="Search services..."
              />
              <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Links */}
          <ul className="space-y-1">
            {navLinks.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center py-3 px-4 rounded-lg ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  <i className={`fa-solid ${item.icon} mr-3 text-blue-500`} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Socials */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
              Connect with us
            </h3>
            <SocialLinks />
          </div>
        </div>
      )}
    </header>
  );
};

// 🔹 Extracted Components

const NavActions = ({ cartItems, toggleDarkMode, isDarkMode }) => (
  <div className="flex items-center space-x-4">
    {/* Cart */}
    <Link to="/cart" className="relative group">
      <div
        className={`p-2 rounded-full flex items-center ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
          }`}
      >
        <i className="fa-solid fa-cart-shopping text-xl group-hover:text-blue-500 transition-colors" />
        {cartItems?.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-xs text-white font-bold flex items-center justify-center rounded-full animate-bounce">
            {cartItems.length}
          </span>
        )}
      </div>
    </Link>

    {/* Dark Toggle */}
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
        }`}
      aria-label="Toggle dark mode"
    >
      <i
        className={`fa-solid ${isDarkMode ? "fa-sun text-yellow-300" : "fa-moon text-gray-700"
          } text-lg`}
      />
    </button>
  </div>
);

const HeaderSocial = () => (
  <div className="hidden md:block w-full transition-colors duration-300 py-2 bg-black dark:bg-gray-800 text-white dark:text-gray-200">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="mb-2 sm:mb-0 text-sm">
        <i className="fa-solid fa-headset mr-1" /> Customer Support:{" "}
        <a href="tel:+9779804805541" className="hover:text-blue-400">
          +977 9804 805 541
        </a>
      </div>
      <SocialLinks showLabels />
    </div>
  </div>
);

const SocialLinks = ({ showLabels = false }) => (
  <div className="flex space-x-4">
    {socialLinks.map((s) => (
      <a
        key={s.label}
        href={s.href}
        className={`flex items-center p-2 rounded-full transition-all ${s.color}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className={`fa-brands ${s.icon} text-lg`} />
        {showLabels && <span className="ml-1 text-sm hidden lg:inline">{s.label}</span>}
      </a>
    ))}
  </div>
);

// // 🔹 CSS for spin animation
// const style = document.createElement("style");
// style.textContent = `
//   @keyframes spin-slow { 
//     0% { transform: rotate(0deg); } 
//     100% { transform: rotate(360deg); } 
//   }
//   .animate-spin-slow { animation: spin-slow 8s linear infinite; }
// `;
// document.head.appendChild(style);

export default Navbar;
