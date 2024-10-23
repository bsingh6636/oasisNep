import React from "react";
// import { Carouseel } from "./carousel/Carousel";
import WhatsNew from "./small component/WhatsNew";
import SearchBar from "./small component/SearchBar";
import Update from "./Update";
import AllPrices from "./AllPrices";
import { CategoryCards } from "./CategoryCards";
import SimpleSlider from "./carousel/Carousel";
export const Body = () => {
  return (
    <>
      <SearchBar />
      {/* <Carouseel /> */}
      {/* <SimpleSlider/> */}
      <CategoryCards/>
      <WhatsNew />
      <Update />
      <AllPrices />
      
    </>
  );
};
