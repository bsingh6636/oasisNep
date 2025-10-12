import React from "react";
import "../css/ImageHover.css"; // We'll update this file

export default function ImageHover({ imageUrl, className = "" }) {
  // All the animation logic is now handled by CSS :hover
  return (
    <div className={`image-hover-container ${className} mt-5`}>
      <div
        className="card card-css-transition" // Added a class for styling
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
    </div>
  );
}