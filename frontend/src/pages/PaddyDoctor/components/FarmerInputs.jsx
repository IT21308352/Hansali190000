import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Leaf, Droplets, Cloud, Earth } from 'lucide-react';

const FarmerInputs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { disease, confidence, imageFile, prediction_probabilities, recommendations, treatment } = location.state || {};
  
  // Default input options for each disease
  const diseaseInputMapping = {
    bacterial_leaf_blight: {
      title: "Bacterial Leaf Blight",
      inputs: [
        {
          name: "humidity",
          label: "Humidity Level",
          options: ["High", "Low"],
          icon: <Cloud className="h-5 w-5" />
        },
        {
          name: "irrigation",
          label: "Irrigation Type",
          options: ["Overhead", "Drip"],
          icon: <Droplets className="h-5 w-5" />
        },
        {
          name: "drainage",
          label: "Field Drainage",
          options: ["Poor", "Good"],
          icon: <Earth className="h-5 w-5" />
        },
        {
          name: "nitrogen",
          label: "Nitrogen Fertilizer Use",
          options: ["High", "Low"],
          icon: <Leaf className="h-5 w-5" />
        }
      ]
    },
    brown_spot: {
      title: "Brown Spot",
      inputs: [
        {
          name: "weather",
          label: "Weather Condition",
          options: ["Dry", "Rainy"],
          icon: <Cloud className="h-5 w-5" />
        },
        {
          name: "nutrients",
          label: "Soil Nutrients (Potassium & Silica)",
          options: ["Low", "High"],
          icon: <Leaf className="h-5 w-5" />
        },
        {
          name: "drainage",
          label: "Field Drainage",
          options: ["Poor", "Good"],
          icon: <Earth className="h-5 w-5" />
        }
      ]
    },
    leaf_blast: {
      title: "Leaf Blast",
      inputs: [
        {
          name: "temperature",
          label: "Temperature",
          options: ["High", "Low"],
          icon: <Cloud className="h-5 w-5" />
        },
        {
          name: "humidity",
          label: "Humidity",
          options: ["High", "Low"],
          icon: <Droplets className="h-5 w-5" />
        },
        {
          name: "spacing",
          label: "Field Spacing",
          options: ["Dense", "Well-spaced"],
          icon: <Leaf className="h-5 w-5" />
        },
        {
          name: "nitrogen",
          label: "Nitrogen Use",
          options: ["High", "Moderate"],
          icon: <Earth className="h-5 w-5" />
        }
      ]
    },
    sheath_blight: {
      title: "Sheath Blight",
      inputs: [
        {
          name: "density",
          label: "Planting Density",
          options: ["High", "Moderate"],
          icon: <Leaf className="h-5 w-5" />
        },
        {
          name: "moisture",
          label: "Soil Moisture",
          options: ["Wet", "Dry"],
          icon: <Earth className="h-5 w-5" />
        },
        {
          name: "weather",
          label: "Weather Condition",
          options: ["Rainy", "Dry"],
          icon: <Cloud className="h-5 w-5" />
        }
      ]
    },
    healthy: {
      title: "Healthy Crop",
      inputs: [
        {
          name: "management",
          label: "Field Management",
          options: ["Proper", "Poor"],
          icon: <Leaf className="h-5 w-5" />
        },
        {
          name: "soil",
          label: "Soil Health",
          options: ["Good", "Deficient"],
          icon: <Earth className="h-5 w-5" />
        }
      ]
    }
  };

  // Determine which disease and inputs to show
  const getDiseaseName = () => {
    if (!disease) return "healthy";
    return disease.toLowerCase().replace(/ /g, '_');
  };

  const diseaseName = getDiseaseName();
  const currentDisease = diseaseInputMapping[diseaseName] || diseaseInputMapping.healthy;
  
  // State for farmer inputs
  const [farmerInputs, setFarmerInputs] = useState({});

  // Initialize farmer inputs based on available options
  useEffect(() => {
    const initialInputs = {};
    currentDisease.inputs.forEach(input => {
      initialInputs[input.name] = input.options[0]; // Default to first option
    });
    setFarmerInputs(initialInputs);
  }, [disease]);

  // Handle input change
  const handleInputChange = (name, value) => {
    setFarmerInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle back button
  const handleBack = () => {
    navigate(-1);
  };

  // Proceed to treatment page
  const handleContinue = () => {
    // Pass all data including farmer inputs to the treatment page
    navigate('/treatment', { 
      state: {
        disease,
        confidence,
        imageFile,
        prediction_probabilities,
        recommendations,
        treatment,
        farmerInputs: farmerInputs
      }
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-900 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-green-500 rounded-full opacity-10"
            style={{
              width: Math.random() * 40 + 10,
              height: Math.random() * 40 + 10,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 150 - 75],
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: Math.random() * 12 + 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-no-repeat opacity-40 z-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('src/pages/PaddyDoctor/assets/background images/tbak.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            filter: "blur(2px)",
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 max-w-4xl mx-auto px-6 py-12"
      >
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleBack}
          className="absolute left-6 top-6 text-white flex items-center opacity-70 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </motion.button>

        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-extrabold mb-2 text-white text-center tracking-wide drop-shadow-lg"
        >
          Field Conditions
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-green-400 text-center mb-8 font-medium"
        >
          Customize your treatment plan for {currentDisease.title}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-black/80 backdrop-blur-md border border-green-900/50 shadow-xl rounded-xl p-6 mb-6"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-lg bg-green-900/30 border border-green-700/50 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white">Field Information</h3>
                <p className="text-green-400 text-sm">Select your current conditions</p>
              </div>
            </div>
            
            {imageFile && (
              <div className="hidden md:block">
                <img 
                  src={URL.createObjectURL(imageFile)} 
                  alt="Analyzed crop"
                  className="w-20 h-20 object-cover rounded-md shadow-md" 
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentDisease.inputs.map((input, index) => (
              <motion.div
                key={input.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
                className="bg-gray-900/70 rounded-lg p-4"
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center mr-2">
                    {input.icon}
                  </div>
                  <h4 className="text-white font-medium">{input.label}</h4>
                </div>

                <div className="flex gap-3">
                  {input.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleInputChange(input.name, option)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center ${
                        farmerInputs[input.name] === option 
                          ? 'bg-green-600 text-white font-medium border-2 border-green-500' 
                          : 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      {farmerInputs[input.name] === option && (
                        <Check className="h-4 w-4 mr-1" />
                      )}
                      {option}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleContinue}
            className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-3 rounded-md font-medium shadow-lg flex items-center hover:shadow-green-500/20"
          >
            Continue to Treatment
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.button>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-400 text-xs mt-8"
        >
          Your input helps us provide the most accurate treatment recommendations
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FarmerInputs;