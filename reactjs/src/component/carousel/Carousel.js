import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {/* <div>
        <img src="https://res.cloudinary.com/bsingh6636/image/upload/v1716585467/page/music_xf8x5o.png"></img>
      </div>
      <div>
        <img src="https://res.cloudinary.com/bsingh6636/image/upload/v1716585466/page/ott_mvrnlk.png"/>
      </div> */}
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
}