import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { fetchServices } from "../redux/serviceSlice";
import "../css/ripple.css";
import FAQ from "./small component/FAQ";
import { PriceDetailsShimmer } from "../import";
import { ShoppingCart, Check } from "lucide-react";

const PriceDetails = () => {
  const dispatch = useDispatch();
  const { object: serviceName } = useParams();
  const { services, status } = useSelector((state) => state.services);

  const [details, setDetails] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchServices());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (services.length > 0) {
      const foundItem = services.find((item) => item.name === serviceName);
      if (foundItem) {
        setDetails(foundItem);
        setSelectedPrice(foundItem.price);
      }
    }
  }, [services, serviceName]);


  const handleAddToCart = (e) => {
    if (!details) return;

    dispatch(addItem(details));

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  if (status === 'loading' || !details) {
    return <PriceDetailsShimmer />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-4 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-gray-100 dark:bg-black">
              <img
                className="w-full h-full object-contain"
                src={details.imageUrl || "/api/placeholder/600/600"}
                alt={details.name}
              />
            </div>

            <div className="w-full md:w-1/2 p-6">
              <h1 className="text-3xl font-bold mb-2">{details.name}</h1>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                <p className="text-gray-700 dark:text-gray-200">{details.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-500">
                  Price: NPR {selectedPrice}
                </h2>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full font-medium py-3 rounded-md mt-6 transition-all duration-300 ${
                  isAdded ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                {isAdded ? (
                  <span className="flex items-center justify-center">
                    <Check className="w-5 h-5 mr-2" />
                    Added to Cart!
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mt-6">
          <FAQ details={details} />
        </div>
      </div>
    </div>
  );
};

export default PriceDetails;