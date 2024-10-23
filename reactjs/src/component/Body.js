import React from "react";
import { Carouseel } from "./carousel/Carousel";
import WhatsNew from "./small component/WhatsNew";
import SearchBar from "./small component/SearchBar";
import Update from "./Update";
import AllPrices from "./AllPrices";
import { CategoryCards } from "./CategoryCards";
export const Body = () => {
  return (
    <>
      <SearchBar />
      <Carouseel />
      <CategoryCards/>
      <WhatsNew />
      <Update />
      <AllPrices />
      
    </>
  );
};
