import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const VarietyDetails = () => {
    const { varietyName } = useParams();
    const [riceDetails, setRiceDetails] = useState(null);

    useEffect(() => {
        const fetchRiceDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/rice-details/${varietyName}`
                );
                setRiceDetails(response.data);
            } catch (error) {
                console.error("Error fetching rice details:", error);
            }
        };

        fetchRiceDetails();
    }, [varietyName]);

    const parsePestReaction = (reactionString) => {
        const reactions = {};
        const pests = reactionString?.split(", ");
        pests?.forEach((pest) => {
            const [pestName, pestReaction] = pest.split(": ");
            reactions[pestName.trim()] = pestReaction.trim();
        });
        return reactions;
    };

    const getResistanceColor = (resistance) => {
        if (resistance?.includes("Resistant"))
            return "bg-green-100 text-green-800";
        if (resistance?.includes("Moderately"))
            return "bg-yellow-100 text-yellow-800";
        if (resistance?.includes("Susceptible"))
            return "bg-red-100 text-red-800";
        return "bg-gray-100 text-gray-800";
    };

    const pestReactions = riceDetails
        ? parsePestReaction(riceDetails.reaction_to_pests_and_diseases)
        : {};

    // Image URL based on variety name
    const imageUrl = riceDetails
        ? `/${varietyName}.JPG`
        : "https://placehold.co/600x400/e2e8f0/1e293b?text=Rice+Variety+Image";

    if (!riceDetails) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center p-8">
                    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-green-800 font-medium">
                        Loading variety details...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Main content card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-green-700 h-16 md:h-24 flex items-center justify-between px-6 lg:px-10">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                            {riceDetails.variety_name}
                        </h1>
                        <span className="bg-green-100 text-green-800 text-xs md:text-sm px-3 py-1 rounded-full font-semibold">
                            {riceDetails.age_group}
                        </span>
                    </div>

                    <div className="p-6 md:p-8 lg:p-10">
                        {/* Image and key details */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
                            <div className="lg:col-span-2">
                                <div className="rounded-xl overflow-hidden shadow-lg h-full">
                                    <img
                                        src={imageUrl}
                                        alt={riceDetails.variety_name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="lg:col-span-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-green-50 p-6 rounded-xl">
                                        <h3 className="text-lg font-bold text-green-800 mb-4">
                                            Overview
                                        </h3>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Year of Release
                                                </p>
                                                <p className="font-medium">
                                                    {
                                                        riceDetails.year_of_release
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Parentage
                                                </p>
                                                <p className="font-medium">
                                                    {riceDetails.parentage}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Average Yield
                                                </p>
                                                <p className="font-medium">
                                                    {riceDetails.average_yield}{" "}
                                                    kg/ha
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Maturity
                                                </p>
                                                <p className="font-medium">
                                                    {riceDetails.maturity} days
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 p-6 rounded-xl">
                                        <h3 className="text-lg font-bold text-blue-800 mb-4">
                                            Grain Properties
                                        </h3>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Grain Shape
                                                </p>
                                                <p className="font-medium">
                                                    {riceDetails.grain_shape}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Thousand Grain Weight
                                                </p>
                                                <p className="font-medium">
                                                    {
                                                        riceDetails.thousand_grain_weight
                                                    }{" "}
                                                    g
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Pericarp Colour
                                                </p>
                                                <p className="font-medium">
                                                    {
                                                        riceDetails.pericarp_colour
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Gelatinization Temperature
                                                </p>
                                                <p className="font-medium">
                                                    {
                                                        riceDetails.gelatinization_temperature
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pest and Disease Resistance */}
                        <div className="mb-12">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 mr-2 text-green-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                                Pest and Disease Resistance
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {Object.entries(pestReactions).map(
                                    ([pest, resistance]) => (
                                        <div
                                            key={pest}
                                            className="border border-gray-200 rounded-lg overflow-hidden"
                                        >
                                            <div className="bg-gray-50 py-2 px-4">
                                                <h4 className="font-medium text-gray-800">
                                                    {pest}
                                                </h4>
                                            </div>
                                            <div className="p-4">
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getResistanceColor(
                                                        resistance
                                                    )}`}
                                                >
                                                    {resistance}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Milling Properties */}
                        <div className="mb-12">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 mr-2 text-amber-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                </svg>
                                Milling Properties
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-amber-50 rounded-xl p-6">
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                                            <span className="text-amber-800 text-xl font-bold">
                                                {
                                                    riceDetails.brown_rice_recovery
                                                }
                                                %
                                            </span>
                                        </div>
                                        <h4 className="font-medium text-gray-800">
                                            Brown Rice Recovery
                                        </h4>
                                    </div>
                                </div>
                                <div className="bg-amber-50 rounded-xl p-6">
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                                            <span className="text-amber-800 text-xl font-bold">
                                                {riceDetails.milling_recovery}%
                                            </span>
                                        </div>
                                        <h4 className="font-medium text-gray-800">
                                            Milling Recovery
                                        </h4>
                                    </div>
                                </div>
                                <div className="bg-amber-50 rounded-xl p-6">
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                                            <span className="text-amber-800 text-xl font-bold">
                                                {riceDetails.head_rice_recovery}
                                                %
                                            </span>
                                        </div>
                                        <h4 className="font-medium text-gray-800">
                                            Head Rice Recovery
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recommendation */}
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 mr-2 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Recommendation
                            </h3>
                            <p className="text-gray-700">
                                {riceDetails.recommendation}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VarietyDetails;