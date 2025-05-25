import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PaddyYieldHome = () => {
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

    const cultivationCards = [
        {
            title: "Field Preparation",
            description: "Optimize soil health and irrigation systems",
            icon: "🌱",
            link: "/field-preparation",
        },
        {
            title: "Seed Selection",
            description: "Choose high-quality seeds for maximum yield",
            icon: "🌾",
            link: "/seed-selection",
        },
        {
            title: "Crop Nurturing",
            description: "Monitor and adjust for optimal growth",
            icon: "🌿",
            link: "/crop-nurturing",
        },
        {
            title: "Pest Control",
            description: "Implement effective pest management strategies",
            icon: "🐛",
            link: "/pest-control",
        },
        {
            title: "Irrigation Management",
            description: "Plan efficient water usage patterns",
            icon: "💧",
            link: "/irrigation-management",
        },
        {
            title: "Harvest Planning",
            description: "Data-driven forecasting for confident harvests",
            icon: "🌻",
            link: "/harvest-planning",
        },
    ];

    return (
        <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
            {/* Hero Section - Full screen parallax */}
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
                            src="https://assets.mixkit.co/videos/12996/12996-720.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/40" />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-center items-center px-4 text-center">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-7xl font-bold text-white mb-6">
                            <span className="text-green-400">Rice</span> Genie
                        </h1>
                        <p className="text-2xl text-gray-100 mb-8  mt-8 leading-relaxed">
                            Transforming Sri Lankan agriculture with AI-powered
                            insights and sustainable farming practices
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/input-form")}
                                className="bg-green-500 hover:bg-green-600 text-white py-4 px-8 rounded-full text-lg font-medium shadow-lg flex items-center justify-center"
                            >
                                <span>Predict Your Harvest</span>
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
                                onClick={() => navigate("/new-farmer")}
                                className="bg-transparent border-2 border-white text-white py-4 px-8 rounded-full text-lg font-medium shadow-lg"
                            >
                                Cultivation Guide
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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-green-50 p-8 rounded-3xl text-center"
                        >
                            <h3 className="text-5xl font-bold text-green-600 mb-2">
                                40%
                            </h3>
                            <p className="text-gray-600">
                                of Sri Lanka's agricultural land
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-green-50 p-8 rounded-3xl text-center"
                        >
                            <h3 className="text-5xl font-bold text-green-600 mb-2">
                                3.6M
                            </h3>
                            <p className="text-gray-600">
                                tons annual rice production
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-green-50 p-8 rounded-3xl text-center"
                        >
                            <h3 className="text-5xl font-bold text-green-600 mb-2">
                                2,500
                            </h3>
                            <p className="text-gray-600">
                                years of cultivation history
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-green-50 p-8 rounded-3xl text-center"
                        >
                            <h3 className="text-5xl font-bold text-green-600 mb-2">
                                15%
                            </h3>
                            <p className="text-gray-600">
                                increase in yields with AI insights
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="py-20 bg-gradient-to-b from-white to-green-50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-green-800 mb-4">
                            Our Heritage in Paddy Cultivation
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Sri Lanka's rich history of rice cultivation spans
                            millennia, blending ancient wisdom with modern
                            innovation
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>

                        <div className="space-y-24">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="relative flex items-center justify-end md:justify-start"
                            >
                                <div className="md:flex-row-reverse flex items-center w-full">
                                    <div className="w-full md:w-1/2 md:pl-16">
                                        <div className="p-6 bg-white rounded-2xl shadow-xl border border-green-100">
                                            <h3 className="text-2xl font-bold text-green-700 mb-2">
                                                Ancient Beginnings
                                            </h3>
                                            <p className="text-gray-600">
                                                Dating back to 543 BC, our
                                                ancestors established
                                                sophisticated irrigation systems
                                                that still inspire modern water
                                                management techniques.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                        <div className="w-14 h-14 rounded-full bg-green-500 shadow-lg flex items-center justify-center">
                                            <span className="ms-4 text-white font-bold">
                                                543 BC
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="relative flex items-center justify-start md:justify-end"
                            >
                                <div className="flex items-center w-full">
                                    <div className="w-full md:w-1/2 md:pr-16">
                                        <div className="p-6 bg-white rounded-2xl shadow-xl border border-green-100">
                                            <h3 className="text-2xl font-bold text-green-700 mb-2">
                                                Traditional Methods
                                            </h3>
                                            <p className="text-gray-600">
                                                Indigenous farming techniques
                                                emphasize biodiversity and
                                                environmental sustainability
                                                while ensuring food security.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                        <div className="w-14 h-14 rounded-full bg-green-500 shadow-lg flex items-center justify-center">
                                            <span className="text-white font-bold">
                                                Past
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="relative flex items-center justify-end md:justify-start"
                            >
                                <div className="md:flex-row-reverse flex items-center w-full">
                                    <div className="w-full md:w-1/2 md:pl-16">
                                        <div className="p-6 bg-white rounded-2xl shadow-xl border border-green-100">
                                            <h3 className="text-2xl font-bold text-green-700 mb-2">
                                                Modern Evolution
                                            </h3>
                                            <p className="text-gray-600">
                                                Today's approach combines
                                                traditional wisdom with advanced
                                                technology, improved seed
                                                varieties, and precision
                                                agriculture.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                        <div className="w-14 h-14 rounded-full bg-green-500 shadow-lg flex items-center justify-center">
                                            <span className="text-white font-bold">
                                                Now
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="relative flex items-center justify-start md:justify-end"
                            >
                                <div className="flex items-center w-full">
                                    <div className="w-full md:w-1/2 md:pr-16">
                                        <div className="p-6 bg-white rounded-2xl shadow-xl border border-green-100">
                                            <h3 className="text-2xl font-bold text-green-700 mb-2">
                                                Future of Farming
                                            </h3>
                                            <p className="text-gray-600">
                                                Embracing AI, IoT, and
                                                data-driven decision-making to
                                                revolutionize the sector for
                                                enhanced yields and
                                                sustainability.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                        <div className="w-14 h-14 rounded-full bg-green-500 shadow-lg flex items-center justify-center">
                                            <span className="text-white font-bold">
                                                Future
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
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
                            Smart Cultivation Journey
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From field preparation to harvest planning, Rice
                            Genie guides you through every step
                        </p>
                    </motion.div>
                    

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-3xl border border-green-100 shadow-lg h-full flex flex-col transition-all duration-300 group-hover:shadow-xl">
                                    <div className="flex-grow">
                                        <div className="text-5xl mb-4">
                                            {card.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-green-700 mb-3">
                                            {card.title}
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            {card.description}
                                        </p>
                                    </div>
                                    <a
                                        href={card.link}
                                        className="mt-auto flex items-center font-medium text-green-600 group-hover:text-green-700"
                                    >
                                        Learn More
                                    </a>
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
                            Ready to Revolutionize Your Paddy Cultivation?
                        </h2>
                        <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto">
                            Join thousands of Sri Lankan farmers who are already
                            using Rice Genie to increase their yields and adopt
                            sustainable farming practices.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/register")}
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

export default PaddyYieldHome;
