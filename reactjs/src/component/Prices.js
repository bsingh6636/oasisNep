import React, { useContext, useEffect, useState } from "react";
import { Pricelist } from "../const";
import { useParams } from "react-router-dom";
import "../css/body.css"
import AllPrices from "./AllPrices";
import { BackendPort } from "../Const/url";
import { MyContext } from "./App";
import { priceUpdate } from "../helper/priceUpdate";

export const Prices = () => {
  let [searchvalue, setsearchvalue] = useState();
  let [Pricelistcopy, setPricelistcopy] = useState(Pricelist);
  const { priceListAll , setPriceListAll } = useContext(MyContext)
  console.log(priceListAll)
  const { cat } = useParams();


  useEffect(() => {

    if (cat === undefined) {
      //nothing
    } else {
      let searchedlist = Pricelist.filter((res) => res.category === cat);
      setPricelistcopy(searchedlist);
    }
  }, [cat]);



  useEffect(() => {
    async function getPrice() {
      const response =await priceUpdate(Pricelistcopy)
      setPricelistcopy(response)
      setPriceListAll(response)
      console.log('res' , response)
    }
    getPrice()
  }, []);
  
  console.log(Pricelistcopy);
  


  const searchlist = () => {
    let searchedlist = Pricelist.filter(
      (res) =>
        res.Name.toLowerCase().includes(searchvalue.toLowerCase())
    );
    if (searchedlist.length === 0) {
      setPricelistcopy(Pricelist);
    } else {
      setPricelistcopy(searchedlist);
    }
  };

  const buttonFilter = (buttonName) => {
    let filteredlist = Pricelist.filter((data) => data.category === buttonName)
    setPricelistcopy(filteredlist)
  }

  return (
    <div className="mt-3 min-h-screen p-6">
      <div className="flex flex-wrap items-center justify-center mb-6 space-x-4">
        <input
          type="text"
          className="px-4 py-2 border mb-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out hover:shadow-lg"
          value={searchvalue}
          onChange={(e) => {
            setsearchvalue(e.target.value);
            setTimeout(searchlist, 1000);
          }}
          placeholder="Enter text"
        />
        <button
          onClick={searchlist}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-full hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
        >
          Search
        </button>
        <button
          onClick={() => buttonFilter("vpn")}
          className="bg-gradient-to-r from-green-400 to-green-600 text-white px-5 py-2 rounded-full hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
        >
          VPN
        </button>
        <button
          onClick={() => buttonFilter("18+")}
          className="bg-gradient-to-r from-red-400 to-red-600 text-white px-5 py-2 rounded-full hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50 shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
        >
          18+
        </button>
        <button
          onClick={() => setPricelistcopy(Pricelist)}
          className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-5 py-2 rounded-full hover:from-gray-600 hover:to-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
        >
          Clear All
        </button>
      </div>
      {/* // Here*/}
      <AllPrices Pricelistcopy={Pricelistcopy}/>
    </div>
  );
};

export default Prices;
