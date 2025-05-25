import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HarvestPlanningPage = () => {
    const navigate = useNavigate(); // Hook for navigation

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
                            src="https://araliyarice.com/wp-content/uploads/2017/12/harvesting.jpg"
                            alt="Paddy Harvesting in Sri Lanka"
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
                            Harvest Planning
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed"
                        >
                            Efficient planning ensures a successful paddy harvest, optimizing yield and quality.
                        </motion.p>
                    </div>
                </div>

                {/* Introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-xl p-8 mb-16"
                >
                    <h2 className="text-3xl font-semibold text-green-700 mb-6">
                        Importance of Harvest Planning
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Paddy harvesting in Sri Lanka is a crucial step in ensuring food security and profitability for farmers. Proper timing, resource allocation, and modern techniques help maximize yield while minimizing losses due to improper harvesting, pests, and unpredictable weather conditions.
                    </p>
                </motion.div>

                {/* Modern Techniques */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl shadow-lg overflow-hidden h-full"
                    >
                        <div className="h-64 overflow-hidden">
                            <img
                                src="https://island.lk/wp-content/uploads/2023/08/harvesting.jpg"
                                alt="Modern Paddy Harvesting"
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                Mechanized Harvesting
                            </h3>
                            <p className="text-gray-700">
                                Sri Lanka is increasingly adopting combine harvesters and threshers to speed up the harvesting process, reduce labor costs, and prevent grain losses due to manual errors.
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
                                src="https://www.agrimin.gov.lk/web/images/pictures/News/2022.02.24-4/image_agc_01.jpeg"
                                alt="Traditional and Modern Techniques"
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                Traditional & Modern Methods
                            </h3>
                            <p className="text-gray-700">
                                While sickles and manual labor are still used in some regions, blending traditional and modern approaches ensures efficiency and quality in rice production.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-lg p-8 text-center"
                >
                    <h2 className="text-3xl font-semibold text-green-700 mb-6">
                        Plan Your Harvest with Smart Tools
                    </h2>
                    <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                        Use Rice Genie's AI-powered analysis to forecast yields and optimize resource allocation for a better harvest.
                    </p>
                    <button
                        onClick={() => navigate("/input-form")}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                        Get Harvest Insights
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HarvestPlanningPage;
