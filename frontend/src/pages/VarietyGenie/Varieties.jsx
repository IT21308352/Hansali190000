import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RiceVarietiesPage = () => {
    const [groupedRiceVarieties, setGroupedRiceVarieties] = useState({});
    const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:8000/rice-details/rice-varieties/by-age-group")
            .then((response) => {
                setGroupedRiceVarieties(response.data);
                const firstGroup = Object.keys(response.data).sort(
                    (a, b) => parseFloat(a) - parseFloat(b)
                )[0];
                setSelectedAgeGroup(firstGroup);
            })
            .catch((error) => {
                console.error("Error fetching grouped rice varieties:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const ageGroupLabels = {
        2.5: "Short Duration",
        3: "Medium-Short Duration",
        3.5: "Medium Duration",
        4: "Medium-Long Duration",
        4.5: "Long Duration",
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center p-8">
                    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-green-800 font-medium">
                        Loading rice varieties...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-green-800 mb-3">
                        Rice Varieties of Sri Lanka
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore recommended rice varieties developed and
                        cultivated in Sri Lanka from 1958 to 2024, organized by
                        maturity duration.
                    </p>
                </motion.div>

                {/* Age Group Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-md p-6 mb-10"
                >
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Filter by Maturity Duration
                    </h2>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {Object.keys(groupedRiceVarieties)
                            .sort((a, b) => parseFloat(a) - parseFloat(b))
                            .map((ageGroup, index) => (
                                <motion.button
                                    key={ageGroup}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.1 * index,
                                    }}
                                    onClick={() =>
                                        setSelectedAgeGroup(ageGroup)
                                    }
                                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                                        selectedAgeGroup === ageGroup
                                            ? "bg-green-600 text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {ageGroupLabels[ageGroup] ||
                                        `${ageGroup} Months`}
                                </motion.button>
                            ))}
                    </div>
                </motion.div>

                {/* Varieties Card Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-10"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {selectedAgeGroup &&
                                `${
                                    ageGroupLabels[selectedAgeGroup] ||
                                    `${selectedAgeGroup} Month`
                                } Varieties`}
                        </h2>
                        <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                            {selectedAgeGroup &&
                                groupedRiceVarieties[selectedAgeGroup]
                                    ?.length}{" "}
                            varieties
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {selectedAgeGroup &&
                            groupedRiceVarieties[selectedAgeGroup]?.map(
                                (variety, index) => {
                                    // Construct image URL dynamically
                                    const imageUrl = `/${variety}.JPG`;

                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: 0.05 * index,
                                            }}
                                            whileHover={{
                                                scale: 1.05,
                                                boxShadow:
                                                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                            }}
                                        >
                                            <Link
                                                to={`/variety-details/${variety}`}
                                                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block h-full"
                                            >
                                                <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                                                    <img
                                                        src={imageUrl}
                                                        alt={variety}
                                                        className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                                                        onError={(e) => {
                                                            e.target.src =
                                                                "https://placehold.co/300x300/e2e8f0/1e293b?text=Image+Not+Found";
                                                        }}
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-bold text-gray-800 text-lg mb-1">
                                                        {variety}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {
                                                            ageGroupLabels[
                                                                selectedAgeGroup
                                                            ]
                                                        }
                                                    </p>
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center">
                                                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                            View Details
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                }
                            )}
                    </div>
                </motion.div>

                {/* Information section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-md p-6 mb-6"
                >
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        About Rice Varieties in Sri Lanka
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Rice varieties in Sri Lanka are categorized based on
                        their maturity duration, ranging from short-duration
                        varieties (2.5 months) to long-duration varieties (4.5
                        months). Each variety has been developed to suit
                        different agro-ecological zones, resistance to pests and
                        diseases, and yield potential.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-green-50 p-4 rounded-lg"
                        >
                            <h3 className="font-semibold text-green-800 mb-2">
                                Climate Adaptation
                            </h3>
                            <p className="text-sm text-gray-600">
                                Varieties are bred for specific climatic
                                conditions across different regions of Sri
                                Lanka.
                            </p>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-green-50 p-4 rounded-lg"
                        >
                            <h3 className="font-semibold text-green-800 mb-2">
                                Disease Resistance
                            </h3>
                            <p className="text-sm text-gray-600">
                                Many varieties offer resistance to common rice
                                diseases like bacterial leaf blight and blast.
                            </p>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-green-50 p-4 rounded-lg"
                        >
                            <h3 className="font-semibold text-green-800 mb-2">
                                Yield Potential
                            </h3>
                            <p className="text-sm text-gray-600">
                                Newer varieties have been developed with higher
                                yield potential and improved grain quality.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RiceVarietiesPage;