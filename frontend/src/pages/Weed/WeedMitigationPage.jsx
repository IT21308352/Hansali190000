import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const WeedMitigationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const mitigation = location.state?.mitigation ?? {};
    const result = location.state?.result ?? "Unknown Weed";

    const categories = Object.keys(mitigation);
    const [activeTab, setActiveTab] = useState(categories[0] || "");

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-6 font-poppins"
            style={{
                backgroundImage:
                    "url('https://plus.unsplash.com/premium_photo-1664910307279-7f8e551e1e1d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmljZSUyMGZpZWxkfGVufDB8fDB8fHww')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "calc(100vh - 104px)",
            }}>
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full md:w-2/3 lg:w-1/2">
                <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
                    Mitigation Strategies for <br />
                    <span className="text-green-900">{result}</span>
                </h2>

                {categories.length > 0 ? (
                    <>
                        {/* Tabs */}
                        <div className="flex flex-wrap gap-2 mb-4 border-b pb-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveTab(category)}
                                    className={`py-1 px-4 rounded-full text-sm font-medium transition ${activeTab === category
                                            ? "bg-green-600 text-white"
                                            : "bg-green-100 text-green-800 hover:bg-green-200"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Content for Active Tab */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">{activeTab}</h4>
                            <ul className="list-disc list-inside ml-4 text-gray-700">
                                {Array.isArray(mitigation[activeTab]) ? (
                                    mitigation[activeTab].map((item, idx) => <li key={idx}>{item}</li>)
                                ) : (
                                    <li>{mitigation[activeTab]}</li>
                                )}
                            </ul>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-600">No mitigation strategy available.</p>
                )}

                <button
                    onClick={() => navigate(-1)}
                    className="mt-6 bg-green-600 hover:bg-green-700 text-white text-sm py-1.5 px-4 rounded-md transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    ← Back to Result
                </button>

            </div>
        </div>
    );
};

export default WeedMitigationPage;




// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const WeedMitigationPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const mitigation = location.state?.mitigation ?? {};
//   const result = location.state?.result ?? "Unknown Weed";

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-br from-green-100 to-green-300 font-poppins">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full md:w-2/3 lg:w-1/2">
//         <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
//           Mitigation Strategies for <br />
//           <span className="text-green-900">{result}</span>
//         </h2>

//         {Object.keys(mitigation).length > 0 ? (
//           Object.entries(mitigation).map(([category, strategies], index) => (
//             <div key={index} className="mb-6">
//               <h4 className="text-lg font-semibold text-gray-800">{category}</h4>
//               <ul className="list-disc list-inside ml-4 text-gray-700">
//                 {Array.isArray(strategies) ? (
//                   strategies.map((item, idx) => <li key={idx}>{item}</li>)
//                 ) : (
//                   <li>{strategies}</li>
//                 )}
//               </ul>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600">No mitigation strategy available.</p>
//         )}

//         <button
//           onClick={() => navigate(-1)}
//           className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full transition shadow-md"
//         >
//           Back to Result
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WeedMitigationPage;


// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const WeedMitigationPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { weed_class, mitigation } = location.state || {};

//     if (!weed_class) {
//         return <p>No prediction data available. Please upload an image first.</p>;
//     }

//     return (
//         <div className="container">
//             <h2>Weed Identification Results</h2>
//             <p><strong>Predicted Weed Class:</strong> {weed_class}</p>
//             <p><strong>Mitigation Strategy:</strong> {mitigation}</p>
//             <button onClick={() => navigate("/")}>Upload Another Image</button>
//         </div>
//     );
// };

// export default WeedMitigationPage;
