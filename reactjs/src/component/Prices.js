import { useContext, useEffect, useState, useMemo } from "react";
import { Pricelist as PricelistMock } from "../const";
import { useParams } from "react-router-dom";
import { MyContext } from "../App";
import { priceUpdate } from "../helper/priceUpdate";

import FlipkartLayout from "./FlipkartLayout";

export const Prices = () => {
  const { priceListAll, setPriceListAll } = useContext(MyContext);
  const { cat } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [priceListCopy, setPriceListCopy] = useState(priceListAll || PricelistMock);
  const [isLoading, setIsLoading] = useState(!priceListAll.length);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Memoize filtering logic to avoid recalculating on every render
  const filteredPrices = useMemo(() => {
    return priceListCopy.filter((item) => {
      const matchesCategory = cat ? item.category === cat : true;
      const matchesSearch = item?.Name?.toLowerCase().includes(searchValue.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [priceListCopy, cat, searchValue]);

  useEffect(() => {
    // Fetch and update prices only if priceListAll is empty
    if (!priceListAll.length) {
      const updatePrices = async () => {
        setIsLoading(true);
        try {
          const response = await priceUpdate(PricelistMock);
          setPriceListAll(response);
          setPriceListCopy(response);
        } catch (error) {
          console.log('Failed to fetch prices', error);
          // Fallback to mock data if API fails
          setPriceListCopy(PricelistMock);
        } finally {
          setIsLoading(false);
        }
      };
      updatePrices();
    }
  }, [priceListAll, setPriceListAll]);

  // Set initial filter based on cat param
  useEffect(() => {
    if (cat) {
      setActiveFilter(cat);
    }
  }, [cat]);

  const handleSearch = (e) => {
    setSearchValue(e);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  const buttonFilter = (buttonName) => {
    setActiveFilter(buttonName);
    setShowFilterDrawer(false);

    if (buttonName === "all") {
      setPriceListCopy(priceListAll.length ? priceListAll : PricelistMock);
      return;
    }

    setPriceListCopy(
      priceListAll.length ?
        priceListAll.filter((data) => data.category === buttonName) :
        PricelistMock.filter((data) => data.category === buttonName)
    );
  };


  return (
    <FlipkartLayout
      items={filteredPrices}
      isLoading={isLoading}
      onSearch={handleSearch}
      onFilter={buttonFilter}
      activeCategory={activeFilter}
    />
  );
};


export default Prices;