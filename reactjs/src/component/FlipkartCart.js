import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemCart } from '../Const/cartslice';
import { MyContext } from '../App';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  Shield, 
  Truck,
  ArrowLeft,
  CreditCard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PaymentModal from './small component/PaymentModal';

const FlipkartCart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const { isDarkMode } = useContext(MyContext);
  const dispatch = useDispatch();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [cartItemsForPayment, setCartItemsForPayment] = useState();

  const finalCartCost = cartItems.reduce((total, currentItem) => total + currentItem.cost, 0);
  const savings = Math.round(finalCartCost * 0.15); // Mock 15% savings
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

  // Empty Cart Component
  const EmptyCartState = () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <ShoppingCart size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
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
  );

  // Cart Item Component
  const CartItemCard = ({ item }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-contain p-2"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
              {item.name}
            </h3>
            <button
              onClick={() => deleteItem(item.Id)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Plan Details */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
              {item.month} months
            </span>
            <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
              {item.selectedDevice} users
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 dark:text-white">
                ₹{item.cost}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{Math.round(item.cost * 1.2)}
              </span>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                17% off
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Price Breakdown Component
  const PriceBreakdown = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <EmptyCartState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/prices"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                My Cart ({cartItems.length})
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Review your items and checkout
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
      

            {/* Cart Items List */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <CartItemCard key={item.Id} item={item} />
              ))}
            </div>

            {/* Security Info */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Safe and Trusted Platofrm
                  </p>
                  {/* <p className="text-sm text-gray-600 dark:text-gray-400">
                    Easy returns. 100% Authentic products.
                  </p> */}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
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

export default FlipkartCart;