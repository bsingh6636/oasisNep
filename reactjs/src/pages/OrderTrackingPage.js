import React, { useEffect, useState } from 'react';
import orderService from '../api/order.service';

const OrderTrackingPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [secretData, setSecretData] = useState({});

  useEffect(() => {
    orderService.getUserOrders()
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch orders.');
        setLoading(false);
      });
  }, []);

  const handleViewSecret = (orderId) => {
    if (secretData[orderId]) return;

    orderService.getSecret(orderId)
      .then(response => {
        setSecretData(prev => ({ ...prev, [orderId]: response.data }));
      })
      .catch(err => {
        const errorMessage = err.response?.data?.message || 'Could not fetch secret.';
        setSecretData(prev => ({ ...prev, [orderId]: { error: errorMessage } }));
      });
  };

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{order.service.name}</h2>
                  <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  order.status === 'approved' ? 'bg-green-200 text-green-800' :
                    order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                      order.status === 'rejected' ? 'bg-red-200 text-red-800' :
                        'bg-gray-200 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </div>
              {order.status === 'approved' && (
                <div className="mt-4">
                  <button onClick={() => handleViewSecret(order.id)} className="text-blue-500 hover:underline">
                                        View Secret
                  </button>
                  {secretData[order.id] && (
                    <div className="mt-2 p-4 bg-gray-100 rounded">
                      {secretData[order.id].error ? (
                        <p className="text-red-500">{secretData[order.id].error}</p>
                      ) : (
                        <>
                          <p><strong>Secret:</strong> {secretData[order.id].secret}</p>
                          <p><strong>Expires:</strong> {new Date(secretData[order.id].expires_at).toLocaleString()}</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;
