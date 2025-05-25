import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
    {
        id: 1,
        title: "1. Site Selection",
        content: `Choose a flat or gently sloping land near a water source. Ensure the soil is fertile and has good water retention (loamy or clayey soils are ideal).`,
        image: "https://images.pexels.com/photos/3145150/pexels-photo-3145150.jpeg?auto=compress&cs=tinysrgb&w=600",
        iconClass: "fas fa-map-marker-alt",
    },
    {
        id: 2,
        title: "2. Land Preparation",
        content: `Clear the field of debris, weeds, or stones. Plow the soil to a depth of 15–20 cm and puddle the field to create a soft, muddy bed. Build bunds and drainage channels to manage water.`,
        image: "https://images.unsplash.com/photo-1603106116068-02fc27fe5131?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        iconClass: "fas fa-tractor",
    },
    {
        id: 3,
        title: "3. Seed Selection and Treatment",
        content: `Select certified seed varieties (e.g., BG 250 or BG 360). Soak seeds in water for 12–24 hours and treat them with fungicides or bio-control agents to protect against diseases.`,
        image: "https://images.pexels.com/photos/19643773/pexels-photo-19643773/free-photo-of-view-of-terrace-rice-plantation-and-palm-trees.jpeg?auto=compress&cs=tinysrgb&w=600",
        iconClass: "fas fa-seedling",
    },
    {
        id: 4,
        title: "4. Sowing",
        content: `For direct seeding, broadcast pre-soaked seeds evenly. For transplanting, grow seedlings in a nursery for 20–25 days and transplant 2–3 seedlings per hill with 15 x 15 cm spacing.`,
        image: "https://images.pexels.com/photos/21711158/pexels-photo-21711158/free-photo-of-a-tractor-with-a-seeder-on-a-cropland.jpeg?auto=compress&cs=tinysrgb&w=600",
        iconClass: "fas fa-hand-holding-seedling",
    },
    {
        id: 5,
        title: "5. Water Management",
        content: `Maintain 2–5 cm of standing water during the vegetative stage. Use Alternate Wetting and Drying (AWD) to conserve water. Drain the field during the ripening stage.`,
        image: "https://images.pexels.com/photos/10152767/pexels-photo-10152767.jpeg?auto=compress&cs=tinysrgb&w=600",
        iconClass: "fas fa-water",
    },
    {
        id: 6,
        title: "6. Fertilizer Application",
        content: `Apply phosphorus (DAP) and potassium (MOP) during field preparation. Use nitrogen (urea) in split doses at tillering, panicle initiation, and flowering stages. Incorporate organic fertilizers like compost.`,
        image: "https://images.pexels.com/photos/18620459/pexels-photo-18620459/free-photo-of-photo-of-a-senior-farmer-sowing-in-a-rice-field.jpeg?auto=compress&cs=tinysrgb&w=600",
        iconClass: "fas fa-prescription-bottle",
    },
    {
        id: 7,
        title: "7. Weed Management",
        content: `Remove weeds manually at 20 and 40 days after sowing. Use pre-emergent herbicides like butachlor or post-emergent ones for effective weed control.`,
        image: "https://images.pexels.com/photos/5174197/pexels-photo-5174197.jpeg?auto=compress&cs=tinysrgb&w=600",
        iconClass: "fas fa-bug-slash",
    },
    {
        id: 8,
        title: "8. Pest and Disease Management",
        content: `Monitor pests like brown planthoppers or stem borers weekly. Use neem-based biopesticides or targeted chemical pesticides when necessary. Prevent fungal diseases with proper drainage and resistant varieties.`,
        image: "https://images.pexels.com/photos/30054090/pexels-photo-30054090/free-photo-of-close-up-of-a-tick-on-green-plant-leaf.jpeg?auto=compress&cs=tinysrgb&w=600",
        iconClass: "fas fa-shield-virus",
    },
    {
        id: 9,
        title: "9. Harvesting",
        content: `Harvest when 80–85% of the grains turn golden yellow. Ensure grains have 20–22% moisture during harvest. Thresh and sun-dry grains to 14% moisture for storage.`,
        image: "https://images.pexels.com/photos/9223052/pexels-photo-9223052.jpeg?auto=compress&cs=tinysrgb&w=600",
        iconClass: "fas fa-cut",
    },
    {
        id: 10,
        title: "10. Post-Harvest Practices",
        content: `Store grains in clean, dry, and pest-free facilities. Use milling equipment to separate husk and bran layers for market-ready rice.`,
        image: "https://images.pexels.com/photos/14092191/pexels-photo-14092191.jpeg?auto=compress&cs=tinysrgb&w=600",
        iconClass: "fas fa-warehouse",
    },
];

