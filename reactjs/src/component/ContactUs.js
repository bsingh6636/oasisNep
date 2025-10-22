import React, { useState, useEffect } from "react";

export const ContactUs = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.contact-card');
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      
      cards.forEach(card => {
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Toggle dark/light mode


  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-500">

      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        {/* Light background (hidden in dark mode) */}
        <div className="absolute inset-0 dark:opacity-0 transition-opacity duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#e0f2fe,transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#dbeafe,transparent_60%)]"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-pattern-light opacity-10"></div>
        </div>
        
        {/* Dark background (visible only in dark mode) */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#1e0e3d,transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#10254d,transparent_60%)]"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-5"></div>
        </div>
      </div>
      
      {/* Content container */}
      <div className={`relative z-10 flex flex-col justify-center items-center min-h-screen p-4 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md">
          {/* Glowing header */}
          <div className="text-center mb-10 relative">
            <h1 className="text-4xl font-bold leading-tight tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
              Get in Touch
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We&apos;d love to hear from you!
            </p>
            
            {/* Animated underline */}
            <div className="w-24 h-1 mx-auto relative overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 animate-gradient-x"></div>
            </div>
          </div>
          
          {/* Contact cards */}
          <div className="space-y-5">
            <ContactCard 
              icon={<WhatsAppIcon />}
              label="WhatsApp"
              value="+977 9800806223"
              link="https://wa.me/+9779800806223"
              lightColors="from-green-500 to-emerald-400"
              darkColors="from-green-600 to-emerald-500"
              activeCard={activeCard}
              setActiveCard={setActiveCard}
              id="whatsapp"
            />
            
            <ContactCard 
              icon={<EmailIcon />}
              label="Email"
              value="subscription.for.nepal@gmail.com"
              link="mailto:subscription.for.nepal@gmail.com"
              lightColors="from-blue-500 to-cyan-400"
              darkColors="from-blue-600 to-cyan-500"
              activeCard={activeCard}
              setActiveCard={setActiveCard}
              id="email"
            />
            
            <ContactCard 
              icon={<TelegramIcon />}
              label="Telegram"
              value="bsingh4474"
              link="https://t.me/bsingh4474"
              lightColors="from-indigo-500 to-blue-400"
              darkColors="from-indigo-600 to-blue-500"
              activeCard={activeCard}
              setActiveCard={setActiveCard}
              id="telegram"
            />
          </div>
          
          {/* Social media section */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-center mb-6 text-gray-700 dark:text-gray-300">
              Follow Us
            </h3>
            <div className="flex justify-center space-x-6">
              <SocialLink 
                href="https://www.facebook.com/onlinepurchasenepal6636"
                icon={<FacebookIcon />}
                label="Facebook"
                lightColor="from-blue-500 to-blue-600"
                darkColor="from-blue-600 to-blue-700"
              />
              
              <SocialLink 
                href="https://whatsapp.com/channel/0029VaFZsmD2Jl89TAqCbl1j"
                icon={<WhatsAppChannelIcon />}
                label="WhatsApp Channel"
                lightColor="from-green-500 to-green-600"
                darkColor="from-green-600 to-green-700"
              />
              
              <SocialLink 
                href="https://t.me/purchase6636"
                icon={<TelegramChannelIcon />}
                label="Telegram Channel"
                lightColor="from-blue-400 to-blue-500"
                darkColor="from-blue-500 to-blue-600"
              />
            </div>
          </div>
          
          {/* Contact decoration */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full p-3 animate-pulse-slow bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm shadow-md dark:shadow-none">
              <svg xmlns="http://www.w3.org/2000/svg" 
                className="w-6 h-6 text-indigo-600 dark:text-indigo-400" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-500 text-sm mt-2">
              24/7 Support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced contact card component
const ContactCard = ({ icon, label, value, link, lightColors, darkColors, activeCard, setActiveCard, id }) => {
  const isActive = activeCard === id;
  
  return (
    <a 
      href={link}
      target="_blank" 
      rel="noreferrer"
      className="block"
      onMouseEnter={() => setActiveCard(id)}
      onMouseLeave={() => setActiveCard(null)}
      onTouchStart={() => setActiveCard(id)}
      onTouchEnd={() => setTimeout(() => setActiveCard(null), 1000)}
    >
      <div 
        className={`contact-card relative rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-500 ease-out
          ${isActive ? 'bg-white/70 dark:bg-gray-800/50 shadow-glow-light dark:shadow-glow-dark' : 'bg-white/50 dark:bg-gray-800/30 shadow-md dark:shadow-lg'}`}
        style={{ transformStyle: 'preserve-3d', perspective: '1000px', transform: 'rotateX(0) rotateY(0)' }}
      >
        {/* Gradient border */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r ${lightColors} dark:${darkColors} opacity-0 transition-opacity duration-500 ${
            isActive ? 'opacity-30' : ''
          }`}
        ></div>
        
        {/* Card content with 3D effect */}
        <div className="relative z-10 p-4 flex items-center" style={{ transform: 'translateZ(20px)' }}>
          {/* Icon container */}
          <div 
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-500 ${
              isActive 
                ? `bg-gradient-to-r ${lightColors} dark:${darkColors} shadow-glow-light dark:shadow-glow-dark` 
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <div className="text-white">{icon}</div>
          </div>
          
          {/* Text content */}
          <div>
            <div className="text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">{label}</div>
            <div className={`font-semibold transition-colors duration-500 ${
              isActive ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
            }`}>
              {value}
            </div>
          </div>
          
          {/* Arrow icon */}
          <div 
            className={`ml-auto transform transition-all duration-500 ${
              isActive ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
};

// Social media link component
const SocialLink = ({ href, icon, label, lightColor, darkColor }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="group relative"
      aria-label={label}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r animate-spin-slow opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
      <div className={`relative z-10 w-11 h-11 bg-gradient-to-b ${lightColor} dark:${darkColor} rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-light dark:group-hover:shadow-glow-dark`}>
        <div className="text-white">{icon}</div>
      </div>
    </a>
  );
};



const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
  </svg>
);

const WhatsAppChannelIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  </svg>
);

const TelegramChannelIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
  </svg>
);

// Add required CSS
const style = document.createElement('style');
style.textContent = `
  /* Set up tailwind dark mode */
  :root {
    color-scheme: light dark;
  }

  /* Grid patterns */
  .bg-grid-pattern-light {
    background-image: 
      linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  
  .bg-grid-pattern-dark {
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  
  /* Glowing shadows */
  .shadow-glow-light {
    box-shadow: 0 0 15px rgba(79, 70, 229, 0.2), 0 0 5px rgba(79, 70, 229, 0.1);
  }
  
  .shadow-glow-dark {
    box-shadow: 0 0 15px rgba(138, 75, 255, 0.2), 0 0 5px rgba(138, 75, 255, 0.1);
  }
  
  /* Animations */
  @keyframes gradient-x {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes pulse-slow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .animate-gradient-x {
    animation: gradient-x 3s ease infinite;
    background-size: 200% 100%;
  }
  
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
  }
  
  /* Disable transforms on mobile for better performance */
  @media (max-width: 768px) {
    .contact-card {
      transform: none !important;
    }
  }
`;
document.head.appendChild(style);

export default ContactUs;