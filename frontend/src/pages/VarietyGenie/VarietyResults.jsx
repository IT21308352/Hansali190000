import { useLocation, Link } from "react-router-dom";
import { jsPDF } from "jspdf";

const VarietyResult = () => {
  const { state } = useLocation();
  const { district, ageGroup, riceVarieties } = state || {};

  const downloadPDF = () => {
    const doc = new jsPDF();

    const titleFont = "helvetica";
    const titleFontSize = 16;
    const textFontSize = 12;
    const footerFontSize = 10;
    const lineHeight = 10;
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFont(titleFont, "bold");
    doc.setFontSize(titleFontSize);
    doc.text(
      `Rice Variety Suggestions for ${district} - Age Group: ${ageGroup}`,
      margin,
      margin
    );

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(margin, margin + 5, pageWidth - margin, margin + 5);

    let yPosition = margin + 10;

    riceVarieties.forEach((variety, index) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(textFontSize);

      if (index % 2 === 0) {
        doc.setFillColor(244, 244, 244);
      } else {
        doc.setFillColor(220, 220, 220);
      }
      doc.rect(
        margin,
        yPosition - lineHeight + 3,
        pageWidth - 2 * margin,
        lineHeight,
        "F"
      );

      doc.setTextColor(0, 0, 0);
      doc.text(`${index + 1}. ${variety}`, margin, yPosition);

      yPosition += lineHeight;
    });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(footerFontSize);

    doc.save(`rice_varieties_${district}_${ageGroup}.pdf`);
  };

  return (
    <div
      className="flex flex-col items-center py-20 bg-gray-100 px-4"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/4224264/pexels-photo-4224264.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className=""></div>

      <div className="relative z-10 bg-black/80 p-8 rounded-lg shadow-xl max-w-4xl w-full">
        <h2 className="text-2xl text-center font-semibold text-gray-200 mb-6">
          Best-suited Rice Varieties for {district} under {ageGroup}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {riceVarieties?.length > 0 ? (
            riceVarieties.map((variety, index) => {
              const imageUrl = `/${variety}.JPG`;

              return (
                <Link
                  key={index}
                  to={`/variety-details/${variety}`}
                  className="group relative bg-darkgreen/90 hover:bg-darkgreen text-white rounded-lg shadow-md overflow-hidden transition-all"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={variety}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/600x400/e2e8f0/1e293b?text=Rice+Variety";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-center">
                      {variety}
                    </h3>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="w-full text-center text-gray-200 col-span-full py-8">
              No varieties found
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={downloadPDF}
            className="relative overflow-hidden group py-3 px-8 bg-gradient-to-r from-green-900 to-green-700 text-white font-medium rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
          >
            {/* Button shine effect on hover */}
            <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>

            {/* Button content with icon */}
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Download Suggestions for {district}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VarietyResult;
