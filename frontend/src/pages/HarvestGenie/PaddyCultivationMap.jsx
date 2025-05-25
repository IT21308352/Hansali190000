import React, { useState, useEffect, useRef } from "react";
import { parse, stringify } from "svgson";
import SriLankaMap from "../../assets/lk.svg";

const districtPaddyData = {
  LK53: { name: "Trincomalee - ත්‍රිකුණාමළය", harvest: 4500 },
  LK45: { name: "Mulativ - මුලතිව්", harvest: 4700 },
  LK41: { name: "Jaffna - යාපනය", harvest: 4300 },
  LK42: { name: "Kilinochchi - කිලිනොච්චිය", harvest: 4800 },
  LK43: { name: "Mannar - මන්නාරම", harvest: 4600 },
  LK62: { name: "Puttalam - පුත්තලම", harvest: 4400 },
  LK12: { name: "Gampaha - ගම්පහ", harvest: 5000 },
  LK11: { name: "Colombo - කොළඹ", harvest: 5200 },
  LK13: { name: "Kalutara - කළුතර", harvest: 5100 },
  LK31: { name: "Galle - ගාල්ල", harvest: 5300 },
  LK32: { name: "Matara - මාතර", harvest: 5400 },
  LK33: { name: "Hambantota - හම්බන්තොට", harvest: 5500 },
  LK52: { name: "Ampara - අම්පාර", harvest: 5600 },
  LK51: { name: "Batticaloa - මඩකලපුව", harvest: 5700 },
  LK91: { name: "Ratnapura - රත්නපුර", harvest: 5800 },
  LK82: { name: "Monaragala - මොනරාගල", harvest: 5900 },
  LK92: { name: "Kegalle - කෑගල්ල", harvest: 6000 },
  LK81: { name: "Badulla - බදුල්ල", harvest: 6100 },
  LK22: { name: "Matale - මාතලේ", harvest: 6200 },
  LK72: { name: "Polonnaruwa - පොළොන්නරුව", harvest: 6300 },
  LK61: { name: "Kurunegala - කුරුණෑගල", harvest: 6400 },
  LK71: { name: "Anuradhapura - අනුරාධපුර", harvest: 6500 },
  LK23: { name: "Nuwara Eliya - නුවරඑලිය", harvest: 6600 },
  LK44: { name: "Vavuniya - වව්නියාව", harvest: 6700 },
  LK21: { name: "Kandy - මහනුවර", harvest: 6800 },
};

// Dark-themed color scale based on harvest values
const getDistrictColor = (harvest) => {
  const minHarvest = 4300;
  const maxHarvest = 6800;
  const ratio = (harvest - minHarvest) / (maxHarvest - minHarvest);
  
  // Dark blue to dark green gradient
  const darkColors = [
    "#0d1b2a",   // Dark navy
    "#1b263b",
    "#2a3a5a",
    "#3a4d7a",
    "#4a619b",
    "#5b76bd",
    "#6d8cdf",
    "#80a3ff",
    "#94baff",
    "#a9d2ff",
    "#bfeaff",
    "#d6ffff",
    "#0d2b0d",   // Dark green
    "#1a3a1a",
    "#274927",
    "#355935",
    "#446944",
    "#537953",
    "#638a63",
    "#739b73",
    "#84ad84",
    "#95bf95",
    "#a7d1a7",
    "#b9e3b9",
    "#ccf5cc"
  ];
  
  const index = Math.floor(ratio * (darkColors.length - 1));
  return darkColors[index];
};

