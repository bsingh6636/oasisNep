import React from "react";
// import { Carouseel } from "./carousel/Carousel";
import WhatsNew from "./small component/WhatsNew";
import SearchBar from "./small component/SearchBar";
import Update from "./Update";
import AllPrices from "./AllPrices";
import { CategoryCards } from "./CategoryCards";
import { CarouselTransition } from "./carousel/Carousel";
export const Body = () => {
  return (
    <>
      <SearchBar />
      {/* <CarouselTransition/> */}
      <CategoryCards/>
      <WhatsNew />
      <Update />
      <AllPrices />
      
    </>
  );
};
