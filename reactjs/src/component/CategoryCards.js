import React from 'react';
import { Category } from "../const";
import { Link } from "react-router-dom";

export const CategoryCards = () => {
    return (
        <div className="flex flex-wrap justify-center gap-6 p-6">
            {Category.map((category, index) => (
                <Link to={`/price/${category.name}`} key={index} className="linkheader">
                    <div className="transform transition-all duration-300 ease-in-out hover:animate-scaleHover hover:shadow-lg rounded-lg overflow-hidden bg-white shadow-md flex flex-col items-center p-4">
                        <img src={category.imgurl} className="rounded-3xl h-[300px] w-[300px] object-cover mb-4" alt="not loading" />
                        <h5 className="categoryname text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                            {category.name}
                        </h5>
                    </div>
                </Link>
            ))}
        </div>
    );
};
