import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemCart } from '../Const/cartslice';
import { MyContext } from '../App';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowLeft,
  CreditCard,
  ChevronUp,
  ChevronDown,
  Tag,
  Truck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PaymentModal from './small component/PaymentModal';

const FlipkartCartMobile = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const { isDarkMode } = useContext(MyContext);
  const dispatch = useDispatch();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [cartItemsForPayment, setCartItemsForPayment] = useState();
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  const finalCartCost = cartItems.reduce((total, currentItem) => total + currentItem.cost, 0);
  const savings = Math.round(finalCartCost * 0.15);
  const deliveryFee = finalCartCost > 500 ? 0 : 40;
  const totalAmount = finalCartCost + deliveryFee;

  const deleteItem = (id) => {
    dispatch(deleteItemCart(id));
  };

  const buyNow = () => {
    const data = cartItems.map((items) => {
      return [items.name, items.selectedDevice, items.selectedMonth];
    });
    setCartItemsForPayment(data);
    setShowPaymentOptions(true);
  };

  // Compact Cart Item for Mobile
  const MobileCartItem = ({ item }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
      <div className="flex gap-3">
        {/* Compact Image */}
        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-contain p-1"
          />
        </div>

        {/* Compact Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 pr-2">
              {item.name}
            </h3>
            <button
              onClick={() => deleteItem(item.Id)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {/* Compact Plan Info */}
          <div className="flex gap-1 mb-2">
            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded">
              {item.month}m
            </span>
            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded">
              {item.selectedDevice} users
            </span>
          </div>

          {/* Compact Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm text-gray-900 dark:text-white">
                ₹{item.cost}
              </span>
              <span className="text-xs text-gray-500 line-through">
                ₹{Math.round(item.cost * 1.2)}
              </span>
            </div>
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              17% off
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <ShoppingCart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              Add items to get started
            </p>
            <Link 
              to="/prices"
              className="inline-block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-32">
      {/* Compact Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Link 
              to="/prices"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors -ml-2"
            >
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </Link>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                Cart ({cartItems.length})
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
      

        {/* Cart Items */}
        <div className="space-y-3">
          {cartItems.map((item) => (
            <MobileCartItem key={item.Id} item={item} />
          ))}
        </div>

      </div>

      {/* Sticky Bottom Checkout */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
        {/* Price Breakdown Toggle */}
        <button
          onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
          className="w-full px-4 py-2 flex items-center justify-between text-sm border-b border-gray-200 dark:border-gray-700"
        >
          <span className="text-gray-600 dark:text-gray-400">Price Details</span>
          {showPriceBreakdown ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>

        {/* Expandable Price Breakdown */}
        {showPriceBreakdown && (
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Price ({cartItems.length} items)
              </span>
              <span className="text-gray-900 dark:text-white">₹{finalCartCost}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Discount</span>
              <span className="text-green-600 dark:text-green-400">-₹{savings}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Delivery</span>
              <span className={deliveryFee === 0 ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            <hr className="border-gray-200 dark:border-gray-700" />
            <div className="flex justify-between font-semibold">
              <span className="text-gray-900 dark:text-white">Total</span>
              <span className="text-gray-900 dark:text-white">₹{totalAmount}</span>
            </div>
          </div>
        )}

        {/* Checkout Bar */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                ₹{totalAmount}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                Save ₹{savings}
              </div>
            </div>
            <button
              onClick={buyNow}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <CreditCard size={16} />
              Place Order
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        showPaymentOptions={showPaymentOptions}
        setShowPaymentOptions={setShowPaymentOptions}
        cartItemsForPayment={cartItemsForPayment}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default FlipkartCartMobile;