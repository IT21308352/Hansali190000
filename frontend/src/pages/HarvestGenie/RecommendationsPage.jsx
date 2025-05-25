import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";

const RecommendationsPage = () => {
  const [soilRecommendations, setSoilRecommendations] = useState([]);
  const [pestRecommendations, setPestRecommendations] = useState([]);
  const [waterRecommendations, setWaterRecommendations] = useState([]);
  const [districtRecommendations, setDistrictRecommendations] = useState({});
  const [inputData, setInputData] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    const savedSoilRecommendations = JSON.parse(
      sessionStorage.getItem("soilRecommendations")
    );
    const savedPestRecommendations = JSON.parse(
      sessionStorage.getItem("pestRecommendations")
    );
    const savedWaterRecommendations = JSON.parse(
      sessionStorage.getItem("waterRecommendations")
    );
    const savedDistrictRecommendations = JSON.parse(
      sessionStorage.getItem("districtRecommendations")
    );
    const savedInputData = JSON.parse(sessionStorage.getItem("essentialData"));

    if (savedSoilRecommendations)
      setSoilRecommendations(savedSoilRecommendations);
    if (savedPestRecommendations)
      setPestRecommendations(savedPestRecommendations);
    if (savedWaterRecommendations)
      setWaterRecommendations(savedWaterRecommendations);
    if (savedDistrictRecommendations)
      setDistrictRecommendations(savedDistrictRecommendations);
    if (savedInputData) setInputData(savedInputData);
  }, []);

  const handleClick = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const lineHeight = 7;

    // Helper function to check if we need a new page
    const checkNewPage = (requiredSpace = 20) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage();
        yPosition = 20;
      }
    };

    // Helper function to add wrapped text
    const addWrappedText = (text, x, maxWidth = 170) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, yPosition);
      yPosition += lines.length * lineHeight;
    };

    // Set colors and fonts
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(34, 139, 34);

    // Title
    doc.text("Agricultural Recommendations Report", margin, yPosition);
    yPosition += 15;

    // Add generation date
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      margin,
      yPosition
    );
    yPosition += 20;

    // District and Season Info
    if (inputData.district || inputData.season) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(
        `District: ${inputData.district || "N/A"} | Season: ${
          inputData.season || "N/A"
        }`,
        margin,
        yPosition
      );
      yPosition += 15;
    }

    // Soil Recommendations Section
    if (soilRecommendations.length > 0) {
      checkNewPage(30);

      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(34, 139, 34);
      doc.text("Soil Recommendations", margin, yPosition);
      yPosition += 15;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);

      soilRecommendations.forEach((rec, index) => {
        checkNewPage(25);

        // Add recommendation box
        doc.setFillColor(240, 255, 240);
        doc.rect(margin, yPosition - 5, 170, 20, "F");

        doc.setFont("helvetica", "bold");
        doc.text(
          `${index + 1}. ${rec.nutrient} - Level: ${rec.level}`,
          margin + 5,
          yPosition + 3
        );
        yPosition += 8;

        doc.setFont("helvetica", "normal");
        addWrappedText(rec.detailed_recommendation, margin + 5, 160);
        yPosition += 10;
      });
    }

    // Pest Recommendations Section
    if (pestRecommendations.length > 0) {
      checkNewPage(30);

      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(220, 53, 69);
      doc.text("Pest Management Recommendations", margin, yPosition);
      yPosition += 15;

      if (inputData.pest_severity) {
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `Severity Level: ${inputData.pest_severity}`,
          margin,
          yPosition
        );
        yPosition += 10;
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);

      pestRecommendations.forEach((rec, index) => {
        checkNewPage(20);

        doc.setFillColor(255, 245, 245);
        doc.rect(margin, yPosition - 5, 170, 15, "F");

        doc.text(`${index + 1}.`, margin + 5, yPosition + 3);
        addWrappedText(rec.recommendation, margin + 15, 150);
        yPosition += 5;
      });
    }

    // Water Supply Recommendations Section
    if (waterRecommendations.length > 0) {
      checkNewPage(30);

      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 123, 255);
      doc.text("Water Supply Recommendations", margin, yPosition);
      yPosition += 15;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);

      waterRecommendations.forEach((rec, index) => {
        checkNewPage(40);

        doc.setFillColor(240, 248, 255);
        doc.rect(margin, yPosition - 5, 170, 35, "F");

        doc.setFont("helvetica", "bold");
        doc.text(
          `Water Management Plan ${index + 1}:`,
          margin + 5,
          yPosition + 3
        );
        yPosition += 8;

        doc.setFont("helvetica", "normal");
        doc.text(`• Rainwater: ${rec.rainwater}`, margin + 10, yPosition);
        yPosition += 6;
        doc.text(`• River Water: ${rec.river_water}`, margin + 10, yPosition);
        yPosition += 6;
        doc.text(`• Irrigation: ${rec.irrigation}`, margin + 10, yPosition);
        yPosition += 6;
        doc.text(
          `• Supply Methods: ${rec.supply_methods}`,
          margin + 10,
          yPosition
        );
        yPosition += 10;
      });
    }

    // District-Specific Recommendations
    if (
      districtRecommendations &&
      Object.keys(districtRecommendations).length > 0
    ) {
      checkNewPage(30);

      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 140, 0);
      doc.text(`District-Specific Recommendations`, margin, yPosition);
      yPosition += 15;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);

      let recCount = 1;
      Object.keys(districtRecommendations).forEach((key) => {
        if (key.startsWith("recommendation") && districtRecommendations[key]) {
          checkNewPage(20);

          doc.setFillColor(255, 248, 220);
          doc.rect(margin, yPosition - 5, 170, 15, "F");

          doc.text(`${recCount}.`, margin + 5, yPosition + 3);
          addWrappedText(districtRecommendations[key], margin + 15, 150);
          yPosition += 5;
          recCount++;
        }
      });
    }

    // Add footer with contact info
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${totalPages}`,
        doc.internal.pageSize.width - 40,
        doc.internal.pageSize.height - 10
      );
      doc.text(
        "Agricultural Recommendations System",
        margin,
        doc.internal.pageSize.height - 10
      );
    }

    // Save the PDF
    doc.save(
      `Agricultural_Recommendations_${inputData.district || "Report"}_${
        new Date().toISOString().split("T")[0]
      }.pdf`
    );
  };

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex justify-center items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/035/540/306/small_2x/ai-generated-green-rice-fields-in-the-rainy-season-beautiful-natural-scenery-photo.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center space-y-6 p-6"
        >
          <motion.h1
            className="text-5xl py-5 font-bold tracking-wide text-white"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
          >
            Tailored Agricultural Recommendations
          </motion.h1>
          <motion.p
            className="text-lg py-2 mx-auto w-4/5 text-gray-200/90 leading-relaxed mt-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Unlock insights to improve soil health, manage pests, and optimize
            water usage. Our region-specific recommendations empower you to make
            informed decisions, boosting your harvest for a sustainable future.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="bg-yellow-500 text-black py-4 px-8 rounded-lg text-lg font-semibold transition-all duration-300 transform"
          >
            Get Personalized Recommendations
          </motion.button>
        </motion.div>
      </div>

      <div
        ref={sectionRef}
        className="container mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg"
        id="soil-recommendation"
      >
        {/* Soil Recommendations */}
        <section className="mb-16 p-8 bg-green-50 rounded-xl">
          <h2 className="text-4xl font-semibold text-green-700 text-center mb-6">
            Soil Recommendations
          </h2>
          <div className="space-y-6">
            {soilRecommendations.length > 0 ? (
              soilRecommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-lg bg-white shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-green-700">
                    {rec.nutrient} - {rec.level}
                  </h3>
                  <p className="text-gray-700 mt-2">
                    {rec.detailed_recommendation}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No soil recommendations available.
              </p>
            )}
          </div>
        </section>

        {/* Pest Recommendations */}
        <section className="mb-16 flex flex-col-reverse lg:flex-row items-center gap-10 bg-gray-100 p-10 rounded-xl">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-semibold text-green-700 mb-6">
              Pest Recommendations{" "}
              {inputData.pest_severity && `(${inputData.pest_severity})`}
            </h2>
            {pestRecommendations.length > 0 ? (
              <div className="space-y-4">
                {pestRecommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-red-400"
                  >
                    <p className="text-gray-700">{rec.recommendation}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No pest recommendations available.
              </p>
            )}
          </div>
          <motion.img
            src="https://thumbs.dreamstime.com/b/farmer-spraying-pesticide-rice-field-protect-pest-64897815.jpg"
            alt="Pest Recommendations"
            className="lg:w-1/2 w-full rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
        </section>

        {/* Water Recommendations */}
        <section className="mb-16 lg:flex-row items-center gap-10 bg-gray-100 p-10 rounded-xl">
          <h2 className="text-4xl font-semibold text-green-700 mb-6">
            Water Supply Recommendations
          </h2>
          <div className="">
            <div className="bg-darkblack/0 rounded-lg text-gray-800">
              <p className="mb-6 text-lg">
                <em>Water sources (rainwater, river, irrigation)</em> and{" "}
                <em>supply methods (rainfed, tubewell, canal)</em> impact paddy
                cultivation in Sri Lanka's districts, the following
                comprehensive details can be provided for each district.
              </p>
              <div className="flex flex-col lg:flex-row gap-10 mt-10">
                <motion.img
                  src="https://png.pngtree.com/thumb_back/fw800/background/20240716/pngtree-water-flows-out-of-the-pipes-into-green-rice-fields-image_16007479.jpg"
                  alt="Water Recommendations"
                  className="lg:w-1/2 w-full shadow-2xl rounded-lg"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                />
                <div className="lg:w-1/2 w-full shadow-2xl p-10 bg-blue-50 rounded-xl min-h-[400px] flex-1">
                  <h3 className="text-2xl font-semibold text-blue-700 mb-6">
                    Water Supply Recommendations For You
                  </h3>
                  {waterRecommendations.length > 0 ? (
                    <div className="space-y-4">
                      {waterRecommendations.map((rec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-gray-800 bg-white rounded-lg p-4 shadow-sm border border-blue-200"
                        >
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-4">
                              <span className="font-semibold text-blue-600">
                                Rainwater:
                              </span>
                              <span className="flex-1">{rec.rainwater}</span>
                            </div>
                            <div className="flex flex-wrap gap-4">
                              <span className="font-semibold text-blue-600">
                                River Water:
                              </span>
                              <span className="flex-1">{rec.river_water}</span>
                            </div>
                            <div className="flex flex-wrap gap-4">
                              <span className="font-semibold text-blue-600">
                                Irrigation:
                              </span>
                              <span className="flex-1">{rec.irrigation}</span>
                            </div>
                            <div className="flex flex-wrap gap-4">
                              <span className="font-semibold text-blue-600">
                                Supply Methods:
                              </span>
                              <span className="flex-1">
                                {rec.supply_methods}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">
                      No water recommendations available.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10 mt-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-2xl p-6"
                >
                  <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">
                    💧 Impact of Water Sources
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-green-600 mb-2">
                        Rainwater:
                      </h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Relies on seasonal rainfall patterns</li>
                        <li>
                          • Requires good water-holding soil (clayey or loamy)
                        </li>
                        <li>
                          • May lead to water shortages during dry spells (Yala)
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-blue-600 mb-2">
                        River Water:
                      </h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Provides consistent and reliable water source</li>
                        <li>• Best suited for regions with perennial rivers</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-purple-600 mb-2">
                        Irrigation Supply:
                      </h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Offers flexibility in water management</li>
                        <li>• Includes canals, tubewells, and tanks</li>
                        <li>• Reduces dependency on rainfall</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-2xl p-6"
                >
                  <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">
                    🚰 Impact of Supply Methods
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-green-600 mb-2">
                        Rainfed:
                      </h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Highly dependent on monsoon timing</li>
                        <li>• Suited for Maha season with adequate rainfall</li>
                        <li>• Risk of crop failure during erratic rains</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-orange-600 mb-2">
                        Tubewell:
                      </h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Provides controlled water supply</li>
                        <li>• Effective for water-scarce districts</li>
                        <li>• May lead to soil salinity if overused</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-teal-600 mb-2">Canal:</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Efficient for large-scale irrigation</li>
                        <li>• Requires proper maintenance</li>
                        <li>• Works best with established infrastructure</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* District Recommendations */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-green-700 text-center mb-6">
            District Recommendations for {inputData.district || "Your Area"} (
            {inputData.season || "Current Season"})
          </h2>
          <div className="space-y-4">
            {districtRecommendations &&
            Object.keys(districtRecommendations).length > 0 ? (
              Object.keys(districtRecommendations).map(
                (key, index) =>
                  key.startsWith("recommendation") &&
                  districtRecommendations[key] && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg shadow-md border-l-4 border-orange-400 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start">
                        <span className="bg-orange-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                          {index -1}
                        </span>
                        <p className="text-gray-800 leading-relaxed">
                          {districtRecommendations[key]}
                        </p>
                      </div>
                    </motion.div>
                  )
              )
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No district recommendations available.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* PDF Download Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-gradient-to-r from-green-100 to-emerald-100 flex flex-col items-center"
      >
        <h3 className="text-2xl font-bold text-green-800 mb-4">
          Download Your Complete Report
        </h3>
        <p className="text-green-700 mb-6 text-center max-w-2xl">
          Get a comprehensive PDF report with all your personalized agricultural
          recommendations for easy sharing and offline reference.
        </p>
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={generatePDF}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download PDF Report
        </motion.button>
      </motion.div>

      <div className="flex justify-end bg-green-50 py-6">
        <motion.h2
          whileHover={{ scale: 1.05 }}
          className="text-green-700 text-xl font-semibold pe-10 hover:text-green-800 transition-colors"
        >
          <a
            href="/new-farmer"
            className="underline decoration-2 underline-offset-4"
          >
            Are you a New Farmer? Get Started Here →
          </a>
        </motion.h2>
      </div>
    </div>
  );
};

export default RecommendationsPage;
 