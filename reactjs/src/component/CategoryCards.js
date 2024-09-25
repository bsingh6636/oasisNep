import React from 'react';
import { Category } from "../const";
import {Link} from "react-router-dom"
export const CategoryCards = () => {
 return (
    <div className="categorycontainer flex flex-wrap  justify-center ">
      {Category.map((category, index) => (
         <Link to={"/price/" + category.name}key={index + 1} className='linkheader'>
        <div className="Cardcontainer  transition-all duration-500 ease-in-out  transform hover:scale-105" key={index + 1}>
          <img src={category.imgurl} className="rounded-3xl h-[300px] w-[300px]" alt="not loading" />
          <h5 className="categoryname">{category.name}</h5>
        </div> </Link>)
      )}
    </div>
 );
};
