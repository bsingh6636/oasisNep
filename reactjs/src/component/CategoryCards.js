import React from 'react';
import { Category } from "../const";
import { Link } from "react-router-dom";

export const CategoryCards = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {Category.map((category, index) => (
                    <Link 
                        to={`/price/${category.name}`} 
                        key={index} 
                        className="group block transition-transform duration-300 hover:scale-105 focus:scale-105 focus:outline-none"
                    >
                        <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                            {/* Image with hover zoom effect */}
                            <div className="overflow-hidden">
                                <img 
                                    src={category.imgurl} 
                                    className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                                    alt={category.name}
                                    loading="lazy"
                                />
                            </div>
                            
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Category name */}
                            <div className="p-4 mt-auto text-center">
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                    {category.name}
                                </h3>
                                <span className="inline-block mt-2 px-4 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                                    View Prices
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
