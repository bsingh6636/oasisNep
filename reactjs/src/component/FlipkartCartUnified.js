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
  Truck,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PaymentModal from './small component/PaymentModal';

const FlipkartCartUnified = () => {
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

  // Cart Item Component - Responsive
  const CartItemCard = ({ item }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 md:p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-3 md:gap-4">
        {/* Product Image - Responsive sizing */}
        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-contain p-1 md:p-2"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-sm md:text-base text-gray-900 dark:text-white line-clamp-2 pr-2">
              {item.name}
            </h3>
            <button
              onClick={() => deleteItem(item.Id)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Plan Details - Responsive layout */}
          <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
            <span className="inline-flex items-center px-2 py-0.5 md:py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
              {item.month} month{item.month > 1 ? 's' : ''}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 md:py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
              {item.selectedDevice} user{item.selectedDevice > 1 ? 's' : ''}
            </span>
          </div>

          {/* Price - Responsive layout */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 md:gap-2">
              <span className="font-bold text-sm md:text-base text-gray-900 dark:text-white">
                ₹{item.cost}
              </span>
              <span className="text-xs md:text-sm text-gray-500 line-through">
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

  // Price Breakdown Component
  const PriceBreakdown = ({ className = "" }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Price Details</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Price ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </span>
          <span className="text-gray-900 dark:text-white">₹{finalCartCost}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Discount</span>
          <span className="text-green-600 dark:text-green-400">-₹{savings}</span>
        </div>
        
    
        
        <hr className="border-gray-200 dark:border-gray-700" />
        
        <div className="flex justify-between font-semibold">
          <span className="text-gray-900 dark:text-white">Total Amount</span>
          <span className="text-gray-900 dark:text-white">₹{totalAmount}</span>
        </div>
        
        <div className="text-sm text-green-600 dark:text-green-400 font-medium">
          You will save ₹{savings} on this order
        </div>
      </div>
    </div>
  );

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-24 md:w-32 h-24 md:h-32 mx-auto mb-4 md:mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <ShoppingCart size={32} className="text-gray-400 md:w-12 md:h-12" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm md:text-base">
                Add items to get started
              </p>
              <Link 
                to="/prices"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-4 lg:pb-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center gap-3 md:gap-4">
            <Link 
              to="/prices"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors -ml-2"
            >
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                My Cart ({cartItems.length})
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                Review your items and checkout
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
        

            {/* Cart Items List */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <CartItemCard key={item.Id} item={item} />
              ))}
            </div>

            {/* Security Info - Hidden on mobile */}
            <div className="hidden md:block bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Safe and Secure Platofrm
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Order Summary */}
          <div className="hidden lg:block space-y-4">
            <PriceBreakdown />
            
            {/* Checkout Button */}
            <button
              onClick={buyNow}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard size={20} />
              Place Order
            </button>

          </div>
        </div>

      </div>

      {/* Mobile Sticky Bottom Checkout */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
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
          <div className="flex items-center justify-between">
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

export default FlipkartCartUnified;