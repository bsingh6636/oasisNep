import React, { useState } from 'react';
import { BackendPort } from '../../Const/url';

  const Update = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    ImageUrl: ''
  });

  // Handle change in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BackendPort}/admin/addNewUpdates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data posted successfully:', data);
        // Optionally handle success state here (e.g., reset form, show message, etc.)
      } else {
        console.error('Error posting data:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Post Form</h2>

        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="Title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={formData.Title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter Title"
            // required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label
            htmlFor="Description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="Description"
            name="Description"
            value={formData.Description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter Description"
            required
          ></textarea>
        </div>

        {/* ImageUrl Field */}
        <div className="mb-4">
          <label
            htmlFor="ImageUrl"
            className="block text-gray-700 font-bold mb-2"
          >
            Image URL
          </label>
          <input
            type="url"
            id="ImageUrl"
            name="ImageUrl"
            value={formData.ImageUrl}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter Image URL"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;