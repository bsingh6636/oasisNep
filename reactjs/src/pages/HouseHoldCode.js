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
      const response = await fetch('https://test.loophj.com/getCodes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log(response)

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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Get Your Netflix Household Code</h1>

        {/* Instructions at the top */}
        <p className="text-center text-gray-300 mb-6">
          Select <span className="font-semibold">"Watch Temporarily"</span> or <span className="font-semibold">"I'm Travelling"</span>. 
          After selecting, click on send email to proceed and get the code.
        </p>

      
        { (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your account email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Instructions below the input field */}
            <p className="text-sm text-gray-400">
            Enter the Netflix email associated with your account to receive the code.
            </p>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 p-3 rounded-lg transition-all disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Fetching...' : 'Get Code'}
            </button>
          </form>
        )}

        {/* Success & Error Message Section */}
        {code && (
          <div className="mt-4 p-4 bg-green-200 text-green-900 rounded-lg text-center">
            <p>Your Code: <span className="font-mono font-bold">{code}</span></p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-200 text-red-900 rounded-lg text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseHoldCode;
