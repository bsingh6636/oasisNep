import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import orderService from '../api/order.service';
import { clearCart } from '../redux/cartSlice';

const CheckoutPage = () => {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [transactionCode, setTransactionCode] = useState('');
  const [proofUrl, setProofUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const totalCost = items.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Processing your order...');

    try {
      const orderPromises = items.map(item => orderService.createOrder(item.id));
      const createdOrders = await Promise.all(orderPromises);

      const proofPromises = createdOrders.map(orderResponse => {
        const orderId = orderResponse.data.id;
        return orderService.uploadProof(orderId, transactionCode, proofUrl);
      });
      await Promise.all(proofPromises);

      setMessage('Your order has been placed successfully! You will be notified upon approval.');
      dispatch(clearCart());
      setTimeout(() => {
        navigate('/orders');
      }, 3000);

    } catch (error) {
      const errorMessage = (error.response && error.response.data && error.response.data.message) || error.message || 'An error occurred.';
      setMessage(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b py-2">
                <span>{item.name}</span>
                <span>NPR {item.price}</span>
              </div>
            ))}
            <div className="flex justify-between items-center font-bold text-lg mt-4">
              <span>Total</span>
              <span>NPR {totalCost}</span>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Payment Details</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>Please make the payment to the following account and upload the proof.</p>
            <p className="mt-2"><strong>UPI/QR Code:</strong> [Your UPI/QR Code Image Here]</p>
            <p className="mt-2"><strong>Bank Account:</strong> [Your Bank Account Details Here]</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Submit Payment Proof</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Transaction Code / Sender Name</label>
                <input
                  type="text"
                  value={transactionCode}
                  onChange={(e) => setTransactionCode(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Payment Screenshot URL</label>
                <input
                  type="url"
                  value={proofUrl}
                  onChange={(e) => setProofUrl(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="https://example.com/your-screenshot.jpg"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400">
                {loading ? 'Submitting...' : 'Submit Order'}
              </button>
              {message && <p className="mt-4 text-center">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
