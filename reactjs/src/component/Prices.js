import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import axios from 'axios';
import { Pricelist } from '../const'; // Corrected path
import AllPricesShimmer from './small component/Shimmer/AllPricesShimmer';
import { Search, Filter, X, ShoppingCart } from 'lucide-react';

const Prices = () => {
  const dispatch = useDispatch();
  const [prices, setPrices] = useState(Pricelist);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // aip call to /prices not /api/prices
        const response = await axios.get('http://localhost:8080/prices');
        setPrices(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    // Initially we are showing mock data, so set loading to false
    setLoading(false);
    fetchPrices();
  }, []);

  const filteredServices = useMemo(() => {
    let filtered = prices;
    if (activeFilter !== 'all') {
      filtered = filtered.filter(service => service.category === activeFilter);
    }
    if (searchValue) {
      filtered = filtered.filter(service => service.name.toLowerCase().includes(searchValue.toLowerCase()));
    }
    return filtered;
  }, [prices, activeFilter, searchValue]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  const handleFilterClick = (category) => {
    setActiveFilter(category);
  };

  const handleAddToCart = (service) => {
    dispatch(addItem(service));
  };

  const filterOptions = useMemo(() => {
    const categories = prices.filter(s => s.category).map(s => s.category).filter((v, i, a) => a.indexOf(v) === i);
    return ['all', ...categories];
  }, [prices]);


  if (loading) {
    return <AllPricesShimmer />;
  }

  if (error) {
    // return <div>Error: {error.message}</div>;
    // if error, we can still show the mock data
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 text-gray-800 dark:text-gray-100">
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-3 py-3">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-xl font-bold truncate text-gray-900 dark:text-white">Subscriptions</h1>
          </div>
          <div className="mt-3 relative">
            <div className="relative flex items-center">
              <Search size={18} className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscriptions..."
                value={searchValue}
                onChange={handleSearch}
                className="w-full bg-gray-100 dark:bg-gray-800 rounded-full py-2 pl-10 pr-10 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              {searchValue && (
                <button onClick={clearSearch} className="absolute right-3 p-1 text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          <div className="flex mt-3 pb-1 space-x-1.5 overflow-x-auto">
            {filterOptions.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterClick(category)}
                className={`px-3 py-1.5 text-xs rounded-full transition-colors whitespace-nowrap ${activeFilter === category ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}>
                {category?.charAt(0)?.toUpperCase() + category.slice(1) || 'N / a' }
              </button>
            ))}
            {console.log(filterOptions)}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 pb-6">
        <AllPrices services={filteredServices} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

const AllPrices = ({ services, onAddToCart }) => {
  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <p>No subscriptions found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {services.map((service) => (
        <div key={service.Id} className="block group">
          <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200">
            <Link to={`/prices/${service.Name}`} className="block">
              <div className="pb-[100%] relative">
                <img src={service.ImageId || '/api/placeholder/400/400'} alt={service.Name} className="absolute top-0 left-0 w-full h-full object-cover"/>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">{service.Name}</h3>
                <p className="text-xs font-semibold text-purple-700 dark:text-purple-400">NPR {service.plans ? Object.values(service.plans)[0] : 'N/A'}</p>
              </div>
            </Link>
            <div className="p-3 pt-0">
              <button onClick={() => onAddToCart(service)} className="w-full bg-purple-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                <ShoppingCart size={14} className="mr-2" />
                    Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Prices;
