import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import weedDetails from "../../data/weedDetails.json";

const WeedPlantInfo = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const result = location.state?.result;
    const displayResult = location.state?.displayResult || result;
    const defaultImage = location.state?.imageUrl;

    const weed = weedDetails[result];
    const description = weed?.details || "No detailed information available for this weed.";
    const commonName = weed?.commonName || "Unknown weed";
    const images = weed?.images || (defaultImage ? [defaultImage] : []);

    return (
        <div className="min-h-screen-50 flex flex-col items-center justify-center px-6 py-12 font-poppins"
            style={{
                backgroundImage:
                    "url('https://plus.unsplash.com/premium_photo-1664910307279-7f8e551e1e1d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmljZSUyMGZpZWxkfGVufDB8fDB8fHww')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "calc(100vh - 104px)",
            }}>
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full md:w-3/5">
                <h1 className="text-2xl font-bold text-green-700 mb-1 text-center">
                    {commonName}
                </h1>
                <h2 className="text-md text-gray-500 mb-4 text-center italic">{displayResult}</h2>

                {/* Description */}
                <p className="text-gray-700 text-md text-justify mb-8">{description}</p>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${commonName} ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                    ))}
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-6 bg-green-600 hover:bg-green-700 text-white text-sm py-1.5 px-4 rounded-md transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        ← Back to Result
                    </button>

                </div>
            </div>
        </div>
    );
};

export default WeedPlantInfo;



// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const weedDescriptions = {
//   "W_CL_03_Commelina benghalensis": "A fast-growing, invasive weed commonly found in moist environments. Known for its trailing stems and bluish flowers.",
//   "W_CL_06_Ipomoea aquatic": "Also called Water Spinach, it thrives in aquatic habitats and can spread rapidly, choking water bodies.",
//   "W_CL_07_Marsilea minuta": "An aquatic fern resembling a four-leaf clover, it often invades rice paddies and wetlands.",
//   "W_CL_09_Paspalum scrobiculatum": "Also called Kodo Millet, it is sometimes cultivated but can become weedy in unmanaged fields.",
//   "W_CL_10_Pteris vittata": "A fern species known for arsenic accumulation, it can grow in contaminated soils.",
//   "W_CL_11_Synedrella nodiflora": "Known as Cinderella Weed, this small plant spreads quickly and thrives in disturbed areas."
// };

// const WeedPlantInfo = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const result = location.state?.result;
//   const displayResult = location.state?.displayResult || result;
//   const imageUrl = location.state?.imageUrl;

//   const description = weedDescriptions[result] || "No description available for this weed.";

//   return (
//     <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-6 py-12 font-poppins">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full md:w-3/5">
//         <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
//           {displayResult}
//         </h1>

//         <img
//           src={imageUrl}
//           alt={displayResult}
//           className="w-64 h-64 mx-auto object-cover rounded-lg shadow-md mb-6"
//         />

//         <p className="text-gray-700 text-md text-justify">{description}</p>

//         <div className="flex justify-center gap-4 mt-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-md"
//           >
//             Back to Result
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeedPlantInfo;
