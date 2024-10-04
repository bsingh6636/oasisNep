import React from 'react';
import { Pricelist as prices } from '../const';
import { Link } from 'react-router-dom';

const AllPrices = ({ Pricelistcopy }) => {
    if (!Pricelistcopy) {
        Pricelistcopy = prices;
    }

    return (
        <div className="flex flex-wrap justify-center gap-6 p-6">
            {Pricelistcopy && Pricelistcopy.map((Pricelist) => {
                let firstPlanKey, firstPlanValue;
                if (Pricelist.plans) {
                    firstPlanKey = Object.keys(Pricelist.plans)[0];
                    firstPlanValue = Pricelist.plans[firstPlanKey];
                }

                return (
                    <Link to={`/prices/${Pricelist.Name}`} key={Pricelist.Id} className='linkheader'>
                        <div className="transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md m-2 p-4">
                            <div className="relative">
                                <img
                                    src={Pricelist.imgid ? Pricelist.imgid : Pricelist.ImageId}
                                    alt='Image not found'
                                    className="w-full h-[250px] rounded-3xl object-cover mb-2"
                                />
                                {Pricelist.plans && (
                                    <span className="absolute bottom-1 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold p-2 rounded shadow-lg">
                                        {firstPlanKey} month @ {firstPlanValue}
                                    </span>
                                )}
                            </div>
                            <h6 className="text-gray-800 dark:text-gray-200 font-medium flex justify-center font-mono mt-2 bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded">
                                {Pricelist.Name}
                            </h6>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default AllPrices;
