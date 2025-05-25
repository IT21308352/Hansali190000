import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { jsPDF } from "jspdf";

const PaddyCropCalender = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const cardItems = [
    {
      text: "1. Dry & Intermediate Zone (Rainfed)",
      image: "/images/crop-calender-img1.jpg",
    },
    {
      text: "2. Dry & Intermediate Zone (Irrigated)",
      image: "/images/crop-calender-img2.jpg",
    },
    { text: "3. Wet Zone", image: "/images/crop-calender-img3.jpg" },
    {
      text: "4. Integrated Pest Control in Paddy Cultivation",
      image: "/images/crop-calender-img4.jpg",
    },
  ];

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);

    // Scroll to the active dropdown smoothly
    if (activeDropdown !== index) {
      setTimeout(() => {
        const dropdownElement = document.getElementById(`dropdown-${index}`);
        dropdownElement?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  };

  const downloadPDF = (imageSrc, text) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      doc.setFontSize(16);
      doc.text(text, 10, 10);

      const imgWidth = pageWidth - 20;
      const imgHeight = (img.height / img.width) * imgWidth;

      doc.addImage(img, "JPEG", 10, 20, imgWidth, imgHeight);
      doc.save(`${text.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
      <h2 className="text-2xl text-center font-semibold p-5 my-10 bg-darkgreen rounded-2xl shadow-2xl text-white text-shadow">
        Paddy Crop Calendar
      </h2>
      {cardItems.map((card, index) => (
        <div
          key={index}
          id={`dropdown-${index}`}
          className="border rounded-lg shadow-lg bg-white transition-all duration-300"
        >
          <button
            className="w-full flex justify-between text-center items-center bg-darkgreen/80 text-white py-4 px-8 text-xl font-bold shadow-md rounded-lg hover:bg-green-700 focus:outline-none"
            onClick={() => handleDropdownClick(index)}
          >
            <span>{card.text}</span>
            {activeDropdown === index ? (
              <FaChevronUp className="text-white text-2xl" />
            ) : (
              <FaChevronDown className="text-white text-2xl" />
            )}
          </button>
          {activeDropdown === index && (
            <div className="p-4">
              <div className="w-full max-w-[calc(100%-5rem)] mx-auto mt-4">
                <img
                  src={card.image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => downloadPDF(card.image, card.text)}
                  className="py-2 px-6 bg-darkgreen text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
                >
                  Download PDF
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaddyCropCalender;
