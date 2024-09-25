import React from 'react'
import { Pricelist as prices } from '../const';
import { Link } from 'react-router-dom';
const AllPrices = ({Pricelistcopy}) => {
    if(!Pricelistcopy){
        Pricelistcopy =prices
    }
  return (
    <div className="flex flex-wrap justify-center gap-6">
    {Pricelistcopy && Pricelistcopy.map((Pricelist, index) => {
      let firstPlanKey, firstPlanValue;
      if (Pricelist.plans) {
        firstPlanKey = Object.keys(Pricelist.plans)[0];
        firstPlanValue = Pricelist.plans[firstPlanKey];
      }

      return (
        <Link to={"/prices/" + Pricelist.Name} key={index + 1} className='linkheader'>
          <div className="p-4 transition-transform duration-500 ease-in-out transform hover:scale-105 hover:m-1 hover:animate-pulse shadow-lg m-1 rounded-lg overflow-hidden ">
            <div className="relative">
              <img
                src={Pricelist.imgid}
                alt="url not loaded"
                className="w-[250px] h-[250px] rounded-3xl object-cover"
              />
              {Pricelist.plans && (
                <span className="absolute bottom-1 left-4 ml-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold p-2 rounded shadow-lg">
                  {firstPlanKey} month @ {firstPlanValue}
                </span>
              )}
            </div>
            <h6 className="text-white font-medium flex justify-center font-mono mt-4 bg-gradient-to-r from-green-400 to-blue-500 p-1 rounded">
              {Pricelist.Name}
            </h6>
          </div>
        </Link>
      );
    })}
  </div>
  )
}

export default AllPrices