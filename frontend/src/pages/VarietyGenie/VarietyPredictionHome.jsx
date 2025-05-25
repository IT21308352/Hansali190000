import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const VarietyPredictionHome = () => {
    const navigate = useNavigate();
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
        const updateNavbarHeight = () => {
            const navbar = document.getElementById("navbar");
            if (navbar) {
                setNavbarHeight(navbar.offsetHeight);
            }
        };

        updateNavbarHeight();
        window.addEventListener("resize", updateNavbarHeight);

        return () => window.removeEventListener("resize", updateNavbarHeight);
    }, []);

    const historyCards = [
        {
            title: "Ancient Beginnings",
            description:
                "The journey of paddy starts thousands of years ago in Sri Lanka, establishing sophisticated irrigation systems that still inspire modern water management techniques.",
            icon: "🏺",
        },
        {
            title: "Traditional Methods",
            description:
                "Indigenous farming techniques emphasize biodiversity and environmental sustainability while ensuring food security across generations.",
            icon: "🌾",
        },
        {
            title: "Modern Evolution",
            description:
                "Today's approach combines traditional wisdom with advanced technology, improved seed varieties, and precision agriculture for optimal yields.",
            icon: "🔬",
        },
        {
            title: "Future of Farming",
            description:
                "Embracing AI, IoT, and data-driven decision-making to revolutionize the sector for enhanced yields and sustainability.",
            icon: "🤖",
        },
    ];

    const cultivationCards = [
        {
            image: "./images/hero-card-img1.jpg",
            title: "Rice Varieties",
            description:
                "Discover the diverse range of rice varieties suited for different growing conditions in Sri Lanka.",
            icon: "🌱",
            link: "/variety-input",
        },
        {
            image: "./images/hero-card-img2.jpg",
            title: "Variety Distribution",
            description:
                "Explore the geographical distribution of rice varieties across different regions of Sri Lanka.",
            icon: "🗺️",
            link: "/rice-variety-map",
        },
        {
            image: "./images/hero-card-img3.png",
            title: "Recommendation Process",
            description:
                "Understand how our AI selects the perfect rice variety for your specific growing conditions.",
            icon: "🧠",
            link: "/variety-process",
        },
        {
            image: "./images/hero-card-img4.jpg",
            title: "Paddy Calendar",
            description:
                "Plan your cultivation activities with our comprehensive paddy growing calendar.",
            icon: "📅",
            link: "/crop-calender",
        },
    ];

    const statsData = [
        {
            value: "74+",
            description: "registered rice varieties in Sri Lanka",
        },
        {
            value: "95%",
            description: "prediction accuracy for variety selection",
        },
        {
            value: "12+",
            description: "climate zones with optimized varieties",
        },
        {
            value: "20%",
            description: "yield increase with proper variety selection",
        },
    ];

    return (
        <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
            {/* Hero Section - Full screen video */}
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
                        <h1 className="text-7xl font-bold text-white mb-6">
                            <span className="text-green-400">Variety</span>{" "}
                            Genie
                        </h1>
                        <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                            Find the Perfect Match for Your Paddy Fields With
                            Sri Lanka's recommended rice varieties, expertly
                            tailored to thrive in the island's diverse climates
                            and soils.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/variety-input")}
                                className="bg-green-500 hover:bg-green-600 text-white py-4 px-8 rounded-full text-lg font-medium shadow-lg flex items-center justify-center"
                            >
                                <span>Predict Perfect Variety</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 ml-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/varieties")}
                                className="bg-transparent border-2 border-white text-white py-4 px-8 rounded-full text-lg font-medium shadow-lg"
                            >
                                Varieties Guide
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
                    <div className="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-green-500 shadow-lg rounded-full flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-green-500"
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

            {/* Stats Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {statsData.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="bg-green-50 p-8 rounded-3xl text-center"
                            >
                                <h3 className="text-5xl font-bold text-green-600 mb-2">
                                    {stat.value}
                                </h3>
                                <p className="text-gray-600">
                                    {stat.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* History Timeline Section */}
            <div className="py-20 bg-gradient-to-b from-white to-green-50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-green-800 mb-4">
                            Our Heritage in Rice Varieties
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Sri Lanka's rich history of rice cultivation
                            includes a diverse range of varieties adapted to
                            local conditions
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {historyCards.map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    x: index % 2 === 0 ? -50 : 50,
                                }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                                className="bg-white p-6 rounded-2xl shadow-xl border border-green-100"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="text-4xl mr-4">
                                        {card.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-green-700">
                                        {card.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600">
                                    {card.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cultivation Cards */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-green-800 mb-4">
                            Variety Selection Guide
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Explore our comprehensive resources to help you
                            select the perfect rice variety for your fields
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {cultivationCards.map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                whileHover={{
                                    y: -10,
                                    transition: { duration: 0.2 },
                                }}
                                className="group"
                            >
                                <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl border border-green-100 shadow-lg h-full flex flex-col transition-all duration-300 group-hover:shadow-xl overflow-hidden">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="h-48 w-full object-cover"
                                    />
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="flex-grow">
                                            <div className="text-3xl mb-3">
                                                {card.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-green-700 mb-2 capitalize">
                                                {card.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {card.description}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => navigate(card.link)}
                                            className="mt-auto flex items-center font-medium text-green-600 group-hover:text-green-700"
                                        >
                                            Learn More
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-green-800 py-20">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-white mb-8">
                            Ready to Find Your Perfect Rice Variety?
                        </h2>
                        <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto">
                            Join thousands of Sri Lankan farmers who are already
                            using Variety Genie to select the ideal rice
                            varieties for their unique growing conditions.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/variety-input")}
                            className="bg-white text-green-800 py-4 px-10 rounded-full text-lg font-medium shadow-lg inline-flex items-center"
                        >
                            Get Started Today
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default VarietyPredictionHome;