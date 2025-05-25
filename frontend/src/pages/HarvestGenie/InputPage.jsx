import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSeedling, FaLeaf, FaCloudRain, FaSun } from "react-icons/fa";

const InputPage = () => {
    const [formData, setFormData] = useState({
        district: "",
        season: "",
        temperature: "",
        rainfall: "",
        sunshine_hours: "",
        humidity: "",
        wind_speed: "",
        soil_type: "",
        irrigation_type: "",
        water_source: "",
        paddy_variety: "",
        fertilizer_usage: "",
        soil_nitrogen: "",
        soil_phosphorus: "",
        soil_potassium: "",
        pest_severity: "",
        area: "",
    });

    const [activeSection, setActiveSection] = useState(1);
    const navigate = useNavigate();

    const districts = [
        "Ampara",
        "Anuradhapura",
        "Batticaloa",
        "Hambantota",
        "Jaffna",
        "Kurunegala",
        "Mannar",
        "Polonnaruwa",
        "Trincomalee",
        "Vavuniya",
    ];
    const seasons = ["Maha", "Yala"];
    const soilTypes = ["Loam", "Sandy", "Clay"];
    const irrigationTypes = ["Rainfed", "Canal", "Tube Well"];
    const waterSources = ["Well", "River", "Rainwater"];
    const paddyVarieties = ["BG 450", "BG 250", "BG 350", "BG 360"];
    const pestSeverities = ["Low", "Medium", "High"];

    const fetchWeatherData = async (district, season) => {
        if (district && season) {
            const response = await fetch(
                `http://127.0.0.1:8000/weather?district=${district}&season=${season}`
            );
            const data = await response.json();
            setFormData((prevData) => ({
                ...prevData,
                temperature: data.average_temperature,
                rainfall: data.average_rainfall,
                sunshine_hours: data.average_sunshine_hours,
                humidity: data.average_humidity,
                wind_speed: data.average_windspeed,
            }));
        }
    };

    const handleDistrictSeasonChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        fetchWeatherData(formData.district, formData.season);
    }, [formData.district, formData.season]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Extract and save the input data in sessionStorage
        const essentialData = {
            district: formData.district,
            season: formData.season,
            nitrogen: formData.soil_nitrogen,
            phosphorus: formData.soil_phosphorus,
            potassium: formData.soil_potassium,
            pest_severity: formData.pest_severity,
        };
        sessionStorage.setItem("essentialData", JSON.stringify(essentialData));

        // Call the prediction API
        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        console.log("Prediction Result:", result);

        try {
            // Extract variables from formData for readability
            const {
                district,
                season,
                soil_nitrogen,
                soil_phosphorus,
                soil_potassium,
                pest_severity,
            } = formData;

            // Fetch soil recommendations
            const soilResponse = await fetch(
                `http://127.0.0.1:8000/api/soil-recommendations?district=${district}&season=${season}&nitrogen=${soil_nitrogen}&phosphorus=${soil_phosphorus}&potassium=${soil_potassium}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const soilData = await soilResponse.json();
            console.log("Soil Recommendations:", soilData);

            // Fetch pest recommendations
            const pestResponse = await fetch(
                `http://127.0.0.1:8000/api/pest-recommendations?pest_severity=${pest_severity}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const pestData = await pestResponse.json();
            console.log("Pest Recommendations:", pestData);

            // Fetch water supply recommendations
            const waterResponse = await fetch(
                `http://127.0.0.1:8000/api/water-supply-recommendations?district=${district}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const waterData = await waterResponse.json();
            console.log("Water Supply Recommendations:", waterData);

            // Fetch district recommendations
            const districtResponse = await fetch(
                `http://127.0.0.1:8000/api/district-recommendations?district=${district}&season=${season}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const districtData = await districtResponse.json();
            console.log("District Recommendations:", districtData);

            // Save the fetched data to sessionStorage
            sessionStorage.setItem(
                "soilRecommendations",
                JSON.stringify(soilData)
            );
            sessionStorage.setItem(
                "pestRecommendations",
                JSON.stringify(pestData)
            );
            sessionStorage.setItem(
                "waterRecommendations",
                JSON.stringify(waterData)
            );
            sessionStorage.setItem(
                "districtRecommendations",
                JSON.stringify(districtData)
            );
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }

        // Navigate to the result page with the prediction result
        navigate("/result", { state: { predictionResult: result } });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Prevent negative values for numeric fields
        let sanitizedValue = value;

        if (
            [
                "area",
                "rainfall",
                "temperature",
                "humidity",
                "sunshine_hours",
                "wind_speed",
                "soil_nitrogen",
                "soil_phosphorus",
                "soil_potassium",
                "fertilizer_usage",
            ].includes(name)
        ) {
            sanitizedValue = value < 0 ? 0 : value.replace(/[^0-9.]/g, "");
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: sanitizedValue,
        }));
    };

    const sections = [
        {
            id: 1,
            title: "Location & Season",
            icon: <FaLeaf className="text-xl" />,
            fields: ["district", "season"],
        },
        {
            id: 2,
            title: "Weather Data",
            icon: <FaCloudRain className="text-xl" />,
            fields: [
                "temperature",
                "rainfall",
                "sunshine_hours",
                "humidity",
                "wind_speed",
            ],
        },
        {
            id: 3,
            title: "Soil & Irrigation",
            icon: <FaSun className="text-xl" />,
            fields: [
                "soil_type",
                "irrigation_type",
                "water_source",
                "soil_nitrogen",
                "soil_phosphorus",
                "soil_potassium",
            ],
        },
        {
            id: 4,
            title: "Crop Details",
            icon: <FaSeedling className="text-xl" />,
            fields: [
                "paddy_variety",
                "fertilizer_usage",
                "pest_severity",
                "area",
            ],
        },
    ];

    // Add units for specific fields
    const labelUnits = {
        temperature: " (°C)",
        rainfall: " (mm)",
        sunshine_hours: " (hours)",
        humidity: " (%)",
        wind_speed: " (km/h)",
        soil_nitrogen: " (mg/kg)",
        soil_phosphorus: " (mg/kg)",
        soil_potassium: " (mg/kg)",
        area: " (hectares)",
    };

    const getFieldOptions = (key) => {
        switch (key) {
            case "soil_type":
                return soilTypes;
            case "irrigation_type":
                return irrigationTypes;
            case "water_source":
                return waterSources;
            case "paddy_variety":
                return paddyVarieties;
            case "pest_severity":
                return pestSeverities;
            case "district":
                return districts;
            case "season":
                return seasons;
            default:
                return [];
        }
    };

    const isNumberField = (key) => {
        return [
            "area",
            "rainfall",
            "temperature",
            "humidity",
            "sunshine_hours",
            "wind_speed",
            "soil_nitrogen",
            "soil_phosphorus",
            "soil_potassium",
            "fertilizer_usage",
        ].includes(key);
    };

    const getActiveSection = () => {
        const currentSection = sections.find((s) => s.id === activeSection);
        return currentSection ? currentSection.fields : [];
    };

    const moveToNextSection = () => {
        if (activeSection < sections.length) {
            setActiveSection(activeSection + 1);
        }
    };

    const moveToPrevSection = () => {
        if (activeSection > 1) {
            setActiveSection(activeSection - 1);
        }
    };

   const isCurrentSectionValid = () => {
    return getActiveSection().every((key) => {
        const value = formData[key]?.toString().trim();
        return value !== "" && value !== undefined && value !== null;
    });
};

    return (
        <div
            className="min-h-screen flex flex-col text-white"
            style={{
                backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/047/538/704/non_2x/freshly-harvested-rice-grains-and-stalks-free-photo.jpeg')`, // Replace with your image path
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="flex pt-10 flex-grow items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-black/80 backdrop-blur-sm border border-emerald-500/30 p-8 rounded-2xl shadow-2xl w-full max-w-5xl"
                >
                    <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-darkgreen bg-clip-text text-transparent">
                        Paddy Yield Prediction
                    </h1>

                    {/* Progress steps */}
                    <div className="mb-10">
                        <div className="flex justify-between items-center mb-2">
                            {sections.map((section) => (
                                <div
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                                        activeSection === section.id
                                            ? "scale-110"
                                            : "opacity-70"
                                    }`}
                                >
                                    <div
                                        className={`flex items-center justify-center w-12 h-12 rounded-full mb-2 ${
                                            activeSection === section.id
                                                ? "bg-emerald-500"
                                                : "bg-emerald-900"
                                        }`}
                                    >
                                        {section.icon}
                                    </div>
                                    <span className="text-xs text-center">
                                        {section.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="w-full bg-emerald-900/50 h-2 rounded-full">
                            <div
                                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                                style={{
                                    width: `${
                                        (activeSection / sections.length) * 100
                                    }%`,
                                }}
                            ></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {getActiveSection().map((key) => {
                                const options = getFieldOptions(key);

                                return (
                                    <div key={key} className="col-span-1">
                                        <label
                                            htmlFor={key}
                                            className="block font-medium text-emerald-300 mb-2"
                                        >
                                            {key
                                                .split("_")
                                                .map(
                                                    (word) =>
                                                        word
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        word.slice(1)
                                                )
                                                .join(" ")}
                                            {labelUnits[key] || ""}
                                        </label>

                                        {options.length > 0 ? (
                                            <select
                                                name={key}
                                                id={key}
                                                value={formData[key]}
                                                onChange={
                                                    key === "district" ||
                                                    key === "season"
                                                        ? handleDistrictSeasonChange
                                                        : handleChange
                                                }
                                                className="w-full p-3 border border-emerald-500/30 rounded-lg bg-black/50 text-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                                                required
                                            >
                                                <option value="">
                                                    Select{" "}
                                                    {key.replace(/_/g, " ")}
                                                </option>
                                                {options.map((option) => (
                                                    <option
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={
                                                    isNumberField(key)
                                                        ? "number"
                                                        : "text"
                                                }
                                                name={key}
                                                id={key}
                                                value={formData[key]}
                                                onChange={handleChange}
                                                step="any"
                                                className="w-full p-3 border border-emerald-500/30 rounded-lg bg-black/50 text-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                                                required
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-10 flex justify-between">
                            {activeSection > 1 && (
                                <motion.button
                                    type="button"
                                    onClick={moveToPrevSection}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-8 py-3 bg-emerald-900 rounded-lg text-white font-medium"
                                >
                                    Previous
                                </motion.button>
                            )}

                            {activeSection < sections.length ? (
                                <motion.button
                                    type="button"
                                    onClick={
                                        isCurrentSectionValid()
                                            ? moveToNextSection
                                            : null
                                    }
                                    whileHover={{
                                        scale: isCurrentSectionValid()
                                            ? 1.03
                                            : 1,
                                    }}
                                    whileTap={{
                                        scale: isCurrentSectionValid()
                                            ? 0.97
                                            : 1,
                                    }}
                                    disabled={!isCurrentSectionValid()}
                                    className={`ml-auto px-8 py-3 rounded-lg text-white font-medium transition-all ${
                                        isCurrentSectionValid()
                                            ? "bg-emerald-600 cursor-pointer"
                                            : "bg-gray-700 cursor-not-allowed"
                                    }`}
                                >
                                    Next
                                </motion.button>
                            ) : (
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="ml-auto group relative overflow-hidden px-10 py-4 bg-gradient-to-r from-emerald-600 to-green-500
 rounded-lg text-white font-bold text-xl shadow-xl
 hover:shadow-emerald-500/30 transition-all duration-300"
                                >
                                    <span className="relative flex items-center gap-3">
                                        <FaSeedling className="text-xl" />
                                        <span>Generate Prediction</span>
                                    </span>
                                </motion.button>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default InputPage;