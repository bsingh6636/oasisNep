import React from "react";
import "../css/category.css";
// import { CategoryCards } from "./CategoryCards";
import { Carouseel } from "./carousel/Carousel";
import WhatsNew from "./small component/WhatsNew";
import SearchBar from "./small component/SearchBar";
import Update from "./Update";
import AllPrices from "./AllPrices";
export const Body = () => {
  return (
    <>
      <SearchBar />
      <Carouseel />
      {/* <CategoryCards /> */}
      <WhatsNew />
      <Update />
      <AllPrices />
    </>
  );
};
