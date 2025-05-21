import React, { useEffect, useState } from 'react';
import { TMDB_API_KEY } from '../../Const/url';

// Enhanced WhatsNew component with responsive design and device-specific card limits
const WhatsNew = () => {
  // Initial loading state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Fetch data from API
    const fetchNewContent = async () => {
      setIsLoading(true);
      try {
        // Option 1: Using your existing backend API
        // const response = await fetch(`${BackendPort}/admin/viewWhatsNewVideo`);
        
        // Option 2: Using TMDB API (need to replace with your API key)
        // Example API call to get trending/new content
        const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_API_KEY}`);
        const data = await response.json();
        
        // Transform the data to match our component needs
        if (data.results) {
          const transformedContent = data.results.slice(0, 12).map(item => ({
            id: item.id,
            Name: item.title || item.name,
            ImageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            BackdropUrl: `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`,
            Platform: determineStreamingPlatform(item.id), // You'd need this logic
            Overview: item.overview,
            ReleaseDate: item.release_date || item.first_air_date,
            Type: item.media_type,
            Rating: item.vote_average
          }));
          setContent(transformedContent);
        } else {
          // Fallback to sample data if API fails
          setContent(sampleContent);
        }
      } catch (err) {
        console.error('Failed to fetch content:', err);
        setError('Failed to load newest content. Please try again later.');
        setContent(sampleContent); // Fallback to sample data
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewContent();
  }, []);

  // Helper function to determine which platform a title is on
  const determineStreamingPlatform = (id) => {
    const platforms = ['Netflix', 'Prime Video', 'Disney+', 'Hulu', 'HBO Max', 'Apple TV+'];
    return platforms[id % platforms.length];
  };

  // Sample content for fallback and testing
  const sampleContent = [
    {
      id: 1,
      Name: "Stranger Things 4",
      ImageUrl: "/api/placeholder/500/750",
      Platform: "Netflix",
      Overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      ReleaseDate: "2022-05-27",
      Type: "tv",
      Rating: 8.6
    },
    {
      id: 2,
      Name: "The Boys",
      ImageUrl: "/api/placeholder/500/750",
      Platform: "Prime Video",
      Overview: "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.",
      ReleaseDate: "2022-06-03",
      Type: "tv",
      Rating: 8.7
    },
    {
      id: 3,
      Name: "Obi-Wan Kenobi",
      ImageUrl: "/api/placeholder/500/750",
      Platform: "Disney+",
      Overview: "Jedi Master Obi-Wan Kenobi watches over young Luke Skywalker and evades the Empire's elite Jedi hunters during his exile on Tatooine.",
      ReleaseDate: "2022-05-27",
      Type: "tv",
      Rating: 7.1
    },
    {
      id: 4,
      Name: "Top Gun: Maverick",
      ImageUrl: "/api/placeholder/500/750",
      Platform: "Paramount+",
      Overview: "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot.",
      ReleaseDate: "2022-05-27",
      Type: "movie",
      Rating: 8.3
    },
    {
      id: 5,
      Name: "Ms. Marvel",
      ImageUrl: "/api/placeholder/500/750",
      Platform: "Disney+",
      Overview: "Kamala Khan, a fangirl of the Avengers, particularly Carol Danvers / Captain Marvel, struggles to fit in until she gains her own powers.",
      ReleaseDate: "2022-06-08",
      Type: "tv",
      Rating: 6.8
    },
    {
      id: 6,
      Name: "The Terminal List",
      ImageUrl: "/api/placeholder/500/750",
      Platform: "Prime Video",
      Overview: "A former Navy SEAL officer investigates why his entire platoon was ambushed during a high-stakes covert mission.",
      ReleaseDate: "2022-07-01",
      Type: "tv",
      Rating: 7.9
    },
    {
      id: 7,
      Name: "House of the Dragon",
      ImageUrl: "/api/placeholder/500/750",
      Platform: "HBO Max",
      Overview: "The prequel to Game of Thrones during the Targaryen civil war.",
      ReleaseDate: "2022-08-21",
      Type: "tv",
      Rating: 9.2
    },
    {
      id: 8,
      Name: "Prey",
      ImageUrl: "/api/placeholder/500/750",
      Platform: "Hulu",
      Overview: "The origin story of the Predator in the world of the Comanche Nation 300 years ago.",
      ReleaseDate: "2022-08-05",
      Type: "movie",
      Rating: 7.2
    }
  ];

  // Filter content based on device - 4 for mobile, 10 for large devices
  const displayContent = isMobile 
    ? content.slice(0, 4) 
    : content.slice(0, 5);

  return (
    <section className="py-6 md:py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-3 md:px-4">
        {/* Header with gradient effect */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            What's New to Watch
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the latest movies and shows on your favorite platforms
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center h-40 md:h-64">
            <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center text-red-600 p-3 md:p-4 mb-4 bg-red-100 rounded-lg text-sm md:text-base">
            {error}
          </div>
        )}

        {/* Content grid - adaptive layout with different card sizes */}
        {!isLoading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
            {displayContent.map((item) => (
              <div key={item.id} className="group relative bg-white dark:bg-gray-800 rounded-lg md:rounded-xl overflow-hidden shadow-sm md:shadow-md hover:shadow-lg transition-all duration-300 h-full">
                {/* Card content wrapper - smaller on mobile */}
                <div className="flex flex-col h-full">
                  {/* Image container with overlay gradient */}
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={item.ImageUrl}
                      alt={item.Name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80"></div>
                    
                    {/* Platform badge - smaller on mobile */}
                    <div className="absolute top-2 md:top-3 left-2 md:left-3 z-10">
                      <span className={`inline-block px-1.5 md:px-2.5 py-0.5 md:py-1 text-xs font-bold rounded-full text-white ${getPlatformColor(item.Platform)}`}>
                        {item.Platform}
                      </span>
                    </div>
                    
                    {/* Rating - smaller on mobile */}
                    <div className="absolute top-2 md:top-3 right-2 md:right-3 z-10">
                      <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-black/60 text-yellow-400">
                        <span className="text-xs font-bold">{item.Rating.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    {/* Content type tag - smaller on mobile */}
                    <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 z-10">
                      <span className="inline-block px-1.5 md:px-2 py-0.5 text-xs font-medium bg-black/60 text-white rounded">
                        {item.Type === 'movie' ? 'Movie' : 'TV'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content info - more compact for mobile */}
                  <div className="p-2 md:p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-sm md:text-lg text-gray-900 dark:text-white mb-0.5 md:mb-1 line-clamp-1">
                      {item.Name}
                    </h3>
                    
                    {/* Hide overview on smallest screens, show 1 line on medium, 2 lines on large */}
                    <p className="hidden sm:block text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1 md:mb-3 sm:line-clamp-1 md:line-clamp-2">
                      {item.Overview}
                    </p>
                    
                    {/* Date only (no Watch Now button) */}
                    <div className="mt-1 md:mt-auto">
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        {formatDate(item.ReleaseDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* "See All" button */}
        <div className="text-center mt-6 md:mt-10">
          <a 
            href="/all-content" 
            className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-sm"
          >
            Browse All Content
            <svg className="ml-1 md:ml-2 w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

// Helper function to get color based on streaming platform
const getPlatformColor = (platform) => {
  const colors = {
    'Netflix': 'bg-red-600',
    'Prime Video': 'bg-blue-700',
    'Disney+': 'bg-blue-500',
    'Hulu': 'bg-green-600',
    'HBO Max': 'bg-purple-700',
    'Apple TV+': 'bg-gray-900',
    'Paramount+': 'bg-blue-800'
  };
  
  return colors[platform] || 'bg-gray-800';
};

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return 'Coming Soon';
  
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default WhatsNew;