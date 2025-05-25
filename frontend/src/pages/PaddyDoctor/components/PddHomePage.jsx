import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, ChevronRight, ArrowRight, Leaf, Shield, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';
import CardGrid from './CardGrid';

const PddHomePage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const heroContent = [
    {
      icon: <Leaf className="h-6 w-6 text-green-400" />,
      title: "Disease Identification",
      description: "Advanced AI algorithms to detect common paddy diseases with high accuracy."
    },
    {
      icon: <Shield className="h-6 w-6 text-green-400" />,
      title: "Treatment Solutions",
      description: "Get tailored advice on the best treatments and farming practices."
    },
    {
      icon: <LineChart className="h-6 w-6 text-green-400" />,
      title: "Yield Improvement",
      description: "Learn preventative measures to ensure a bountiful harvest."
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-green-500 rounded-full opacity-20"
              style={{
                width: Math.random() * 20 + 5,
                height: Math.random() * 20 + 5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 80 - 40],
                x: [0, Math.random() * 80 - 40],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Background Image with Overlay and Parallax */}
        <div 
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: `url('src/pages/PaddyDoctor/assets/background images/hbak.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-green-900/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col max-w-7xl mx-auto pt-24 md:pt-32 min-h-screen text-white px-6 md:px-10 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-[1px] w-10 bg-green-500"></div>
            <span className="text-green-400 font-medium tracking-widest uppercase text-sm">Welcome to RiceGenie's</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl mb-0 uppercase flex flex-wrap items-center gap-4"
          >
            Paddy Disease <Sprout className="h-12 w-12 md:h-16 md:w-16 lg:h-24 lg:w-24 text-green-400" />
          </motion.h1>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-3xl mb-6 md:mb-10 uppercase"
          >
            Detection System
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-20 h-1 bg-green-500 mb-8"
          />
          
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {heroContent.map((content, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-5 hover:border-green-500/50 transition-colors duration-300"
              >
                <div className="bg-black/50 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-3">
                  {content.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{content.title}</h3>
                <p className="text-gray-400 text-sm">{content.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-2xl mb-10 md:mb-14 text-gray-300"
          >
            <p className="text-xl font-medium text-white mb-4">Effortlessly protect your paddy fields with the latest technology!</p>
            
            <p className="mb-4">
              Our platform is designed to help farmers like you identify and manage paddy diseases quickly and effectively. 
              Simply upload a photo of your paddy crop, and our system will provide you with accurate disease detection and treatment recommendations.
            </p>
            
            <div className="space-y-4 mt-6">
              <div className="flex gap-3">
                <div className="flex-shrink-0 flex items-start pt-1">
                  <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">1</div>
                </div>
                <div>
                  <p className="font-semibold text-white">Identify the Disease</p>
                  <p className="text-gray-400">Detect common paddy diseases like bacterial leaf blight, brown spot, leaf blast, and more.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 flex items-start pt-1">
                  <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">2</div>
                </div>
                <div>
                  <p className="font-semibold text-white">Provide Treatment Suggestions</p>
                  <p className="text-gray-400">Get tailored advice on the best treatments and farming practices.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 flex items-start pt-1">
                  <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">3</div>
                </div>
                <div>
                  <p className="font-semibold text-white">Help Maintain Healthy Crops</p>
                  <p className="text-gray-400">Learn preventative measures to ensure a bountiful harvest.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-4 md:gap-8 pb-12"
          >
            <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/detect')}
                className="bg-gradient-to-r from-green-600 to-green-500 text-white tracking-wider px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/20 transition-all w-fit flex items-center gap-2"
            >
                Detect Disease
                <ArrowRight className="h-5 w-5" />
            </motion.button>
            
            <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/disease')}
                className="bg-black/50 text-white border border-green-500/30 tracking-wider px-8 py-3 rounded-lg font-medium hover:bg-green-900/20 transition-all w-fit flex items-center gap-2"
            >
                Pre-Harvesting Diseases
                <ChevronRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center text-gray-400 text-sm"
            >
              <span>Scroll Down</span>
              <ChevronRight className="h-5 w-5 transform rotate-90 mt-1" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Card Grid Section with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <CardGrid />
      </motion.div>
    </div>
  );
};

export default PddHomePage;