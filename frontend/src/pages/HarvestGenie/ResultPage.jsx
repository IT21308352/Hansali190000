import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ResultPrediction = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { predictionResult } = location.state || {};

    const [previousYield, setPreviousYield] = useState("");
    const [comparisonResult, setComparisonResult] = useState("");

    const handlePreviousYieldChange = (e) => {
        setPreviousYield(e.target.value);
    };

    const handleCompare = () => {
        const previousYieldPerHectare = parseFloat(previousYield);
        if (isNaN(previousYieldPerHectare) || previousYieldPerHectare <= 0) {
            setComparisonResult("Please enter a valid previous yield per hectare.");
            return;
        }

        const predictedYieldPerHectare = predictionResult.predicted_yield_per_hectare;
        if (predictedYieldPerHectare > previousYieldPerHectare) {
            setComparisonResult("Predicted yield is higher than previous yield");
        } else if (predictedYieldPerHectare < previousYieldPerHectare) {
            setComparisonResult("Predicted yield is lower than previous yield");
        } else {
            setComparisonResult("Predicted yield is the same as the previous yield");
        }
    };

    const handleRecommendations = () => {
        navigate("/recommendations");
    };

    return (
        <div className="min-h-screen py-16"
        style={{
          backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/046/760/563/non_2x/freshly-harvested-rice-grains-in-wooden-bowl-outdoors-in-daylight-photo.jpeg')`, // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
      }}>
          
            <div className="relative max-w-7xl mx-auto px-4">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-300 rounded-full filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h1 className="text-5xl font-extrabold text-black/90 mb-4">
                                Paddy Harvest Prediction Results
                            </h1>
                            <div className="h-1 w-32 bg-yellow-400 mx-auto rounded-full"></div>
                        </motion.div>
                    </div>

                    {predictionResult ? (
                        <div className="max-w-4xl mx-auto">
                            {/* Main content card */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="bg-black/85 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/20"
                            >
                                {/* Results section */}
                                <div className="p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Total yield card */}
                                        <motion.div
                                            whileHover={{
                                                scale: 1.02,
                                                backgroundColor: "rgba(255, 255, 255, 0.15)",
                                            }}
                                            transition={{ duration: 0.2 }}
                                            className="bg-white/5 border border-white/20 rounded-2xl p-6 backdrop-blur-sm"
                                        >
                                            <div className="flex items-center mb-4">
                                                <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center mr-4">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 text-yellow-400"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-yellow-400 text-lg font-medium">
                                                        Total Predicted Yield
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="flex items-end">
                                                <span className="text-4xl font-bold text-white">
                                                    {predictionResult.total_predicted_yield.toFixed(2)}
                                                </span>
                                                <span className="text-white/70 ml-2 mb-1">
                                                    kilograms
                                                </span>
                                            </div>
                                        </motion.div>

                                        {/* Yield per hectare card */}
                                        <motion.div
                                            whileHover={{
                                                scale: 1.02,
                                                backgroundColor: "rgba(255, 255, 255, 0.15)",
                                            }}
                                            transition={{ duration: 0.2 }}
                                            className="bg-white/5 border border-white/20 rounded-2xl p-6 backdrop-blur-sm"
                                        >
                                            <div className="flex items-center mb-4">
                                                <div className="w-12 h-12 rounded-full bg-green-400/20 flex items-center justify-center mr-4">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 text-green-400"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-green-400 text-lg font-medium">
                                                        Yield per Hectare
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="flex items-end">
                                                <span className="text-4xl font-bold text-white">
                                                    {predictionResult.predicted_yield_per_hectare.toFixed(2)}
                                                </span>
                                                <span className="text-white/70 ml-2 mb-1">
                                                    kg/hectare
                                                </span>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Comparison section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.5 }}
                                        className="mt-8 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20"
                                    >
                                        <h3 className="text-xl font-semibold text-white mb-6">
                                            Compare with Previous Harvest
                                        </h3>

                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="flex-1">
                                                <label className="block text-white/80 mb-2 text-sm font-medium">
                                                    Previous Yield per Hectare
                                                </label>
                                                <input
                                                    type="number"
                                                    value={previousYield}
                                                    onChange={handlePreviousYieldChange}
                                                    className="w-full bg-white/10 border-2 border-white/20 text-white rounded-xl px-4 py-3 
                                                    focus:border-yellow-400 focus:ring focus:ring-yellow-400/30 transition-all
                                                    outline-none placeholder-white/40"
                                                    placeholder="Enter previous yield..."
                                                />
                                            </div>
                                            <div className="md:self-end">
                                                <motion.button
                                                    whileHover={{ scale: 1.05, backgroundColor: "#22c55e" }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleCompare}
                                                    className="w-full md:w-auto bg-green-500 text-white px-8 py-3 rounded-xl
                                                    font-medium transition-all duration-200 shadow-lg shadow-green-500/30"
                                                >
                                                    Compare Results
                                                </motion.button>
                                            </div>
                                        </div>

                                        {comparisonResult && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="mt-6 overflow-hidden"
                                            >
                                                <div
                                                    className={`p-4 rounded-xl ${
                                                        comparisonResult.includes("higher")
                                                            ? "bg-green-400/20 border border-green-400/30"
                                                            : comparisonResult.includes("lower")
                                                            ? "bg-red-400/20 border border-red-400/30"
                                                            : "bg-yellow-400/20 border border-yellow-400/30"
                                                    }`}
                                                >
                                                    <p
                                                        className={`text-lg font-medium ${
                                                            comparisonResult.includes("higher")
                                                                ? "text-green-400"
                                                                : comparisonResult.includes("lower")
                                                                ? "text-red-400"
                                                                : "text-yellow-400"
                                                        }`}
                                                    >
                                                        {comparisonResult}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>

                                    {/* Data visualization placeholder */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8, duration: 0.5 }}
                                        className="mt-8 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center"
                                        style={{ height: "220px" }}
                                    >
                                        <div className="text-center">
                                            <div className="bg-white/10 rounded-full p-4 inline-block mb-4">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-8 w-8 text-white/60"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-white/70 font-semibold">
                                                Sri Lanka's paddy farming is deeply rooted in its culture and economy.
                                                The island's fertile lands and favorable climate make it ideal for rice cultivation.
                                                With the right practices, farmers can achieve sustainable yields that support both
                                                their livelihoods and the nation's food security.
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Navigation buttons */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1, duration: 0.5 }}
                                        className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10"
                                    >
                                        <motion.a
                                            whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                            whileTap={{ scale: 0.98 }}
                                            href="/"
                                            className="w-full sm:w-auto text-center bg-white/5 border border-white/20 hover:border-white/40 text-white px-8 py-3.5 rounded-xl font-medium transition-all duration-200"
                                        >
                                            ← Return to Input Page
                                        </motion.a>
                                        <motion.a
                                            whileHover={{ scale: 1.03, backgroundColor: "#eab308" }}
                                            whileTap={{ scale: 0.98 }}
                                            href="/recommendations"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleRecommendations();
                                            }}
                                            className="w-full sm:w-auto text-center bg-yellow-500 hover:bg-yellow-400 text-white px-8 py-3.5 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-yellow-500/30"
                                        >
                                            View Recommendations →
                                        </motion.a>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 max-w-lg mx-auto text-center">
                            <div className="bg-yellow-400/20 p-4 rounded-full inline-flex mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-yellow-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-white mb-3">
                                No Prediction Data Available
                            </h2>
                            <p className="text-white/70 mb-6">
                                Please return to the input page and submit your
                                field data to generate a prediction.
                            </p>
                            <motion.a
                                whileHover={{ scale: 1.05, backgroundColor: "#22c55e" }}
                                whileTap={{ scale: 0.98 }}
                                href="/"
                                className="inline-block bg-green-500 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-green-500/30"
                            >
                                Go to Input Page
                            </motion.a>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ResultPrediction;