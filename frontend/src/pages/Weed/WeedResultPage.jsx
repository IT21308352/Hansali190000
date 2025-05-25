import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const commonNames = {
  "W_CL_03_Commelina benghalensis": "Commelina benghalensis - Benghal Dayflower",
  "W_CL_06_Ipomoea aquatic": "Ipomoea aquatic - Water Spinach",
  "W_CL_07_Marsilea minuta": "Marsilea minuta - Small Water Clover",
  "W_CL_09_Paspalum scrobiculatum": "Paspalum scrobiculatum - Kodo Millet",
  "W_CL_10_Pteris vittata": "Pteris vittata - Chinese Brake Fern",
  "W_CL_11_Synedrella nodiflora": "Synedrella nodiflora - Cinderella Weed",
};

const weedImages = {
  "W_CL_03_Commelina benghalensis": "/images/weeds/commelina_benghalensis.jpg",
  "W_CL_06_Ipomoea aquatic": "/images/weeds/ipomoea_aquatic.jpeg",
  "W_CL_07_Marsilea minuta": "/images/weeds/marsilea_minuta.jpg",
  "W_CL_09_Paspalum scrobiculatum": "/images/weeds/paspalum_scrobiculatum.jpeg",
  "W_CL_10_Pteris vittata": "/images/weeds/pteris_vittata.jpg",
  "W_CL_11_Synedrella nodiflora": "/images/weeds/synedrella_nodiflora.jpg",
};

const WeedResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result ?? "No result available";
  const mitigation = location.state?.mitigation ?? {};

  const displayResult = commonNames[result] || result;
  const imageUrl = weedImages[result] || "/images/weeds/synedrella_nodiflora.jpg";

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center relative px-6"
      style={{
        backgroundImage:
          "url('https://lh3.googleusercontent.com/HQ9WPPhQdBRcJ3jh-cQiYeNXFxLjV3SSERuc5Qf81tDOx37dWD4JRzDGuIO45QE8j6hy98aOHWVMfcxT2N-EgjsHuLSq5g7uvGIQ2pr1R1D0RScdB_hPeEiR9ABpvaezlxLDa2xwBuYs3H_lP83S5iQ')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative bg-black bg-opacity-80 backdrop-blur-lg my-16 p-8 rounded-2xl shadow-lg text-center w-4/5 md:w-4/5">
        <h2 className="text-2xl font-bold text-white mb-4">Prediction Result</h2>

        <h3
          className="text-lg font-semibold text-green-400"
          style={{ fontSize: 30, fontWeight: 600 }}
        >
          {displayResult}
        </h3>

        <img
          src={imageUrl}
          alt={displayResult}
          className="w-64 h-64 rounded-lg shadow-md my-6 object-cover"
          style={{ marginInline: "auto" }}
        />

        <button
  onClick={() =>
    navigate("/weed-detection/mitigation", {
      state: {
        mitigation,
        result: displayResult,
      },
    })
  }
  className="mt-6 bg-yellow-500 hover:bg-yellow-600 border-none text-white text-sm font-medium py-1.5 px-4 rounded-md transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
>
  View Mitigation Strategies
</button>

<button
  onClick={() =>
    navigate("/weed-detection/weed-info", {
      state: {
        result,
        displayResult,
        imageUrl,
      },
    })
  }
  className="mt-4 bg-blue-500 hover:bg-blue-600 border-none text-white text-sm font-medium py-1.5 px-4 rounded-md transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
>
  View Weed Info
</button>

<button
  onClick={() => navigate("/weed-detection")}
  className="mt-4 bg-green-600 hover:bg-green-700 text-white border-none text-sm font-medium py-1.5 px-4 rounded-md transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
>
  Upload Another Image
</button>

      </div>
    </div>
  );
};

export default WeedResultPage;


// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const commonNames = {
//     "W_CL_03_Commelina benghalensis": "Commelina benghalensis - Benghal Dayflower",
//     "W_CL_06_Ipomoea aquatic": "Ipomoea aquatic - Water Spinach",
//     "W_CL_07_Marsilea minuta": "Marsilea minuta - Small Water Clover",
//     "W_CL_09_Paspalum scrobiculatum": "Paspalum scrobiculatum - Kodo Millet",
//     "W_CL_10_Pteris vittata": "Pteris vittata - Chinese Brake Fern",
//     "W_CL_11_Synedrella nodiflora": "Synedrella nodiflora - Cinderella Weed"
// };

// const weedImages = {
//     "W_CL_03_Commelina benghalensis": "/images/weeds/commelina_benghalensis.jpg",
//     "W_CL_06_Ipomoea aquatic": "/images/weeds/ipomoea_aquatic.jpeg",
//     "W_CL_07_Marsilea minuta": "/images/weeds/marsilea_minuta.jpg",
//     "W_CL_09_Paspalum scrobiculatum": "/images/weeds/paspalum_scrobiculatum.jpeg",
//     "W_CL_10_Pteris vittata": "/images/weeds/pteris_vittata.jpg",
//     "W_CL_11_Synedrella nodiflora": "/images/weeds/synedrella_nodiflora.jpg"
// };


// const WeedResultPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const result = location.state?.result ?? "No result available";
//     const mitigation = location.state?.mitigation ?? {};

//     console.log(" Debug: Result Page Received:", location.state);

        
//         const displayResult = commonNames[result] || result;
//         const imageUrl = weedImages[result] || "/images/weeds/synedrella_nodiflora.jpg";



//     return (
//         <div className="min-h-screen flex flex-col justify-center items-center relative px-6"
//             style={{
//                 backgroundImage: "url('https://lh3.googleusercontent.com/HQ9WPPhQdBRcJ3jh-cQiYeNXFxLjV3SSERuc5Qf81tDOx37dWD4JRzDGuIO45QE8j6hy98aOHWVMfcxT2N-EgjsHuLSq5g7uvGIQ2pr1R1D0RScdB_hPeEiR9ABpvaezlxLDa2xwBuYs3H_lP83S5iQ')",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 fontFamily: "Poppins, sans-serif",
//             }}
//         >
//             <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//             <div className="relative bg-black bg-opacity-80 backdrop-blur-lg my-16 p-8 rounded-2xl shadow-lg text-center w-4/5 md:w-4/5">
//                 <h2 className="text-2xl font-bold text-white mb-4">Prediction Result</h2>

                
//                 <h3 className="text-lg font-semibold text-green-400" 
//                 style={{
//                         fontSize: 30,
//                         fontWeight: 600, }}>{displayResult}</h3>


//                 <img src={imageUrl} alt={displayResult} className="w-64 h-64 rounded-lg shadow-md my-6 object-cover" 
//                 style={{
//                     marginInline:"auto" }}/>

//                 <h3 className="text-lg font-semibold text-yellow-400 mt-4">Mitigation Strategies:</h3>
//                 <div className="text-white text-left mt-16 md:w-4/5" style={{
//                     marginInline:"auto" }}>
//                     {Object.keys(mitigation).length > 0 ? (
//                         Object.entries(mitigation).map(([category, strategies], index) => (
//                             <div key={index} className="mt-12">
//                                 <h4 className="text-md font-semibold text-blue-300">{category}:</h4>
//                                 <ul className="list-disc list-inside ml-4">
//                                     {Array.isArray(strategies) ? (
//                                         strategies.map((item, idx) => (
//                                             <li key={idx} className="text-gray-300">{item}</li>
//                                         ))
//                                     ) : (
//                                         <li className="text-gray-300">{strategies}</li>
//                                     )}
//                                 </ul>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-300">No mitigation strategy available.</p>
//                     )}
//                 </div>

//                 <button
//                     onClick={() => navigate("/weed-detection")}
//                     className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md" 
//                     style={{color: "white",
//                         fontSize: 16,
//                         fontFamily: "Poppins, sans-serif",
//                         fontWeight: 600,
//                         border: "none" }}>
//                     Upload Another Image
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default WeedResultPage;
