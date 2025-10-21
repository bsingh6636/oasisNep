import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Pricelist as PriceListMock } from "../const";
import { useDispatch } from "react-redux";
import { addItem } from "../Const/cartslice";
import "../css/ripple.css";
import FAQ from "./small component/FAQ";
// import CommentSection from "./small component/CommentSection";
import { priceUpdate } from "../helper/priceUpdate";
import { PriceDetailsShimmer } from "../import";
import { ShoppingCart, Check, Plus, ArrowUpRight } from "lucide-react";
import { MyContext } from "../App";

export const PriceDetails = () => {
  const dispatch = useDispatch();
  const { object } = useParams();
  const { priceListAll, setPriceListAll } = useContext(MyContext);

  const [details, setDetails] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("1");
  const [chosenMonth, setChosenMonth] = useState(null);
  const [priceList, setPriceList] = useState(priceListAll || []);
  // Animation state variables
  const [isAdded, setIsAdded] = useState(false);
  const [animatingItem, setAnimatingItem] = useState(null);
  const [cartPosition, setCartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchPriceList = async () => {
      if (!priceList.length) {
        const apiData = await priceUpdate(PriceListMock);
        setPriceListAll(apiData);
        setPriceList(apiData);
      }
    };

    const findItemInList = () => {
      const foundItem = priceList.find((item) => item.Name === object);
      if (foundItem) {
        setDetails(foundItem);
        if (foundItem.plans) {
          const [firstMonthKey, firstMonthValue] = Object.entries(foundItem.plans)[0];
          setChosenMonth(firstMonthKey);
          setSelectedMonth(firstMonthValue);
        }
      }
    };

    if (!details) {
      fetchPriceList().then(findItemInList);
    }
  }, [priceList, object, details, setPriceListAll]);

  // Get cart position for animation
  useEffect(() => {
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
      const rect = cartIcon.getBoundingClientRect();
      setCartPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }

    // Update cart position on resize
    const handleResize = () => {
      if (cartIcon) {
        const rect = cartIcon.getBoundingClientRect();
        setCartPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [details]);

  const handleMonthClick = (key, value) => {
    setChosenMonth(key);
    setSelectedMonth(value);
  };

  const handleDeviceChange = (e) => setSelectedDevice(e.target.value);

  const totalCost = parseInt(selectedMonth) * parseInt(selectedDevice);

  const addItemToCart = (e) => {
    if (!details) return;
    console.log(details)

    const { Id, Name, ImageId } = details;
    dispatch(
      addItem({
        Id,
        name: Name,
        selectedMonth,
        selectedDevice,
        image: ImageId,
        cost: totalCost,
      })
    );

    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.className = "absolute rounded-full bg-white/30 pointer-events-none";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s linear";
    
    button.appendChild(ripple);
    
    // Set starting position for flying item
    const buttonRect = button.getBoundingClientRect();
    const buttonX = buttonRect.left + buttonRect.width / 2;
    const buttonY = buttonRect.top + buttonRect.height / 2;
    
    // Show the flying item animation
    setAnimatingItem({ 
      startX: buttonX, 
      startY: buttonY,
      endX: cartPosition.x,
      endY: cartPosition.y
    });
    
    // Show added confirmation 
    setIsAdded(true);
    
    // Remove ripple after animation
    setTimeout(() => {
      if (ripple && ripple.parentNode === button) {
        button.removeChild(ripple);
      }
    }, 600);
    
    // Reset button state after animation
    setTimeout(() => {
      setIsAdded(false);
      setAnimatingItem(null);
    }, 2000);
  };

  // Custom select options for months and devices
  const monthOptions = details?.plans ? Object.entries(details.plans) : [];
  const deviceOptions = [1, 2, 3];

  if (!details) return <PriceDetailsShimmer />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-white py-4 px-4 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        {/* Main Product Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden mb-6 transition-colors duration-200">
          <div className="flex flex-col md:flex-row">
            {/* Image Section - Left side */}
            <div className="w-full md:w-1/2 bg-gray-100 dark:bg-black transition-colors duration-200">
              <div className="aspect-square md:aspect-auto md:h-full">
                <img
                  className="w-full h-full object-contain"
                  src={details.ImageId || "/api/placeholder/600/600"}
                  alt={details.Name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/api/placeholder/600/600";
                  }}
                />
              </div>
            </div>

            {/* Product Details - Right side */}
            <div className="w-full md:w-1/2 p-6 relative">
              {/* Cart icon indicator for animation target */}
              <div className="absolute top-4 right-4 z-10" id="cart-icon">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-gray-400 dark:text-gray-300" />
                  {animatingItem && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white animate-pulse">
                      +1
                    </span>
                  )}
                </div>
              </div>
              
              {/* Product Name */}
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white transition-colors duration-200">
                {details.Name}
              </h1>
              
              {/* Product Description */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 transition-colors duration-200">
                <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base transition-colors duration-200">
                  {details.Info}
                </p>
              </div>

              {details.plans ? (
                <>
                  {/* Selection Options */}
                  <div className="space-y-6">
                    {/* Months Selection */}
                    <div>
                      <h2 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-400 transition-colors duration-200">
                        Number of months
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {monthOptions.map(([key, value]) => (
                          <button
                            key={key}
                            className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                              selectedMonth === value
                                ? "bg-blue-600 text-white shadow-md scale-105 transform"
                                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => handleMonthClick(key, value)}
                          >
                            {key}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Device Selection */}
                    <div>
                      <h2 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-400 transition-colors duration-200">
                        Number of devices
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {deviceOptions.map((num) => (
                          <label key={num} className="cursor-pointer">
                            <input
                              type="radio"
                              className="hidden peer"
                              name="deviceCount"
                              value={num}
                              checked={selectedDevice === `${num}`}
                              onChange={handleDeviceChange}
                            />
                            <span
                              className={`inline-block px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                                selectedDevice === `${num}`
                                  ? "bg-blue-600 text-white shadow-md scale-105 transform"
                                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                              }`}
                            >
                              {num}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Total Cost */}
                    <div>
                      <h2 className="text-xl font-bold text-green-600 dark:text-green-500 transition-colors duration-200">
                        Total cost: NPR {totalCost}
                      </h2>
                    </div>
                  </div>

                  {/* Add to Cart Button - With animation feedback */}
                  <button
                    onClick={addItemToCart}
                    className={`w-full font-medium py-3 rounded-md mt-6 transition-all duration-300 relative overflow-hidden ${
                      isAdded 
                        ? "bg-green-600 text-white shadow-lg" 
                        : "bg-green-500 hover:bg-green-600 hover:shadow-md text-white"
                    }`}
                  >
                    {isAdded ? (
                      <span className="flex items-center justify-center">
                        <Check className="w-5 h-5 mr-2 animate-bounce" />
                        Added to Cart!
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </span>
                    )}
                  </button>
                  
                  {/* Flying item animation */}
                  {animatingItem && (
                    <div 
                      className="fixed z-50 h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg pointer-events-none"
                      style={{
                        left: `${animatingItem.startX}px`,
                        top: `${animatingItem.startY}px`,
                        animation: "fly-to-cart 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards"
                      }}
                    >
                      <Plus className="w-5 h-5" />
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-lg p-4 mt-4 transition-colors duration-200">
                  <div className="flex items-center">
                    <ArrowUpRight className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <p className="text-blue-800 dark:text-blue-200 transition-colors duration-200">
                      Contact Admin for this Item
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6 transition-colors duration-200">
          <FAQ chosenMonth={chosenMonth} details={details} />
        </div>

        {/* Comments Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 transition-colors duration-200">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-200">Comments</h2>
          
          {/* Feature Coming Soon Notice */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-lg p-4 mb-4 transition-colors duration-200">
            <h3 className="font-medium text-amber-700 dark:text-amber-400 mb-1 transition-colors duration-200">Feature Coming Soon!</h3>
            <p className="text-amber-800 dark:text-amber-200 text-sm transition-colors duration-200">
              We&apos;re working hard to bring you this feature. Stay tuned for updates.
            </p>
          </div>
          
          {/* <CommentSection /> */}
        </div>
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes fly-to-cart {
          0% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          20% {
            transform: scale(1.2) translateY(-20px);
          }
          100% {
            transform: scale(0.5) translateX(${animatingItem ? (cartPosition.x - animatingItem.startX) : 0}px) 
                       translateY(${animatingItem ? (cartPosition.y - animatingItem.startY) : 0}px);
            opacity: 0;
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .max-w-6xl {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PriceDetails;