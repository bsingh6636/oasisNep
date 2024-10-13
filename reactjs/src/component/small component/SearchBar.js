import React, { useState } from 'react';
import { Pricelist } from '../../const';
import { Link } from 'react-router-dom';

const SearchBar = ({ name, imageUrl }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchedItem, setSearchItem] = useState([]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchValue(query);
        setSearchItem(
            query.length > 1
                ? Pricelist.filter((item) =>
                    item.Name.toLowerCase().includes(query.toLowerCase())
                )
                : []
        );
    };

    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg m-2 space-y-4 transition-transform duration-300 transform">
            <div className="flex items-center w-full">
                <input
                    value={searchValue}
                    onChange={handleSearchChange}
                    type="text"
                    placeholder="Search..."
                    className="flex-1 p-3 rounded-l-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
                />
                <button className="ml-2 p-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-r-lg text-white hover:from-blue-600 hover:to-teal-600 focus:outline-none transition duration-300 transform hover:scale-105">
                    Search
                </button>
            </div>
            {imageUrl && (
                <div className="flex items-center space-x-3">
                    <img src={imageUrl} alt={name} className="w-12 h-12 rounded-full border-4 border-gray-900 shadow-lg transform transition-transform duration-300 hover:scale-110" />
                    <span className="text-xl font-semibold">{name}</span>
                </div>
            )}
            {searchedItem.length > 0 && <SearchedResultDisplay searchedItem={searchedItem} />}
        </div>
    );
};

const SearchedResultDisplay = ({ searchedItem }) => {
    return (
        <div className="mt-4 w-full space-y-2">
            {searchedItem.slice(0, 4).map(item => {
                const firstPlanKey = Object.keys(item.plans)[0];
                const firstPlanValue = item.plans[firstPlanKey];

                return (
                    <Link 
                        to={`/prices/${item.Name}`} 
                        key={item.id} 
                        className="no-underline"
                    > 
                        <div className="flex items-center p-3 border-b border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:animate-scaleHover shadow-lg rounded-lg">
                            <img
                                src={item.ImageId}
                                alt={item.Name}
                                className="w-20 h-20 rounded-lg object-cover border-2 border-gradient-to-r from-purple-400 to-blue-500"
                            />
                            <div className="ml-4 flex flex-col space-y-1">
                                <span className="text-lg font-bold text-indigo-300">{item.Name}</span>
                                <span className="text-gray-400 text-sm">{firstPlanValue} for {firstPlanKey} month</span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SearchBar;
