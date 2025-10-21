import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="px-4 py-6 md:py-8 bg-slate-900 dark:bg-gray-950 bg-opacity-90 dark:bg-opacity-95 backdrop-blur-md text-white border-t border-gray-800 dark:border-gray-800">
      <div className="container mx-auto">
        {/* Mobile layout - stacked */}
        <div className="block md:hidden">
          <div className="flex flex-col space-y-8">
            {/* Logo & Copyright section */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">O</span>
                </div>
              </div>
              <h2 className="text-lg font-bold mb-1">Subscription Nepal</h2>
              <p className="text-xs text-gray-400">&copy; 2025 Subscription Nepal. All rights reserved.</p>
            </div>
            
            {/* Contact Us section */}
            <div className="text-center">
              <h3 className="text-base font-semibold mb-3 uppercase tracking-wider text-gray-300">Contact Us</h3>
              <div className="space-y-2">
                <a 
                  href="https://wa.me/+9779804805541" 
                  target="_blank" 
                  className="block text-sm text-gray-300 hover:text-white transition-colors" 
                  rel="noreferrer"
                >
                  <span className="inline-flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    +977 980-4805541
                  </span>
                </a>
                <a 
                  href="mailto:subscription.for.nepal@gmail.com" 
                  className="block text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <span className="inline-flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4.7l-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"/>
                    </svg>
                    subscription.for.nepal@gmail.com
                  </span>
                </a>
              </div>
            </div>
            
            {/* Social Media section */}
            <div className="text-center pb-3">
              <h3 className="text-base font-semibold mb-3 uppercase tracking-wider text-gray-300">Follow Us</h3>
              <div className="flex justify-center space-x-5">
                <a 
                  href="https://www.facebook.com/onlinepurchasenepal6636" 
                  target="_blank" 
                  rel="noreferrer"
                  className="group"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
                    </svg>
                  </div>
                </a>
                <a 
                  href="https://t.me/bsingh4474" 
                  target="_blank" 
                  rel="noreferrer"
                  className="group"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                    </svg>
                  </div>
                </a>
                <a 
                  href="https://wa.me/+9779804805541" 
                  target="_blank" 
                  rel="noreferrer"
                  className="group"
                >
                  <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet/Desktop layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">O</span>
                </div>
                <h2 className="text-xl font-bold">Subscription Nepal</h2>
              </div>
              <p className="text-sm text-gray-400 mb-6 max-w-xs">
                Your one-stop destination for premium entertainment services and streaming solutions.
              </p>
              <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Subscription Nepal. All rights reserved.</p>
            </div>
            
            <div className="lg:col-span-1">
              <h3 className="text-base font-semibold mb-4 uppercase tracking-wider text-gray-300">Quick Links</h3>
              <ul className="space-y-2">
                <li>
               
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Home
                  </Link>

                </li>
                <li>
                 
                  <Link to="/prices" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Services
                  </Link>
                </li>
                <li>
              
                  <Link to="/prices" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Pricing
                  </Link>
                </li>
                <li>
              
                  <Link to="/aboutus" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="lg:col-span-1">
              <h3 className="text-base font-semibold mb-4 uppercase tracking-wider text-gray-300">Contact Us</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://wa.me/+9779804805541" 
                    target="_blank" 
                    className="flex items-center text-gray-400 hover:text-white transition-colors duration-200" 
                    rel="noreferrer"
                  >
                    <svg className="w-5 h-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="text-sm">+977 980-4805541</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:subscription.for.nepal@gmail.com" 
                    className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4.7l-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"/>
                    </svg>
                    <span className="text-sm">subscription.for.nepal@gmail.com</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 mr-3 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 7 12 7s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                    </svg>
                    <span className="text-sm">Kathmandu, Nepal</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="lg:col-span-1">
              <h3 className="text-base font-semibold mb-4 uppercase tracking-wider text-gray-300">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/onlinepurchasenepal6636" 
                  target="_blank" 
                  rel="noreferrer"
                  className="group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transform transition-all duration-200 group-hover:scale-110">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
                    </svg>
                  </div>
                </a>
                <a 
                  href="https://t.me/bsingh4474" 
                  target="_blank" 
                  rel="noreferrer"
                  className="group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-500 flex items-center justify-center transform transition-all duration-200 group-hover:scale-110">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                    </svg>
                  </div>
                </a>
                <a 
                  href="https://wa.me/+9779804805541" 
                  target="_blank" 
                  rel="noreferrer"
                  className="group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transform transition-all duration-200 group-hover:scale-110">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                </a>
              </div>
              
              {/* Newsletter subscription */}
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3 text-gray-300">Subscribe to our newsletter</h4>
                <div className="flex">
                  <input 
                    type="email" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-l-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    placeholder="Your email"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 rounded-r-lg px-3 transition-colors duration-200">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="hidden md:block">
          <div className="border-t border-gray-800 my-8"></div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Subscription Nepal. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;