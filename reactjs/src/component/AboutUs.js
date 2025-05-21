import React, { useEffect, useState } from 'react';

export const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({
    header: false,
    content: false,
    features: false,
    stats: false,
    cta: false
  });

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Get the section id from the target and update state
          const section = entry.target.dataset.section;
          if (section) {
            setIsVisible(prev => ({ ...prev, [section]: true }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('[data-section]').forEach(element => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('[data-section]').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section className="min-h-screen py-6 sm:py-12 px-4 sm:px-6 bg-gray-900 text-gray-200 overflow-hidden">
      <div className="max-w-3xl mx-auto relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
          <div className="absolute top-1/2 -left-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-delay"></div>
        </div>

        {/* Header with animation */}
        <div 
          data-section="header"
          className={`text-center mb-8 transition-all duration-700 ${
            isVisible.header 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform -translate-y-8'
          }`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 mb-2">
            Welcome to Our Platform
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Main content container with reveal animation */}
        <div 
          data-section="content"
          className={`bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 relative transition-all duration-700 ease-out ${
            isVisible.content 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-12'
          }`}
        >
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-xl p-0.5 bg-gradient-to-tr from-indigo-500/30 via-purple-500/30 to-blue-500/30 animate-pulse-slow opacity-0 group-hover:opacity-100"></div>
          
          {/* Content sections */}
          <div className="p-5 sm:p-8 relative z-10">
            {/* Paragraphs with fade-in animation */}
            <p className="text-gray-300 text-base sm:text-lg mb-4 animate-fadeIn animation-delay-100">
              At our platform, we proudly offer subscription services for various platforms at <span className="text-blue-400 font-medium">unbeatable rates</span>. Elevate your digital experience with us as we provide not only cost-effective subscriptions but also a range of enticing digital products and convenient gift cards.
            </p>
            
            <p className="text-gray-300 text-base sm:text-lg mb-4 animate-fadeIn animation-delay-200">
              With over <span className="text-purple-400 font-medium">five years of dedicated service</span>, we have established ourselves as a reliable and trustworthy destination for all your digital needs. Our commitment to customer satisfaction is unwavering, ensuring you a hassle-free experience with every purchase.
            </p>
            
            <p className="text-gray-300 text-base sm:text-lg mb-6 animate-fadeIn animation-delay-300">
              Despite our small but dedicated team, we prioritize your needs. While we aim to respond promptly, there might be occasional delays due to our limited staff. Your patience is appreciated, and rest assured, your inquiry will be attended to with the utmost care.
            </p>

            {/* Features section with staggered animations */}
            <div 
              data-section="features"
              className={`mt-8 transition-all duration-700 ease-out ${
                isVisible.features 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 animate-glow">Why Choose Us</h2>
              
              <div className="space-y-4">
                {/* Feature items with staggered animations */}
                <FeatureItem 
                  icon="💰"
                  title="Unbeatable Rates"
                  description="We provide subscription services at prices you won't find elsewhere."
                  delay={0}
                  isVisible={isVisible.features}
                />
                
                <FeatureItem 
                  icon="🔒"
                  title="Trustworthy"
                  description="With over five years of dedicated service, we've established ourselves as reliable."
                  delay={100}
                  isVisible={isVisible.features}
                />
                
                <FeatureItem 
                  icon="🌟"
                  title="Customer Satisfaction"
                  description="Our commitment to your satisfaction ensures a hassle-free experience."
                  delay={200}
                  isVisible={isVisible.features}
                />
                
                <FeatureItem 
                  icon="👥"
                  title="Community Trust"
                  description="With over 7,000 satisfied customers and a 4.8-star rating on Facebook."
                  delay={300}
                  isVisible={isVisible.features}
                />
                
                <FeatureItem 
                  icon="🌏"
                  title="Global Reach"
                  description="We offer OTT services not only in Nepal but also in other countries."
                  delay={400}
                  isVisible={isVisible.features}
                />
              </div>
            </div>

            {/* Stats section with counter animations */}
            <div 
              data-section="stats"
              className={`mt-8 transition-all duration-700 ease-out ${
                isVisible.stats 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 animate-glow">Our Impact</h2>
              <div className="grid grid-cols-2 gap-3">
                <StatCard value={7000} label="Happy Customers" isVisible={isVisible.stats} />
                <StatCard value={5} label="Years Experience" isVisible={isVisible.stats} delay={200} />
                <StatCard value={4.8} label="Rating" isVisible={isVisible.stats} delay={400} />
                <StatCard value={24} label="Support Hours" isVisible={isVisible.stats} delay={600} />
              </div>
            </div>
            
            {/* Call to action with pulse animation */}
            <div 
              data-section="cta"
              className={`mt-8 text-center transition-all duration-700 ease-out ${
                isVisible.cta 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}
            >
              <a href="/contact" className="inline-block w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg text-sm sm:text-base animate-pulse-subtle relative overflow-hidden group">
                <span className="relative z-10">Get Started Today</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Note section with fade animation */}
        <div className="mt-6 text-center text-gray-400 text-sm animate-fadeIn animation-delay-1000">
          <p>Join the community that has trusted us for over five years!</p>
        </div>
      </div>
    </section>
  );
};

// Mobile-friendly feature item with animation
const FeatureItem = ({ icon, title, description, delay = 0, isVisible }) => {
  return (
    <div 
      className={`bg-gray-700/40 border border-gray-700 rounded-lg p-4 hover:bg-gray-700/60 transition-all duration-500 transform hover:scale-102 hover:shadow-lg hover:shadow-indigo-900/20 ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 -translate-x-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start">
        <div className="text-2xl mr-3 mt-0.5 animate-bounce-subtle" style={{ animationDelay: `${delay}ms` }}>{icon}</div>
        <div>
          <h3 className="text-lg font-medium text-indigo-400 mb-1">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Mobile-friendly stat card with counter animation
const StatCard = ({ value, label, isVisible, delay = 0 }) => {
  const [count, setCount] = useState(0);
  
  // Animate counter when visible
  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const end = value;
    const duration = 2000;
    const incrementTime = 20;
    const totalSteps = Math.min(duration / incrementTime, end);
    const incrementAmount = end / totalSteps;
    
    // Add delay before starting animation
    const timer1 = setTimeout(() => {
      // Start the counter
      const timer2 = setInterval(() => {
        start += incrementAmount;
        setCount(Math.min(start, end));
        
        if (start >= end) {
          clearInterval(timer2);
          setCount(end);
        }
      }, incrementTime);
      
      return () => clearInterval(timer2);
    }, delay);
    
    return () => clearTimeout(timer1);
  }, [isVisible, value, delay]);
  
  // Format the count based on type
  const formattedCount = typeof value === 'number' && value % 1 === 0 
    ? Math.round(count).toLocaleString() 
    : count.toFixed(1);
  
  return (
    <div 
      className={`bg-gray-700/40 rounded-lg p-3 text-center transition-all duration-700 transform hover:shadow-lg hover:shadow-indigo-900/10 ${
        isVisible 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
        {formattedCount}
      </div>
      <div className="text-gray-400 text-xs sm:text-sm">{label}</div>
    </div>
  );
};

// Add required CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes float {
    0% { transform: translateY(0px) translateX(0px); }
    50% { transform: translateY(-15px) translateX(10px); }
    100% { transform: translateY(0px) translateX(0px); }
  }
  
  @keyframes pulse-subtle {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.03); }
  }
  
  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  
  @keyframes glow {
    0%, 100% { text-shadow: 0 0 5px rgba(129, 140, 248, 0.3); }
    50% { text-shadow: 0 0 20px rgba(129, 140, 248, 0.6); }
  }
  
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.4; }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.8s forwards;
  }
  
  .animation-delay-100 {
    animation-delay: 100ms;
  }
  
  .animation-delay-200 {
    animation-delay: 200ms;
  }
  
  .animation-delay-300 {
    animation-delay: 300ms;
  }
  
  .animation-delay-1000 {
    animation-delay: 1000ms;
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-delay {
    animation: float 8s ease-in-out 1s infinite;
  }
  
  .animate-pulse-subtle {
    animation: pulse-subtle 2s ease-in-out infinite;
  }
  
  .animate-bounce-subtle {
    animation: bounce-subtle 2s ease-in-out infinite;
  }
  
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
  }
  
  .transform.hover\\:scale-102:hover {
    transform: scale(1.02);
  }
`;
document.head.appendChild(style);

export default AboutUs;