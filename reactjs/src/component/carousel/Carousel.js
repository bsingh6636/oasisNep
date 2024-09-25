import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { carouselimg } from "../../const";
import "../../css/Carousel.css"

export const Carouseel = () => {
  const departmentsArray = [
    {
      name: "Netflix",
      imageUrl: carouselimg[4],
    },
    {
      name: "Prime",
      imageUrl: carouselimg[0],
    },
    {
      name: null,
      imageUrl: carouselimg[1],
    },
    {
      name: null,
      imageUrl: carouselimg[2],
    },
    {
      name: null,
      imageUrl: carouselimg[3],
    },
    
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="container departments m-1">
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            // "superLargeDesktop",
            // "desktop",
            "tablet",
            "mobile",
          ]}
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div key={index} className="card shadow-lg hover:animate-pulse">
               {depart.name &&  <div className="depart-name">{depart.name}</div> }
                <img className="rounded-2xl " src={depart.imageUrl} alt="Department" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

