import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Pricelist as PircelistMock } from "../const";
import { useDispatch } from "react-redux";
import { addItem } from "../Const/cartslice";
import "../css/ripple.css";
import FAQ from "./small component/FAQ";
import CommentSection from "./small component/CommentSection";
import { MyContext } from "./App";
import { priceUpdate } from "../helper/priceUpdate";

export const PriceDetails = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("1");
  const [chosenMonth, setChosenMonth] = useState(null); // Updated name
  const { object } = useParams();
  const { priceListAll, setPriceListAll } = useContext(MyContext);
  const [Pricelist, setPricelist] = useState(priceListAll || []); // Ensure priceListAll is set or empty

  useEffect(() => {
    async function getAllPrice() {
      const response = await priceUpdate(PircelistMock);
      setPriceListAll(response);
      setPricelist(response);
    }

    if (!Pricelist.length) {
      getAllPrice();
    }

    const item = Pricelist.find((i) => i.Name === object);
    if (item) {
      setDetails(item);
      if (item.plans) {
        const [firstMonthKey, firstMonthValue] = Object.entries(item.plans)[0];
        setChosenMonth(firstMonthKey);
        setSelectedMonth(firstMonthValue);
      }
    }
  }, [Pricelist, object, setPriceListAll]); // Added missing dependencies

  const handleMonthClick = (key, value) => {
    setChosenMonth(key);
    setSelectedMonth(value);
  };

  const handleDeviceChange = (e) => setSelectedDevice(e.target.value);

  const totalCost = parseInt(selectedMonth) * parseInt(selectedDevice);

  const additemtocart = (e) => {
    const { id, Name, imgid } = details;

    dispatch(addItem({ id, name: Name, selectedMonth, selectedDevice, image: imgid, cost: totalCost }));

    // Handle ripple effect
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${e.clientX - button.offsetLeft}px`;
    ripple.style.top = `${e.clientY - button.offsetTop}px`;

    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => {
      ripple.remove(); // Remove the ripple element after animation ends
    });
  };

  if (!details) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 shadow-lg rounded-lg bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <img
            className="w-full h-[350px] rounded-lg object-cover shadow-inner transform hover:scale-105 transition-transform duration-300 ease-in-out"
            src={details.ImageId}
            alt={details.Name}
          />
        </div>
        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{details.Name}</h1>
          <p className="bg-white p-4 rounded-lg shadow-inner text-gray-700">{details.Info}</p>
          {details.Note && (<p className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg mt-4 text-gray-800"> {details.Note} </p>)}


          {details.plans ? (
            <>
              <h4 className="mt-4 text-lg font-semibold text-gray-800">Number of months</h4>
              <ul className="flex space-x-2 mt-2">
                {Object.entries(details.plans).map(([key, value]) => (
                  <button
                    key={key}
                    className={`px-4 py-2 rounded-md border shadow-sm transition-colors duration-200 transform ${selectedMonth === value
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-100 text-gray-800 border-gray-300"
                      } hover:bg-blue-400 hover:scale-105`}
                    onClick={() => handleMonthClick(key, value)}
                  >
                    {key}
                  </button>
                ))}
              </ul>

              <h4 className="mt-4 text-lg font-semibold text-gray-800">Number of devices</h4>
              <div className="flex space-x-4 mt-2">
                {[1, 2, 3].map((num) => (
                  <label key={num} className="cursor-pointer">
                    <input
                      type="radio"
                      className="hidden"
                      name="radioGroup"
                      value={num}
                      checked={selectedDevice === `${num}`}
                      onChange={handleDeviceChange}
                    />
                    <span
                      className={`px-4 py-2 rounded-md border shadow-sm transition-colors duration-200 transform ${selectedDevice === `${num}`
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-100 text-gray-800 border-gray-300"
                        } hover:bg-blue-400 hover:scale-105`}
                    >
                      {num}
                    </span>
                  </label>
                ))}
              </div>
              <h6 className="mt-4 text-xl font-bold text-gray-800">Total cost: NPR {totalCost}</h6>
              <button
                onClick={additemtocart}
                className="mt-6 w-full bg-green-500 text-white font-semibold py-2 rounded-md shadow-lg transition-all duration-200 hover:bg-green-600 active:scale-95 ripple-button"
              >
                Add to Cart
              </button>
            </>
          ) :  (
            
            <p className="mt-4 text-gray-700 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-sm">
              Contact Admin for this Item
            </p>
          )}
        </div>
        {console.log(details)}
      </div>
      <FAQ chosenMonth={chosenMonth} details={details} />
      <CommentSection />
    </div>
  );
};

export default PriceDetails;