const NewFarmerGuide = () => {
    const [expandedStep, setExpandedStep] = useState(null);
    const [activeTab, setActiveTab] = useState("all");

    const toggleStep = (id) => {
        setExpandedStep(expandedStep === id ? null : id);
    };

    const filterSteps = () => {
        if (activeTab === "all") return steps;
        if (activeTab === "preparation")
            return steps.filter((step) => step.id <= 3);
        if (activeTab === "cultivation")
            return steps.filter((step) => step.id > 3 && step.id <= 8);
        if (activeTab === "harvest") return steps.filter((step) => step.id > 8);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
            {/* Hero Section */}
            <div
                className="relative h-80 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center px-4">
                        <h1 className="text-5xl font-bold text-white mb-4">
                            Paddy Cultivation Guide
                        </h1>
                        <p className="text-xl text-white max-w-2xl mx-auto">
                            A comprehensive guide for new farmers to master rice
                            cultivation techniques
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap justify-center mb-8 gap-2">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                            activeTab === "all"
                                ? "bg-green-600 text-white shadow-lg transform scale-105"
                                : "bg-white text-green-600 hover:bg-green-50"
                        }`}
                    >
                        All Steps
                    </button>
                    <button
                        onClick={() => setActiveTab("preparation")}
                        className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                            activeTab === "preparation"
                                ? "bg-green-600 text-white shadow-lg transform scale-105"
                                : "bg-white text-green-600 hover:bg-green-50"
                        }`}
                    >
                        Preparation
                    </button>
                    <button
                        onClick={() => setActiveTab("cultivation")}
                        className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                            activeTab === "cultivation"
                                ? "bg-green-600 text-white shadow-lg transform scale-105"
                                : "bg-white text-green-600 hover:bg-green-50"
                        }`}
                    >
                        Cultivation
                    </button>
                    <button
                        onClick={() => setActiveTab("harvest")}
                        className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                            activeTab === "harvest"
                                ? "bg-green-600 text-white shadow-lg transform scale-105"
                                : "bg-white text-green-600 hover:bg-green-50"
                        }`}
                    >
                        Harvesting
                    </button>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterSteps().map((step) => (
                        <motion.div
                            key={step.id}
                            className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                            whileHover={{ y: -5 }}
                            layout
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                                <div className="absolute bottom-0 left-0 p-4 flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                                        <i
                                            className={`${step.iconClass} text-white`}
                                        ></i>
                                    </div>
                                    <h2 className="text-white text-xl font-bold">
                                        {step.title}
                                    </h2>
                                </div>
                            </div>

                            <div className="p-6">
                                <motion.div
                                    className="cursor-pointer flex justify-between items-center"
                                    onClick={() => toggleStep(step.id)}
                                >
                                    <h3 className="text-lg font-semibold text-green-700">
                                        View Details
                                    </h3>
                                    <motion.div
                                        animate={{
                                            rotate:
                                                expandedStep === step.id
                                                    ? 180
                                                    : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-green-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </motion.div>
                                </motion.div>

                                <AnimatePresence>
                                    {expandedStep === step.id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-4 text-gray-600 leading-relaxed"
                                        >
                                            <p>{step.content}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default NewFarmerGuide;