import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit, Plus, X, Save, Image as ImageIcon } from 'lucide-react';
import { BackendPort } from '../Const/url';

// You would replace this with your actual backend URL

const CarouselAdmin = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    image: '',
    title: '',
    description: '',
    badge: '',
    ctaText: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all carousel items
  const fetchCarouselItems = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BackendPort}/admin/carousel`);
      setCarouselItems(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch carousel items');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCarouselItems();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({ ...prev, [name]: value }));
  };

  // Open modal for adding new item
  const handleAddNew = () => {
    setCurrentItem({
      image: '',
      title: '',
      description: '',
      badge: '',
      ctaText: ''
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open modal for editing item
  const handleEdit = (item) => {
    setCurrentItem({ ...item });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${BackendPort}/admin/carousel/${currentItem._id}`, currentItem);
      } else {
        await axios.post(`${BackendPort}/admin/carousel`, currentItem);
      }
      fetchCarouselItems();
      setIsModalOpen(false);
    } catch (err) {
      setError(isEditing ? 'Failed to update item' : 'Failed to add item');
      console.error(err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${BackendPort}/admin/carousel/${id}`);
        fetchCarouselItems();
      } catch (err) {
        setError('Failed to delete item');
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Carousel Admin Dashboard</h1>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
          >
            <Plus size={18} />
            Add New Item
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-900 border border-red-800 text-red-100 px-4 py-3 rounded mb-4 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)}>
              <X size={18} />
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          /* Carousel Items Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {carouselItems.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-gray-800 rounded-lg">
                <ImageIcon size={48} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-medium text-gray-400">No carousel items found</h3>
                <p className="text-gray-500 mt-2">Add your first carousel item to get started</p>
              </div>
            ) : (
              carouselItems.map((item) => (
                <div key={item._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
                  {/* Image Preview */}
                  <div className="h-48 bg-gray-700 relative overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ImageIcon size={48} className="text-gray-600" />
                      </div>
                    )}
                    {item.badge && (
                      <span className="absolute top-2 left-2 bg-blue-600 text-xs font-medium px-2 py-1 rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>

                    {item.ctaText && (
                      <div className="text-sm text-gray-300 mb-4">
                        <span className="font-medium">CTA: </span>
                        {item.ctaText}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-gray-700 rounded-md transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-700 p-4">
              <h2 className="text-xl font-semibold">
                {isEditing ? 'Edit Carousel Item' : 'Add New Carousel Item'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Image URL *
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={currentItem.image}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={currentItem.title}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter title"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={currentItem.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                  ></textarea>
                </div>

                {/* Badge */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Badge
                  </label>
                  <input
                    type="text"
                    name="badge"
                    value={currentItem.badge}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="New, Featured, etc. (optional)"
                  />
                </div>

                {/* CTA Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    CTA Text
                  </label>
                  <input
                    type="text"
                    name="ctaText"
                    value={currentItem.ctaText}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Learn More, Shop Now, etc. (optional)"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="mt-6 flex space-x-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors"
                >
                  <Save size={18} />
                  {isEditing ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselAdmin;