const PaddyCultivationMap = () => {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [hoverText, setHoverText] = useState("");
  const [svgContent, setSvgContent] = useState("");
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch(SriLankaMap)
      .then((response) => response.text())
      .then((data) => {
        parseSVG(data);
      });
  }, []);

  const parseSVG = async (svgText) => {
    const svgObj = await parse(svgText);
    const svgWithEvents = addEventHandlersAndColors(svgObj);
    const svgString = stringify(svgWithEvents);
    setSvgContent(svgString);

    setTimeout(() => {
      document.querySelectorAll("path").forEach((path) => {
        path.addEventListener("mouseenter", () => handleMouseEnter(path.id));
        path.addEventListener("mouseleave", handleMouseLeave);
      });
    }, 100);
  };

  const addEventHandlersAndColors = (svgObj) => {
    svgObj.children.forEach((node) => {
      if (node.name === "path" && node.attributes.id) {
        const districtId = node.attributes.id;
        const districtData = districtPaddyData[districtId];
        
        // Add event handlers
        node.attributes.onMouseEnter = `handleMouseEnter('${districtId}')`;
        node.attributes.onMouseLeave = "handleMouseLeave()";
        
        // Set initial color based on harvest data
        if (districtData) {
          node.attributes.fill = getDistrictColor(districtData.harvest);
          node.attributes.stroke = "#1a1a1a"; // Dark border
          node.attributes["stroke-width"] = "0.5";
        }
      }
    });
    return svgObj;
  };

  const handleMouseEnter = async (districtId) => {
    setHoveredDistrict(districtId);
    const districtData = districtPaddyData[districtId];
    if (districtData) {
      setHoverText(`${districtData.name} - Harvest: ${districtData.harvest}kg`);
    }
    const districtElement = document.getElementById(districtId);
    if (districtElement) {
      districtElement.style.fill = "#6D4C41"; // Changed to dark brown hover color to match second map
      districtElement.style.stroke = "#ffffff"; // White border on hover
      districtElement.style["stroke-width"] = "1.5";
    }
  };

  const handleMouseLeave = () => {
    setHoveredDistrict(null);
    setHoverText("");
    document.querySelectorAll("path").forEach((path) => {
      const districtId = path.id;
      const districtData = districtPaddyData[districtId];
      if (districtData) {
        path.style.fill = getDistrictColor(districtData.harvest);
        path.style.stroke = "#1a1a1a";
        path.style["stroke-width"] = "0.5";
      }
    });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prevScale) => Math.min(prevScale + 0.1, 2));
    } else {
      setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
    }
  };

  useEffect(() => {
    const handleScroll = (e) => {
      if (containerRef.current && containerRef.current.contains(e.target)) {
        e.preventDefault();
      }
    };
    document.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 text-center">
            Paddy Cultivation in Sri Lanka
          </h1>
          <p className="text-center text-green-600 mt-2">
            Explore paddy harvest data across Sri Lankan districts
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-10 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Map Container */}
        <div className="lg:col-span-2 bg-white/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-white/30">
          <div
            className="relative h-[700px] w-full overflow-hidden"
            ref={containerRef}
            onWheel={handleWheel}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: svgContent }}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "center center",
              }}
            />

            {/* Hover Tooltip */}
            {hoveredDistrict && (
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-green-200 max-w-xs">
                <h3 className="font-bold text-green-800">
                  {districtPaddyData[hoveredDistrict]?.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Harvest: {districtPaddyData[hoveredDistrict]?.harvest}kg
                </p>
              </div>
            )}

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
              <button
                onClick={() => setScale((prev) => Math.min(prev + 0.2, 2))}
                className="bg-white/80 hover:bg-white text-green-700 p-2 rounded-full shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() => setScale((prev) => Math.max(prev - 0.2, 0.5))}
                className="bg-white/80 hover:bg-white text-green-700 p-2 rounded-full shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Harvest Legend</h4>
              <div className="flex items-center mb-1">
                <div className="w-4 h-4 bg-[#0d1b2a] mr-2"></div>
                <span className="text-sm">4,300kg (Lowest)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#ccf5cc] mr-2"></div>
                <span className="text-sm">6,800kg (Highest)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Information Panel */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-white/30">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Paddy Cultivation in Sri Lanka
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              Sri Lanka is renowned for its rich paddy cultivation, which is
              deeply ingrained in the country's agricultural heritage. The
              island's diverse climate and fertile soils make it an ideal
              location for rice farming.
            </p>

            <div className="mt-6 space-y-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-700">
                  Climate and Soil
                </h3>
                <p className="mt-2 text-sm">
                  The tropical climate of Sri Lanka, with its varied rainfall and
                  temperature, supports paddy cultivation. The country has both
                  dry and wet zones, each offering unique conditions for rice
                  farming.
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg">
                <h3 className="font-semibold text-amber-700">
                  Irrigation Systems
                </h3>
                <p className="mt-2 text-sm">
                  Sri Lanka's farmers rely heavily on both traditional and modern
                  irrigation systems. The dry zone has an extensive network of
                  tanks, canals, and reservoirs that supply water to paddy fields.
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-700">
                  Farming Techniques
                </h3>
                <p className="mt-2 text-sm">
                  Paddy cultivation in Sri Lanka blends both traditional and
                  modern farming practices. Many farmers are turning to organic
                  farming techniques, focusing on sustainable practices.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium text-green-800 mb-2">Key Features:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <svg
                    className="h-4 w-4 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Hover over districts to view harvest data</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-4 w-4 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Scroll to zoom the map</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-4 w-4 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Color gradient shows harvest amounts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaddyCultivationMap;