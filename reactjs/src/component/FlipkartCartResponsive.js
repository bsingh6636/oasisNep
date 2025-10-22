import React, { useContext } from 'react';
import { MyContext } from '../App';
import FlipkartCart from './FlipkartCart';
import FlipkartCartMobile from './FlipkartCartMobile';

const FlipkartCartResponsive = () => {
  const { device } = useContext(MyContext);
  
  // Use mobile layout for mobile devices, desktop layout for others
  if (device === 'mobile') {
    return <FlipkartCartMobile />;
  }
  
  return <FlipkartCart />;
};

export default FlipkartCartResponsive;