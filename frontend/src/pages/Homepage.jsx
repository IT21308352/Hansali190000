import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

const ModernLandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation handlers
  const navigateTo = (path) => {
    navigate(path);
  };

  const features = [
    {
      title: "Paddy Yield",
      description: "Predict harvest outcomes and optimize cultivation strategies",
      icon: "📈",
      color: "from-emerald-500 to-green-600",
      link: "/rice-home"
    },
    {
      title: "Paddy Doctor",
      description: "Detect diseases with instant treatment recommendations",
      icon: "🩺",
      color: "from-teal-500 to-emerald-600",
      link: "/pddhome"
    },
    {
      title: "Variety Genie",
      description: "Find perfect rice varieties for your farming conditions",
      icon: "🔍",
      color: "from-cyan-500 to-teal-600",
      link: "/variety-home"
    },
    {
      title: "Weed Detector",
      description: "Identify weeds for better crop management",
      icon: "🌿",
      color: "from-blue-500 to-cyan-600",
      link: "/weed-detection"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Hero Section with Video Background */}
      <motion.div
        className="relative h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://videos.pexels.com/video-files/3145223/3145223-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-center items-center px-4 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1 mb-6">
              <span className="text-emerald-300 font-medium">New AI Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Revolutionize Your <span className="text-emerald-300">Rice Farming</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto mb-10">
              Your AI-powered rice farming companion - powered by deep learning and agricultural expertise
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateTo('/input-form')}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center group"
              >
                Get Started Free
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://youtu.be/Pr-5FjrImMs', '_blank')}
                className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 flex items-center border border-white/20"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <div className="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-emerald-500 shadow-lg rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-emerald-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Feature Cards Section */}
      <div className="py-16 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Everything You Need for Smarter Rice Farming
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered tools help Sri Lankan farmers maximize yields and minimize losses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300`}
              >
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <div className="p-6">
                  <div className={`text-4xl mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <button
                    onClick={() => navigateTo(feature.link)}
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How Rice Genie Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to transform your rice farming with AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Your Data</h3>
              <p className="text-gray-600">Share details about your farm, crops, and conditions</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Analysis</h3>
              <p className="text-gray-600">Our algorithms process your data with precision</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Insights</h3>
              <p className="text-gray-600">Receive actionable recommendations for your farm</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-16 bg-[url('/images/rice-field-bg.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-emerald-900/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Sri Lankan Farmers
            </h2>
            <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
              Hear what our users say about Rice Genie
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 max-w-3xl mx-auto"
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-2xl font-bold mr-4">RK</div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800">Ranjith Kumara</h4>
                <p className="text-emerald-600">Paddy Farmer, Anuradhapura</p>
              </div>
            </div>
            <p className="text-gray-700 italic text-lg">
              "Rice Genie helped me identify a disease in my crop early and provided treatment options. I saved nearly 40% of my harvest that season. This technology is a game-changer for Sri Lankan farmers!"
            </p>
          </motion.div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to Transform Your Rice Farming?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Join thousands of farmers using AI to get better yields and healthier crops
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo('/input-form')}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 text-lg"
            >
              Start Your Free Trial Today
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModernLandingPage;