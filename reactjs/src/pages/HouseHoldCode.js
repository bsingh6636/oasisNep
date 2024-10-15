import React, { useState } from 'react';

const HouseHoldCode = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCode('');

    try {
      const response = await fetch('https://web.loophj.com/getCodes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setCode(data.code || 'No code found');
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to fetch code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">Get Your Household Code</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all"
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Get Code'}
          </button>
        </form>

        {code && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
            Your Code: <span className="font-mono font-semibold">{code}</span>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseHoldCode;
