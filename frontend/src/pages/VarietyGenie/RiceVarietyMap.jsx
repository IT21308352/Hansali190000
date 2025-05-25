import React, { useState, useEffect, useRef } from "react";
import { parse, stringify } from "svgson";
import SriLankaMap from "../../assets/lk.svg";

const hoverTexts = {
  LK53: "Trincomalee - ත්‍රිකුණාමළය",
  LK45: "Mullaitivu - මුලතිව්",
  LK41: "Jaffna - යාපනය",
  LK42: "Kilinochchi - කිලිනොච්චිය",
  LK43: "Mannar - මන්නාරම",
  LK62: "Puttalam - පුත්තලම",
  LK12: "Gampaha - ගම්පහ",
  LK11: "Colombo - කොළඹ",
  LK13: "Kalutara - කළුතර",
  LK31: "Galle - ගාල්ල",
  LK32: "Matara - මාතර",
  LK33: "Hambantota - හම්බන්තොට",
  LK52: "Ampara - අම්පාර",
  LK51: "Batticaloa - මඩකලපුව",
  LK91: "Ratnapura - රත්නපුර",
  LK82: "Monaragala - මොනරාගල",
  LK92: "Kegalle - කෑගල්ල",
  LK81: "Badulla - බදුල්ල",
  LK22: "Matale - මාතලේ",
  LK72: "Polonnaruwa - පොළොන්නරුව",
  LK61: "Kurunegala - කුරුණෑගල",
  LK71: "Anuradhapura - අනුරාධපුර",
  LK23: "Nuwara Eliya - නුවරඑලිය",
  LK44: "Vavuniya - වව්නියාව",
  LK21: "Kandy - මහනුවර",
};

// Color scheme for different rice cultivation zones
const districtColors = {
  // Wet Zone (Green shades)
  LK11: "#4CAF50", // Colombo
  LK12: "#66BB6A", // Gampaha
  LK13: "#81C784", // Kalutara
  LK21: "#A5D6A7", // Kandy
  LK22: "#C8E6C9", // Matale
  LK23: "#E8F5E9", // Nuwara Eliya
  LK31: "#388E3C", // Galle
  LK32: "#43A047", // Matara
  LK33: "#2E7D32", // Hambantota
  LK91: "#689F38", // Ratnapura
  LK92: "#7CB342", // Kegalle
  LK81: "#558B2F", // Badulla
  LK82: "#33691E", // Monaragala

  // Dry Zone (Yellow/Orange shades)
  LK61: "#FFA000", // Kurunegala
  LK62: "#FFB300", // Puttalam
  LK71: "#FF8F00", // Anuradhapura
  LK72: "#FFA726", // Polonnaruwa
  LK41: "#FB8C00", // Jaffna
  LK42: "#F57C00", // Kilinochchi
  LK43: "#EF6C00", // Mannar
  LK44: "#E65100", // Vavuniya
  LK45: "#FF9800", // Mulativ
  LK51: "#FFB74D", // Batticaloa
  LK52: "#FFA000", // Ampara
  LK53: "#FF8F00", // Trincomalee
};

const RiceVarietyMap = () => {
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
    const svgWithEvents = addEventHandlers(svgObj);
    const svgString = stringify(svgWithEvents);
    setSvgContent(svgString);

    setTimeout(() => {
      document.querySelectorAll("path").forEach((path) => {
        path.addEventListener("mouseenter", () => handleMouseEnter(path.id));
        path.addEventListener("mouseleave", handleMouseLeave);
        // Set initial colors based on our districtColors
        if (districtColors[path.id]) {
          path.style.fill = districtColors[path.id];
        }
      });
    }, 100);
  };

  const addEventHandlers = (svgObj) => {
    svgObj.children.forEach((node) => {
      if (node.name === "path" && node.attributes.id) {
        node.attributes.onMouseEnter = `handleMouseEnter('${node.attributes.id}')`;
        node.attributes.onMouseLeave = "handleMouseLeave()";
      }
    });
    return svgObj;
  };

  const fetchRiceVarieties = async (districtName) => {
    const response = await fetch(
      `http://127.0.0.1:8000/rice-details/rice-varieties/${districtName}`
    );
    const data = await response.json();
    return data.join(", ");
  };

  const handleMouseEnter = async (districtId) => {
    setHoveredDistrict(districtId);
    const districtElement = document.getElementById(districtId);
    if (districtElement) {
      districtElement.style.fill = "#6D4C41"; // Dark brown hover color
      districtElement.style.transition = "fill 0.3s ease"; // Smooth transition
    }

    const districtName = hoverTexts[districtId].split(" -")[0];
    const varieties = await fetchRiceVarieties(districtName);
    setHoverText(`${hoverTexts[districtId]} | Rice Varieties: ${varieties}`);
  };

  const handleMouseLeave = () => {
    setHoveredDistrict(null);
    setHoverText("");
    document.querySelectorAll("path").forEach((path) => {
      if (districtColors[path.id]) {
        path.style.fill = districtColors[path.id]; // Revert to original color
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
            Sri Lanka Rice Variety Map
          </h1>
          <p className="text-center text-green-600 mt-2">
            Explore rice varieties across Sri Lankan districts
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
                  {hoverTexts[hoveredDistrict]}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {hoverText.split("|")[1]}
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
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 bg-green-500 mr-2"></div>
                <span className="text-sm">Wet Zone Districts</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-amber-500 mr-2"></div>
                <span className="text-sm">Dry Zone Districts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Information Panel */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-white/30">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Rice Varieties of Sri Lanka
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              Sri Lanka's diverse climate zones support a wide range of rice
              varieties, each adapted to local conditions and cultural
              preferences.
            </p>

            <div className="mt-6 space-y-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-700 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Wet Zone Varieties
                </h3>
                <p className="mt-2 text-sm">
                  Includes varieties like Samba, Suwandel, and Kalu Heenati.
                  Grown in areas with high rainfall like Colombo, Galle, and
                  Kandy.
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg">
                <h3 className="font-semibold text-amber-700 flex items-center">
                  <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                  Dry Zone Varieties
                </h3>
                <p className="mt-2 text-sm">
                  Includes varieties like Nadu, Pachchaperumal, and BG
                  varieties. Grown in areas like Anuradhapura, Polonnaruwa, and
                  Jaffna.
                </p>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-700 flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  Red Rice Varieties
                </h3>
                <p className="mt-2 text-sm">
                  Cultivated in intermediate zones like Ratnapura and Kegalle.
                  Highly nutritious with a nutty flavor and chewy texture.
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
                  <span>Hover over districts to view local varieties</span>
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
                  <span>Color-coded by climate zones</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiceVarietyMap;