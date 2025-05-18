import { useState, useEffect, useRef } from 'react';

const carouselItems = [
  {
    id: 1,
    image: "https://res.cloudinary.com/bsingh6636/image/upload/v1717157641/page/20240529035057_pan_ux15zj.avif",
    // title: "Panchayat",
    // description: "Prime Video"
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/bsingh6636/image/upload/v1716585466/page/ott_mvrnlk.png",
    // title: "Mountain View",
    // description: "Discover breathtaking heights"
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/bsingh6636/image/upload/v1716585467/page/music_xf8x5o.png",
    // title: "Ocean Sunset",
    // description: "Witness stunning coastal views"
  },{
    image : 'https://res.cloudinary.com/bsingh6636/image/upload/v1717101257/page/SUSBCRIPTION-NEPAL_eddy09.png'
  },{
    image : 'https://www.koimoi.com/wp-content/new-galleries/2021/09/kota-factory-season-2-review-002.jpg'
  }
];

export function CarouselTransition() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
        ),
      2000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative mt-2 w-full max-w-5xl mx-auto overflow-hidden rounded-xl shadow-xl">
      {/* Carousel container */}
      <div
        className="whitespace-nowrap transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselItems.map((item) => (
          <div
            key={item.id}
            className="inline-flex items-center justify-center w-full h-64 md:h-96 relative"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center px-6 max-w-2xl">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-sm md:text-lg text-gray-100">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
  onClick={goToPrevious}
  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full shadow-md transition-all group"
  aria-label="Previous slide"
>
  <svg 
    className="h-6 w-6 text-gray-800 group-hover:text-gray-900 transition-colors"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
</button>

<button
  onClick={goToNext}
  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full shadow-md transition-all group"
  aria-label="Next slide"
>
  <svg 
    className="h-6 w-6 text-gray-800 group-hover:text-gray-900 transition-colors"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
</button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all ${currentIndex === index ? 'bg-white w-6 md:w-8' : 'bg-white bg-opacity-50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}