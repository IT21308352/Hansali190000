import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PestControlPage = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    return (
        <div className="bg-gradient-to-b from-green-50 to-white min-h-screen py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                {/* Hero Section */}
                <div className="relative rounded-3xl overflow-hidden mb-16">
                    <div className="absolute inset-0">
                        <img
                            src="https://english.mathrubhumi.com/image/contentid/policy:1.8040600:1668230850/pesticide.jpg?$p=d669481&f=16x10&w=852&q=0.8"
                            alt="Pest Control in Sri Lanka"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </div>

                    <div className="relative py-32 px-8 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl font-bold text-white mb-6"
                        >
                            Pest Control
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed"
                        >
                            Protect your paddy fields from pests and ensure a healthy, bountiful harvest.
                        </motion.p>
                    </div>
                </div>

                {/* Introduction Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-xl p-8 mb-16"
                >
                    <h2 className="text-3xl font-semibold text-green-700 mb-6">
                        Why Pest Control Matters
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Pest control is crucial for maintaining the health and productivity of paddy fields. 
                        Effective pest management prevents crop damage, reduces yield losses, and minimizes 
                        the use of harmful chemicals. Integrated Pest Management (IPM) techniques, which 
                        combine biological, cultural, physical, and chemical tools, are widely used in 
                        Sri Lanka to manage pest populations sustainably.
                    </p>
                </motion.div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl shadow-lg overflow-hidden h-full"
                    >
                        <div className="h-64 overflow-hidden">
                            <img
                                src="https://doa.gov.lk/wp-content/uploads/2020/05/5-1-1024x768-1.jpg"
                                alt="Natural Pest Control Methods"
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                Natural Methods
                            </h3>
                            <p className="text-gray-700">
                                Use organic methods like introducing beneficial insects, neem oil, and 
                                crop rotation to control pests sustainably. These methods are eco-friendly 
                                and help maintain ecological balance.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-3xl shadow-lg overflow-hidden h-full"
                    >
                        <div className="h-64 overflow-hidden">
                            <img
                                src="https://www.mdpi.com/agronomy/agronomy-13-01851/article_deploy/html/images/agronomy-13-01851-g001-550.jpg"
                                alt="Advanced Pest Control Technologies"
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                Advanced Technologies
                            </h3>
                            <p className="text-gray-700">
                                Leverage modern tools like pheromone traps, drones, and precision monitoring 
                                systems to detect and control pests efficiently. These technologies reduce 
                                reliance on chemical pesticides.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Steps Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-green-700 to-green-600 rounded-3xl shadow-xl p-8 mb-16 text-white"
                >
                    <h2 className="text-3xl font-semibold mb-8 text-center">
                        Steps for Effective Pest Control
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                            <div className="w-12 h-12 bg-white text-green-700 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                                1
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Monitor
                            </h3>
                            <p>
                                Regularly inspect fields to identify pest populations and assess their impact.
                            </p>
                        </div>

                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                            <div className="w-12 h-12 bg-white text-green-700 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                                2
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Identify
                            </h3>
                            <p>
                                Accurately identify pests to determine the most effective control methods.
                            </p>
                        </div>

                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                            <div className="w-12 h-12 bg-white text-green-700 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                                3
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Prevent
                            </h3>
                            <p>
                                Use crop rotation, sanitation, and other cultural practices to prevent infestations.
                            </p>
                        </div>

                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                            <div className="w-12 h-12 bg-white text-green-700 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                                4
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Control
                            </h3>
                            <p>
                                Apply biological, physical, or chemical methods to manage pest populations.
                            </p>
                        </div>

                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                            <div className="w-12 h-12 bg-white text-green-700 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                                5
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Evaluate
                            </h3>
                            <p>
                                Assess the effectiveness of pest control measures and make adjustments as needed.
                            </p>
                        </div>

                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                            <div className="w-12 h-12 bg-white text-green-700 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                                6
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Document
                            </h3>
                            <p>
                                Keep records of pest control activities to improve future strategies.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-lg p-8 text-center"
                >
                    <h2 className="text-3xl font-semibold text-green-700 mb-6">
                        Ready to protect your crops?
                    </h2>
                    <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                        Use Rice Genie's AI-powered tools to get personalized pest control recommendations 
                        and ensure a healthy and productive harvest.
                    </p>
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                        onClick={() => navigate("/input-form")} // Redirect to input page
                    >
                        Get Pest Control Analysis
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PestControlPage;