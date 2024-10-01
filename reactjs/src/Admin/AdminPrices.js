import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BackendPort } from '../Const/url';

const AdminPrices = () => {
  const [prices, setPrices] = useState([]);
  const [form, setForm] = useState({
    Name: '',
    Id: '',
    ImageId: '',
    Category: '',
    Info: '',
    plans: {},
    Note: '',
    Status: '',
    SpecialLink: ''
  });
  const [editingPrice, setEditingPrice] = useState(null);
  const [planKey, setPlanKey] = useState('');
  const [planValue, setPlanValue] = useState('');

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const res = await axios.get(`${BackendPort}/prices`);
      setPrices(res.data.allPrices);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (e) => {
    setForm({ ...form, Status: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setForm({ ...form, Category: e.target.value });
  };

  const handlePlanKeyChange = (e) => {
    setPlanKey(e.target.value);
  };

  const handlePlanValueChange = (e) => {
    setPlanValue(e.target.value);
  };

  const addPlan = () => {
    if (planKey && planValue) {
      setForm((prevForm) => ({
        ...prevForm,
        plans: { ...prevForm.plans, [planKey]: planValue }
      }));
      setPlanKey('');
      setPlanValue('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPrice) {
        await axios.put(`${BackendPort}/prices/${editingPrice._id}`, form);
      } else {
        await axios.post(`${BackendPort}/prices`, form);
      }
      fetchPrices();
      // Reset form after submission
      setForm({
        Name: '',
        Id: '',
        ImageId: '',
        Category: '',
        Info: '',
        plans: {},
        Note: '',
        Status: '',
        SpecialLink: ''
      });
      setEditingPrice(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (price) => {
    setEditingPrice(price);
    setForm(price);
  };

  const handleDelete = async (Name) => {
    if (window.confirm('Are you sure you want to delete this price?')) {
      await axios.delete(`${BackendPort}/prices/${Name}`);
      fetchPrices();
    }
  };

  return (
    <div className="p-8 bg-gray-900 dark:text-white rounded-lg shadow-lg">
      <h2 className="text-3xl mb-6 font-bold text-center text-white">Manage Prices</h2>

      <form onSubmit={handleSubmit} className="mb-8 bg-gray-800 shadow-md rounded p-6">
        <div className="grid grid-cols-1 gap-4">
          {['Name', 'Id', 'ImageId', 'Info', 'Note', 'SpecialLink'].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field}
              className="p-3 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-white bg-gray-700"
              required={field !== 'Info' && field !== 'Note'}
            />
          ))}

          {/* Plans Inputs */}
          <div className="mt-4">
            <h3 className="text-gray-300 mb-2">Plans:</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={planKey}
                onChange={handlePlanKeyChange}
                placeholder="Plan Key"
                className="p-3 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-white bg-gray-700"
              />
              <input
                type="text"
                value={planValue}
                onChange={handlePlanValueChange}
                placeholder="Plan Value"
                className="p-3 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-white bg-gray-700"
              />
              <button type="button" onClick={addPlan} className="bg-green-600 hover:bg-green-700 text-white p-2 rounded transition">
                Add Plan
              </button>
            </div>
            <div className="mt-2">
              {Object.entries(form.plans).map(([key, value]) => (
                <div key={key} className="text-gray-400">
                  {key}: {value}
                </div>
              ))}
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="mt-4">
            <label className="block text-gray-300 mb-2">Category:</label>
            <select
              name="Category"
              value={form.Category}
              onChange={handleCategoryChange}
              className="p-3 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-gray-700 text-white"
            >
              <option value="" disabled>Select Category</option>
              <option value="Music">Music</option>
              <option value="OTT">OTT</option>
              <option value="18+">18+</option>
              <option value="Software">Software</option>
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="mt-4">
            <label className="block text-gray-300 mb-2">Status:</label>
            <select
              name="Status"
              value={form.Status}
              onChange={handleStatusChange}
              className="p-3 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-gray-700 text-white"
            >
              <option value="" disabled>Select Status</option>
              <option value="Shared">Shared</option>
              <option value="Private">Private</option>
              <option value="Empty">Empty</option>
            </select>
          </div>
        </div>

        <button type="submit" className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded transition hover:shadow-lg hover:scale-105">
          {editingPrice ? 'Update Price' : 'Add Price'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prices.map((price) => (
          <div key={price._id} className="flex flex-col p-4 shadow-lg rounded bg-gray-800 hover:bg-gray-700 transition-all duration-300">
            {price.ImageId && (
              <img src={price.ImageId} alt={price.Name} className="w-full h-32 object-cover rounded mb-2" />
            )}
            <h3 className="text-xl font-semibold text-white">{price.Name}</h3>
            <p className="text-gray-400">Category: {price.Category}</p>
            <p className="text-gray-400">ID: {price.Id}</p>
            <p className="text-gray-400">Note: {price.Note}</p>
            <p className="text-gray-400">Status: {price.Status}</p>
            {price.SpecialLink && (
              <p className="text-gray-400">Special Link: <a href={price.SpecialLink} className="text-blue-400 hover:underline">{price.SpecialLink}</a></p>
            )}
            <div className="flex gap-4 mt-4">
              <button onClick={() => handleEdit(price)} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition">
                Edit
              </button>
              <button onClick={() => handleDelete(price.Name)} className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPrices;
