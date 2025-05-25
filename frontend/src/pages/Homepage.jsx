import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

const ModernLandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Get navbar height
    const updateNavbarHeight = () => {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    // Set cards to show after a short delay for entrance animation
    const timer = setTimeout(() => {
      setShowCards(true);
    }, 500);

    updateNavbarHeight();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateNavbarHeight);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateNavbarHeight);
      clearTimeout(timer);
    };
  }, []);

  // App data
  const appName = "🌾 Rice Genie";

const appDescription = `
🤖 Rice Genie is an intelligent digital platform designed to revolutionize paddy farming 
by integrating cutting-edge technologies such as deep learning, machine learning, 
and data-driven decision-making.

🇱🇰 Tailored specifically for Sri Lankan paddy farmers, Rice Genie empowers users with:

🦠  Real-time paddy disease detection  
💊  Precise treatment recommendations  
🔍  Variety selection guidance  
📈  Yield prediction insights

💡 By combining agricultural expertise with AI, Rice Genie enhances productivity, 
minimizes crop losses, and supports sustainable rice cultivation through an 
easy-to-use web application.
`;

  const features = [
   {
    title: "Paddy Yield",
    description: "Predict harvest outcomes and optimize your cultivation strategies.",
    icon: "🌾", // Rice crop/yield
    color: "bg-green-600",
    link: "/rice-home"
  },
  {
    title: "Paddy Doctor",
    description: "Detect diseases and get instant treatment recommendations.",
    icon: "🧪", // Lab/medical diagnosis
    color: "bg-green-500",
    link: "/pddhome"
  },
 {
  title: "Variety Genie",
  description: "Find the perfect rice variety for your specific farming conditions.",
  icon: "🍚", // Suggestion/recommendation checklist
  color: "bg-green-400",
    link: "/variety-home"
},
  {
    title: "Weed Detector",
    description: "Differentiate between rice and wheat for better crop management.",
    icon: "🌿", // Leaf/weed
    color: "bg-emerald-500",
    link: "/weed-detection"
  }
  ];

  return (
    <div  className="min-h-screen flex flex-col text-white"
            style={{
                backgroundImage: `url('/images/home.jpeg')`, 
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
               }} >
      
     {/* Main Content */}
      <main className="relative" style={{ paddingTop: `${navbarHeight}px` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="py-12 md:py-24 text-center opacity-100 animate-[fadeIn_1s_ease-in_forwards]">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-10 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Do the Magic with {appName}
            </h1>
            <p className="max-w-4xl mx-auto text-lg text-gray-300 mb-10">
              {appDescription}
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-green-500/20 group">
              Get Started
              <ChevronRight className="inline ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </button>
          </div>
          
          {/* Feature Cards */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-green-700 transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer overflow-hidden group relative ${showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Feature Icon */}
                <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                {/* Feature Title */}
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                {/* Feature Description */}
                <p className="text-gray-400 mb-4">
                  {feature.description}
                </p>
                
                {/* Learn More Link */}
                <div className="flex items-center text-green-400 group-hover:text-green-300 transition-colors duration-300">
                  <a href={feature.link}>Learn more</a>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                
                {/* Decorative Gradient */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-emerald-600 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300" />
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="py-8 text-center mb-20 opacity-100 animate-[fadeIn_1.5s_ease-in_0.5s_forwards]">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to elevate your farming practices?</h2>
            <p className="max-w-2xl mx-auto text-gray-300 mb-8">
              Join thousands of satisfied farmers who have transformed their paddy cultivation with {appName}.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-green-500/20">
                Start Free Trial
              </button>
              <button className="px-8 py-3 bg-gray-800 rounded-full font-semibold hover:bg-gray-700 transition-colors duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModernLandingPage;