import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, ImageOff } from 'lucide-react';
import { oldCarouselItem } from '../../const';
import axios from 'axios';
import { BackendPort } from '../../Const/url';


// Enhanced Image component with fallback and loading states
const EnhancedImage = ({ src, alt, className }) => {
  const [imageStatus, setImageStatus] = useState('loading');

  return (
    <div className={`${className} relative overflow-hidden`}>
      {imageStatus === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 animate-pulse">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {imageStatus === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-gray-400">
          <ImageOff className="w-10 h-10 mb-2" />
          <span className="text-sm font-medium">{alt || 'Image not available'}</span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageStatus !== 'loaded' ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setImageStatus('loaded')}
        onError={() => setImageStatus('error')}
      />
    </div>
  );
};

// Badge component with different color variants
const Badge = ({ text, variant = 'default' }) => {
  // Color variants for badges
  const variants = {
    default: 'from-blue-600 to-indigo-700',
    hot: 'from-red-600 to-rose-700',
    new: 'from-emerald-600 to-green-700',
    trending: 'from-purple-600 to-violet-700',
    limited: 'from-amber-500 to-orange-600',
    bestseller: 'from-fuchsia-600 to-pink-700'
  };

  // Determine which variant to use based on text
  const getBadgeVariant = () => {
    const lowercaseText = text.toLowerCase();
    if (lowercaseText.includes('hot')) return variants.hot;
    if (lowercaseText.includes('new')) return variants.new;
    if (lowercaseText.includes('trend')) return variants.trending;
    if (lowercaseText.includes('limited')) return variants.limited;
    if (lowercaseText.includes('best')) return variants.bestseller;
    return variants.default;
  };

  return (
    <div className={`absolute top-3 left-3 md:top-4 md:left-4 bg-gradient-to-r ${getBadgeVariant()} 
      text-white text-xs font-bold px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-full 
      uppercase tracking-wider shadow-lg z-10 backdrop-blur-sm`}>
      {text}
    </div>
  );
};

export const CarouselTransition = ({ autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchPosition, setTouchPosition] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [items , setItems] = useState(oldCarouselItem);
  const timeoutRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Fetch carousel items from the backend
    getCarouselItems();
  }, []);

  const getCarouselItems =  async () => {
    try {
      const data = await axios.get(`${BackendPort}/carousel`);
      if (data.status === 200 && data?.data?.length > 0) {
        setItems(data.data);
      } else {
        console.error('Failed to fetch carousel items');
      }
    } catch (error) {
      console.error('Error fetching carousel items:', error);
    }
  };

  // Reset autoplay timeout
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Handle autoplay
  useEffect(() => {
    if (isAutoPlaying && !isHovering) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => goToNext(), autoPlayInterval);
    }

    return () => resetTimeout();
  }, [currentIndex, isAutoPlaying, isHovering, autoPlayInterval]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!carouselRef.current) return;

      // Only handle keys if the carousel or its children have focus
      if (!carouselRef.current.contains(document.activeElement) && document.activeElement !== document.body) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        goToPrevious();
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        goToNext();
        e.preventDefault();
      } else if (e.key === 'Space') {
        setIsAutoPlaying(prev => !prev);
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Control hover state
  const handleMouseEnter = () => {
    setIsHovering(true);
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsAutoPlaying(true);
  };

  // Navigation functions
  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    resetTimeout();

    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );

    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    resetTimeout();

    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );

    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    resetTimeout();

    setCurrentIndex(index);

    setTimeout(() => setIsAnimating(false), 500);
  };

  // Touch events for swipe
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    if (touchPosition === null) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchPosition - currentTouch;

    // Threshold for swipe detection
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
      setTouchPosition(null);
    }
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden bg-gray-900 p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Main carousel container */}
      <div
        ref={carouselRef}
        className="relative max-w-7xl mx-auto rounded-2xl shadow-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        role="region"
        aria-label="Featured promotions carousel"
        aria-roledescription="carousel"
        tabIndex="0"
      >
        {/* Slides container */}
        <div
          className="whitespace-nowrap transition-all duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="inline-flex w-full relative"
              role="group"
              aria-roledescription="slide"
              aria-label={`${item.title} - ${index + 1} of ${items.length}`}
              aria-hidden={currentIndex !== index}
            >
              <div className="w-full bg-gray-800 rounded-xl overflow-hidden">
                {/* More responsive layout for all screen sizes */}
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Image container - Full width on mobile, 60% on desktop */}
                  <div className="relative w-full lg:w-3/5 aspect-[16/9] sm:aspect-[16/8] md:aspect-auto md:h-64 lg:h-auto overflow-hidden">
                    <EnhancedImage
                      src={item.image}
                      alt={`${item.title} promotional image`}
                      className="w-full h-full"
                    />

                    {/* Badge */}
                    {item.badge && <Badge text={item.badge} />}
                  </div>

                  {/* Content container - Better spacing and padding on all devices */}
                  <div className="flex flex-col justify-center w-full lg:w-2/5 p-4 sm:p-5 md:p-6 lg:p-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-white leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 md:mb-6 line-clamp-3">
                      {item.description}
                    </p>
                    <button
                      className="self-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                        text-white font-semibold py-2 px-4 md:py-2.5 md:px-6 rounded-full shadow-lg
                        hover:shadow-blue-700/20 hover:shadow-xl transition-all duration-300 transform
                        hover:-translate-y-0.5 text-sm md:text-base focus:outline-none focus:ring-2
                        focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                      aria-label={item.ctaText}
                    >
                      {item.ctaText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced navigation arrows with better visibility and touch targets */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2
            bg-gray-900/70 hover:bg-gray-900/90 text-white p-1.5 sm:p-2 md:p-3
            rounded-full shadow-lg backdrop-blur-sm transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
            focus:ring-offset-gray-800 z-10"
          aria-label="Previous slide"
          disabled={isAnimating}
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2
            bg-gray-900/70 hover:bg-gray-900/90 text-white p-1.5 sm:p-2 md:p-3
            rounded-full shadow-lg backdrop-blur-sm transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
            focus:ring-offset-gray-800 z-10"
          aria-label="Next slide"
          disabled={isAnimating}
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </button>

        {/* Better indicators with active state animation */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-0 right-0 flex justify-center items-center space-x-1.5 sm:space-x-2 md:space-x-2.5 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full ${
                currentIndex === index
                  ? 'w-6 sm:w-8 md:w-10 h-1.5 sm:h-2 bg-blue-500'
                  : 'w-2 sm:w-2.5 md:w-3 h-1.5 sm:h-2 bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index ? 'true' : 'false'}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>

      {/* Autoplay toggle with better visibility */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 right-3 sm:right-4 md:right-5 z-20">
        <button
          onClick={() => setIsAutoPlaying(prev => !prev)}
          className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            ${isAutoPlaying
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isAutoPlaying ? (
            <Pause className="h-3 w-3 sm:h-4 sm:w-4" />
          ) : (
            <Play className="h-3 w-3 sm:h-4 sm:w-4" />
          )}
        </button>
      </div>

      {/* Enhanced decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-700/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-700/10 blur-3xl"></div>
      </div>
    </div>
  );
};

// Usage example with custom settings:
