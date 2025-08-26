import React from 'react';
import { useSpring, animated } from 'react-spring';
import '../css/ImageHover.css';

// Function to generate the 3D transformation string
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

// Calculate the tilt based on mouse position relative to the card
const calc = (x, y, rect) => {
  const offsetX = x - (rect.left + rect.width / 2);
  const offsetY = y - (rect.top + rect.height / 2);
  const tiltX = -(offsetY / 20); // Adjust sensitivity
  const tiltY = offsetX / 20;
  return [tiltX, tiltY, 1.1]; // Slight zoom effect on hover
};

export default function ImageHover({ imageUrl, className = '' }) {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1], // Initial state
    config: { mass: 5, tension: 350, friction: 40 } // Smooth animation
  }));

  return (
    <div className={`image-hover-container ${className} mt-5`}>
      <animated.div
        className="card"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const { clientX: x, clientY: y } = e;
          set({ xys: calc(x, y, rect) });
        }}
        onMouseLeave={() => set({ xys: [0, 0, 1] })} // Reset on mouse leave
        style={{
          transform: props.xys.to(trans), // Apply 3D transform
          backgroundImage: `url(${imageUrl})`
        }}
      />
    </div>
  );
}
