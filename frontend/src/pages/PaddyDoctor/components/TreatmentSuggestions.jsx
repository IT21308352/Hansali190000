// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FileDown, ArrowLeft, Info, AlertTriangle, Check, X, Loader2 } from 'lucide-react';

// const TreatmentSuggestions = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { treatment, disease, confidence, imageFile, prediction_probabilities, recommendations } = location.state || {};
//   const [downloading, setDownloading] = useState(false);
//   const [downloadStatus, setDownloadStatus] = useState(null); // 'success', 'error', or null

//   // Handle back button
//   const handleBack = () => {
//     navigate(-1);
//   };

//   // Example of handleDownloadGuide function
//   const handleDownloadGuide = async () => {
//     try {
//       setDownloading(true);
//       setDownloadStatus(null);
      
//       const predictedClass = disease;
//       const suggestions = recommendations;
//       const predictions = prediction_probabilities;
//       const symptoms = treatment.symptoms;
//       const brandTreatments = treatment.brandTreatments;
//       const formData = new FormData();

//       // Append the image file to FormData
//       if (imageFile) {
//         formData.append("file", imageFile);
//       }

//       // Append other data to FormData
//       if (predictedClass) {
//         formData.append("predicted_class", predictedClass);
//       }
//       if (predictions) {
//         formData.append("predictions", JSON.stringify(predictions));
//       }
//       if (suggestions) {
//         formData.append("suggestions", JSON.stringify(suggestions));
//       }
//       // Add symptoms and brandTreatments data
//       if (symptoms) {
//         formData.append("symptoms", symptoms);
//       }
//       if (brandTreatments) {
//         formData.append("brand_treatments", JSON.stringify(brandTreatments));
//       }
        
//       const response = await fetch('http://127.0.0.1:8000/api/download_pdf', {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Error downloading PDF");
//       }

//       // Handle the PDF download
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "prediction_report.pdf";
//       link.click();
      
//       setDownloadStatus('success');
//     } catch (error) {
//       console.error("Error downloading PDF:", error);
//       setDownloadStatus('error');
//     } finally {
//       setDownloading(false);
//     }
//   };

//   // Function to determine severity level based on confidence
//   const getSeverityLevel = (confidence) => {
//     if (confidence > 85) return { level: 'High', color: 'text-red-400' };
//     if (confidence > 60) return { level: 'Medium', color: 'text-yellow-400' };
//     return { level: 'Low', color: 'text-green-400' };
//   };

//   const severityInfo = getSeverityLevel(confidence);

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-green-900 to-black overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 z-0">
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute bg-green-500 rounded-full opacity-10"
//             style={{
//               width: Math.random() * 40 + 10,
//               height: Math.random() * 40 + 10,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, Math.random() * 150 - 75],
//               opacity: [0.05, 0.2, 0.05],
//             }}
//             transition={{
//               duration: Math.random() * 12 + 20,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>

//       {/* Background Image with Overlay */}
//       <div className="absolute inset-0 bg-no-repeat opacity-40 z-0">
//         <div 
//           className="absolute inset-0"
//           style={{
//             backgroundImage: "url('src/pages/PaddyDoctor/assets/background images/tbak.jpeg')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             height: "100vh",
//             filter: "blur(2px)",
//           }}
//         />
//         <div className="absolute inset-0 bg-black/70" />
//       </div>

//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="relative z-10 max-w-4xl mx-auto px-6 py-12"
//       >
//         {/* Back button */}
//         <motion.button
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//           onClick={handleBack}
//           className="absolute left-6 top-6 text-white flex items-center opacity-70 hover:opacity-100 transition-opacity"
//         >
//           <ArrowLeft className="mr-1 h-4 w-4" />
//           Back
//         </motion.button>

//         <motion.h2 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="text-4xl font-extrabold mb-2 text-white text-center tracking-wide drop-shadow-lg"
//         >
//           Treatment Plan
//         </motion.h2>
        
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="text-green-400 text-center mb-8 font-medium"
//         >
//           Recommended actions for {treatment?.name}
//         </motion.p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//           {/* Disease Information Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="md:col-span-1"
//           >
//             <div className="bg-black/80 backdrop-blur-md border border-green-900/50 shadow-xl rounded-xl p-6 h-full">
//               <div className="flex items-start justify-between mb-4">
//                 <h3 className="text-xl font-bold text-white flex items-center">
//                   <Info className="h-5 w-5 mr-2 text-green-500" />
//                   Detection Details
//                 </h3>
//                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${severityInfo.color} border border-current`}>
//                   {severityInfo.level} Severity
//                 </span>
//               </div>

//               {imageFile && (
//                 <div className="mb-4 relative overflow-hidden rounded-lg">
//                   <img 
//                     src={URL.createObjectURL(imageFile)} 
//                     alt="Analyzed crop"
//                     className="w-full h-48 object-cover rounded-lg shadow-md" 
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
//                     <div className="p-3 w-full">
//                       <div className="flex justify-between items-center">
//                         <span className="text-white font-medium">Confidence:</span>
//                         <span className="text-white font-bold">{confidence.toFixed(2)}%</span>
//                       </div>
//                       <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
//                         <div 
//                           className="h-1.5 rounded-full bg-gradient-to-r from-green-400 to-green-600" 
//                           style={{ width: `${confidence}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="space-y-3">
//                 <div>
//                   <h4 className="text-green-400 font-medium text-sm">Disease Type</h4>
//                   <p className="text-white text-lg font-semibold">{treatment?.name}</p>
//                 </div>
                
//                 <div>
//                   <h4 className="text-green-400 font-medium text-sm">Identification Date</h4>
//                   <p className="text-white">{new Date().toLocaleDateString()}</p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Symptoms Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="md:col-span-2"
//           >
//             <div className="bg-black/80 backdrop-blur-md border border-green-900/50 shadow-xl rounded-xl p-6 h-full">
//               <div className="flex items-center mb-4">
//                 <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
//                 <h3 className="text-xl font-bold text-white">Symptoms</h3>
//               </div>
              
//               <div className="space-y-2">
//                 {treatment?.symptoms.split(',').map((symptom, index) => (
//                   <motion.div 
//                     key={index}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.7 + (index * 0.1) }}
//                     className="flex items-start bg-gray-800/50 p-3 rounded-lg border-l-4 border-yellow-600"
//                   >
//                     <span className="text-gray-200">{symptom.trim()}</span>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Treatment Recommendations Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8 }}
//           className="mb-6"
//         >
//           <div className="bg-black/80 backdrop-blur-md border border-green-900/50 shadow-xl rounded-xl p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold text-white flex items-center">
//                 <Check className="h-5 w-5 mr-2 text-green-500" />
//                 Treatment Recommendations
//               </h3>
              
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 onClick={handleDownloadGuide}
//                 disabled={downloading}
//                 className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-all duration-300 
//                   ${downloading ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:shadow-green-500/20'}`}
//               >
//                 {downloading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Generating PDF...
//                   </>
//                 ) : (
//                   <>
//                     <FileDown className="mr-2 h-4 w-4" />
//                     Download Complete Guide
//                   </>
//                 )}
//               </motion.button>
//             </div>

//             {/* Download status message */}
//             <AnimatePresence>
//               {downloadStatus && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className={`mb-4 px-4 py-3 rounded-lg flex items-center ${
//                     downloadStatus === 'success' ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-red-900/30 text-red-400 border border-red-800'
//                   }`}
//                 >
//                   {downloadStatus === 'success' ? (
//                     <>
//                       <Check className="h-5 w-5 mr-2" />
//                       PDF downloaded successfully!
//                     </>
//                   ) : (
//                     <>
//                       <X className="h-5 w-5 mr-2" />
//                       Failed to download PDF. Please try again.
//                     </>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse rounded-lg overflow-hidden">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-green-900 to-green-800">
//                     <th className="text-left p-4 text-gray-100 font-medium">Brand Name</th>
//                     <th className="text-left p-4 text-gray-100 font-medium">How to Use</th>
//                     <th className="text-left p-4 text-gray-100 font-medium">Recommendations</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {treatment?.brandTreatments.map((brand, index) => (
//                     <motion.tr 
//                       key={index}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.9 + (index * 0.1) }}
//                       className={`border-b border-gray-700 hover:bg-green-900/10 transition-colors ${index % 2 === 0 ? 'bg-black/40' : 'bg-black/20'}`}
//                     >
//                       <td className="p-4 text-green-300 font-medium">{brand.brandName}</td>
//                       <td className="p-4 text-gray-300">{brand.howToUse}</td>
//                       <td className="p-4 text-gray-300">{brand.recommendations}</td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </motion.div>

//         {/* Additional tips card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.0 }}
//           className="mb-6"
//         >
//           <div className="bg-gradient-to-br from-green-900/80 to-black/80 backdrop-blur-md shadow-xl rounded-xl p-6 border border-green-700/30">
//             <h3 className="text-xl font-bold text-white mb-4">Prevention Tips</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="bg-black/30 p-4 rounded-lg border border-green-800/30">
//                 <h4 className="text-green-400 font-medium mb-2">Crop Rotation</h4>
//                 <p className="text-gray-300 text-sm">Implement a proper crop rotation strategy to minimize disease carryover between seasons.</p>
//               </div>
//               <div className="bg-black/30 p-4 rounded-lg border border-green-800/30">
//                 <h4 className="text-green-400 font-medium mb-2">Water Management</h4>
//                 <p className="text-gray-300 text-sm">Optimize irrigation practices to avoid prolonged leaf wetness which can promote disease development.</p>
//               </div>
//               <div className="bg-black/30 p-4 rounded-lg border border-green-800/30">
//                 <h4 className="text-green-400 font-medium mb-2">Field Monitoring</h4>
//                 <p className="text-gray-300 text-sm">Regular scouting of fields can help detect disease early before it becomes widespread.</p>
//               </div>
//               <div className="bg-black/30 p-4 rounded-lg border border-green-800/30">
//                 <h4 className="text-green-400 font-medium mb-2">Resistant Varieties</h4>
//                 <p className="text-gray-300 text-sm">Consider planting disease-resistant paddy varieties in future seasons.</p>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.2 }}
//           className="text-center text-gray-400 text-xs mt-8"
//         >
//           Always consult with a local agricultural expert before applying chemical treatments
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default TreatmentSuggestions;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, ArrowLeft, Info, AlertTriangle, Check, X, Loader2, Leaf, Shield, Eye } from 'lucide-react';

const TreatmentSuggestions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { treatment, disease, confidence, imageFile, prediction_probabilities, recommendations, farmerInputs } = location.state || {};
  const [downloading, setDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(null); // 'success', 'error', or null
  const [customizedTreatments, setCustomizedTreatments] = useState([]);
  const [preventiveMeasures, setPreventiveMeasures] = useState([]);
  const [environmentalAdjustments, setEnvironmentalAdjustments] = useState([]);
  const [monitoringTips, setMonitoringTips] = useState([]);

  // Determine disease type from disease name
  const getDiseaseType = () => {
    if (!disease) return "healthy";
    
    const diseaseLower = disease.toLowerCase();
    if (diseaseLower.includes("bacterial")) return "bacterial_leaf_blight";
    if (diseaseLower.includes("brown") || diseaseLower.includes("spot")) return "brown_spot";
    if (diseaseLower.includes("blast")) return "leaf_blast";
    if (diseaseLower.includes("sheath")) return "sheath_blight";
    return "healthy";
  };

  const diseaseType = getDiseaseType();

  // Treatment recommendation data from PDF
  const treatmentData = {
    bacterial_leaf_blight: {
      inputs: {
        humidity: {
          High: {
            treatments: [
              {
                brandName: "Copper Oxychloride (Blitox, Fytolan)",
                howToUse: "Spray every 10-14 days in the morning or evening.",
                recommendations: "High humidity promotes bacterial spread; avoid overhead irrigation."
              },
              {
                brandName: "Kasugamycin (Kasumin, Bactrex)",
                howToUse: "Spray every 10-14 days in the morning or evening.",
                recommendations: "High humidity promotes bacterial spread; avoid overhead irrigation."
              }
            ]
          },
          Low: {
            treatments: [
              {
                brandName: "No immediate treatment required",
                howToUse: "Monitor the field regularly.",
                recommendations: "Disease risk is lower in dry conditions, but early symptoms should still be checked."
              }
            ]
          }
        },
        irrigation: {
          Overhead: {
            treatments: [
              {
                brandName: "Copper Oxychloride (Blitox, Fytolan)",
                howToUse: "Apply as a foliar spray every 7-10 days.",
                recommendations: "Overhead irrigation increases bacteria spread—switch to drip irrigation."
              },
              {
                brandName: "Streptomycin (Strepto-Cycline)",
                howToUse: "Apply as a foliar spray every 7-10 days.",
                recommendations: "Overhead irrigation increases bacteria spread—switch to drip irrigation."
              }
            ]
          },
          Drip: {
            treatments: [
              {
                brandName: "Preventive measure: Use balanced fertilizers & avoid excessive nitrogen.",
                howToUse: "No direct chemical treatment needed unless symptoms appear.",
                recommendations: "Drip irrigation reduces disease spread; maintain proper spacing."
              }
            ]
          }
        },
        drainage: {
          Poor: {
            treatments: [
              {
                brandName: "Kasugamycin (Kasumin, Bactrex)",
                howToUse: "Apply as a foliar spray at first signs of infection.",
                recommendations: "Improve drainage by removing excess water to prevent bacterial growth."
              },
              {
                brandName: "Oxytetracycline (Myco Shield, Terramycin)",
                howToUse: "Apply as a foliar spray at first signs of infection.",
                recommendations: "Improve drainage by removing excess water to prevent bacterial growth."
              }
            ]
          },
          Good: {
            treatments: [
              {
                brandName: "No treatment needed unless symptoms appear.",
                howToUse: "Monitor field conditions weekly.",
                recommendations: "Good drainage minimizes disease risk; continue regular crop monitoring."
              }
            ]
          }
        },
        nitrogen: {
          High: {
            treatments: [
              {
                brandName: "Copper Oxychloride (Blitox, Fytolan)",
                howToUse: "Reduce nitrogen use & apply treatments at early symptoms.",
                recommendations: "Excess nitrogen makes plants susceptible—reduce fertilization levels."
              },
              {
                brandName: "Bactericide spray (Agrimycin, Agristat)",
                howToUse: "Reduce nitrogen use & apply treatments at early symptoms.",
                recommendations: "Excess nitrogen makes plants susceptible—reduce fertilization levels."
              }
            ]
          },
          Low: {
            treatments: [
              {
                brandName: "No treatment needed unless symptoms appear.",
                howToUse: "Maintain balanced fertilization.",
                recommendations: "Proper nitrogen balance strengthens plant immunity."
              }
            ]
          }
        },
        preventive: [
          "Use disease-resistant rice varieties to reduce infection risk.",
          "Rotate crops to minimize bacteria buildup in the soil.",
          "Maintain proper plant spacing for good airflow."
        ],
        environmental: [
          "Avoid excessive nitrogen fertilizer—it weakens plants and makes them prone to BLB.",
          "If the area is humid & warm, use drip irrigation instead of overhead sprinklers."
        ],
        monitoring: [
          "Inspect fields regularly, especially after heavy rains or high humidity periods.",
          "If symptoms appear, start early treatment to prevent further spread."
        ]
      }
    },
    brown_spot: {
      inputs: {
        weather: {
          Dry: {
            treatments: [
              {
                brandName: "Carbendazim (Bavistin, Saaf)",
                howToUse: "Spray fungicide at early symptoms and repeat every 10-12 days.",
                recommendations: "Dry weather stresses the plant, making it more vulnerable—ensure adequate irrigation."
              },
              {
                brandName: "Mancozeb (Dithane M-45, Indofil M-45)",
                howToUse: "Spray fungicide at early symptoms and repeat every 10-12 days.",
                recommendations: "Dry weather stresses the plant, making it more vulnerable—ensure adequate irrigation."
              }
            ]
          },
          Rainy: {
            treatments: [
              {
                brandName: "No treatment unless symptoms appear.",
                howToUse: "Monitor leaves for dark brown spots; apply fungicide if needed.",
                recommendations: "Rain can wash away spores, but prolonged wet conditions may still encourage fungal spread."
              }
            ]
          }
        },
        nutrients: {
          Low: {
            treatments: [
              {
                brandName: "Potassium silicate foliar spray (Silic Max, AgSil 16H)",
                howToUse: "Apply foliar spray every 2 weeks.",
                recommendations: "Low potassium & silica make plants weak—use balanced fertilizers."
              }
            ]
          },
          High: {
            treatments: [
              {
                brandName: "No treatment needed unless symptoms appear.",
                howToUse: "Continue nutrient management with balanced fertilization.",
                recommendations: "Proper nutrient balance strengthens plant immunity against disease."
              }
            ]
          }
        },
        drainage: {
          Poor: {
            treatments: [
              {
                brandName: "Tricyclazole (Beam, Sprint)",
                howToUse: "Spray fungicide after rainfall to prevent fungal spores from thriving.",
                recommendations: "Improve drainage by leveling the field and ensuring proper water flow."
              },
              {
                brandName: "Hexaconazole (Contaf, Roko)",
                howToUse: "Spray fungicide after rainfall to prevent fungal spores from thriving.",
                recommendations: "Improve drainage by leveling the field and ensuring proper water flow."
              }
            ]
          },
          Good: {
            treatments: [
              {
                brandName: "No treatment unless symptoms appear.",
                howToUse: "Maintain good drainage and aeration.",
                recommendations: "Good drainage helps in reducing fungal spore persistence."
              }
            ]
          }
        },
        preventive: [
          "Use disease-resistant rice varieties to reduce the risk of infection.",
          "Crop rotation helps minimize fungal buildup in the soil.",
          "Proper field sanitation: Remove infected plant debris to stop the fungus from spreading."
        ],
        environmental: [
          "Maintain proper soil nutrition with adequate potassium & silica to strengthen plant resistance.",
          "Avoid excessive standing water in fields—improve drainage if necessary.",
          "Apply balanced fertilization—excess nitrogen can worsen brown spot disease."
        ],
        monitoring: [
          "Inspect leaves regularly, especially during prolonged dry spells or after heavy rains.",
          "Look for dark brown spots with yellow halos—apply treatment early to prevent spread."
        ]
      }
    },
    leaf_blast: {
      inputs: {
        temperature: {
          High: {
            treatments: [
              {
                brandName: "Tricyclazole (Beam, Sprint)",
                howToUse: "Spray fungicide at early signs & repeat every 7-10 days.",
                recommendations: "High temperatures accelerate fungal growth—apply fungicides early."
              },
              {
                brandName: "Isoprothiolane (Fuji-One, Kitazin)",
                howToUse: "Spray fungicide at early signs & repeat every 7-10 days.",
                recommendations: "High temperatures accelerate fungal growth—apply fungicides early."
              }
            ]
          },
          Low: {
            treatments: [
              {
                brandName: "No immediate treatment unless symptoms appear.",
                howToUse: "Monitor plants closely & apply preventive measures.",
                recommendations: "Low temperatures slow down fungal growth, but vigilance is key."
              }
            ]
          }
        },
        humidity: {
          High: {
            treatments: [
              {
                brandName: "Azoxystrobin (Amistar, Ortiva)",
                howToUse: "Spray after heavy rain to prevent fungal spread.",
                recommendations: "High humidity favors fungus—avoid overhead irrigation."
              },
              {
                brandName: "Carbendazim (Bavistin, Saaf)",
                howToUse: "Spray after heavy rain to prevent fungal spread.",
                recommendations: "High humidity favors fungus—avoid overhead irrigation."
              }
            ]
          },
          Low: {
            treatments: [
              {
                brandName: "No treatment needed unless symptoms appear.",
                howToUse: "Regularly check for early signs of infection.",
                recommendations: "Low humidity reduces fungal spread, but monitoring is necessary."
              }
            ]
          }
        },
        spacing: {
          Dense: {
            treatments: [
              {
                brandName: "Hexaconazole (Contaf, Roko)",
                howToUse: "Apply fungicide if symptoms appear; improve spacing.",
                recommendations: "Dense planting creates moisture buildup—space plants properly."
              },
              {
                brandName: "Mancozeb (Dithane M-45, Indofil M-45)",
                howToUse: "Apply fungicide if symptoms appear; improve spacing.",
                recommendations: "Dense planting creates moisture buildup—space plants properly."
              }
            ]
          },
          "Well-spaced": {
            treatments: [
              {
                brandName: "No treatment needed unless symptoms appear.",
                howToUse: "Ensure airflow between plants to prevent fungal infections.",
                recommendations: "Proper spacing reduces disease risk significantly."
              }
            ]
          }
        },
        nitrogen: {
          High: {
            treatments: [
              {
                brandName: "Tricyclazole (Beam, Sprint)",
                howToUse: "Reduce nitrogen use & apply fungicide at early symptoms.",
                recommendations: "Excess nitrogen weakens plants—adjust fertilizer application."
              },
              {
                brandName: "Thiophanate-methyl (Topsin-M, Cercobin)",
                howToUse: "Reduce nitrogen use & apply fungicide at early symptoms.",
                recommendations: "Excess nitrogen weakens plants—adjust fertilizer application."
              }
            ]
          },
          Moderate: {
            treatments: [
              {
                brandName: "No treatment unless symptoms appear.",
                howToUse: "Maintain balanced nitrogen levels for healthy growth.",
                recommendations: "Controlled nitrogen use strengthens plant resistance."
              }
            ]
          }
        },
        preventive: [
          "Use blast-resistant rice varieties to reduce infection chances.",
          "Practice crop rotation to break the fungal life cycle.",
          "Sanitize tools & remove infected plant debris to prevent reinfection."
        ],
        environmental: [
          "Maintain optimal plant spacing to improve airflow and reduce moisture buildup.",
          "Avoid excess nitrogen fertilizers, which make plants more vulnerable to blast.",
          "Use drip irrigation instead of overhead watering to prevent moisture accumulation."
        ],
        monitoring: [
          "Inspect leaves regularly for grayish lesions—start treatment early.",
          "If high humidity and temperatures persist, apply preventive fungicides even before symptoms appear."
        ]
      }
    },
    sheath_blight: {
      inputs: {
        density: {
          High: {
            treatments: [
              {
                brandName: "Propiconazole (Tilt, Bumper)",
                howToUse: "Spray fungicide at early signs & repeat every 10-14 days.",
                recommendations: "High-density planting increases humidity—opt for moderate spacing."
              },
              {
                brandName: "Hexaconazole (Contaf, Roko)",
                howToUse: "Spray fungicide at early signs & repeat every 10-14 days.",
                recommendations: "High-density planting increases humidity—opt for moderate spacing."
              }
            ]
          },
          Moderate: {
            treatments: [
              {
                brandName: "No treatment unless symptoms appear.",
                howToUse: "Maintain spacing to allow proper airflow.",
                recommendations: "Proper spacing reduces disease risk significantly."
              }
            ]
          }
        },
        moisture: {
          Wet: {
            treatments: [
              {
                brandName: "Azoxystrobin (Amistar, Ortiva)",
                howToUse: "Apply fungicide after heavy rains to prevent fungal spread.",
                recommendations: "Wet soil encourages fungal infections—improve drainage."
              },
              {
                brandName: "Carbendazim (Bavistin, Saaf)",
                howToUse: "Apply fungicide after heavy rains to prevent fungal spread.",
                recommendations: "Wet soil encourages fungal infections—improve drainage."
              }
            ]
          },
          Dry: {
            treatments: [
              {
                brandName: "No treatment needed unless symptoms appear.",
                howToUse: "Monitor plants & avoid excessive irrigation.",
                recommendations: "Dry soil reduces fungal spread but can stress plants—balanced irrigation is key."
              }
            ]
          }
        },
        weather: {
          Rainy: {
            treatments: [
              {
                brandName: "Trifloxystrobin (Nativo, Flint)",
                howToUse: "Spray fungicide preventively if rain persists for several days.",
                recommendations: "Rainy weather increases disease risk—avoid standing water."
              },
              {
                brandName: "Validamycin (Sheathmar, Validacin)",
                howToUse: "Spray fungicide preventively if rain persists for several days.",
                recommendations: "Rainy weather increases disease risk—avoid standing water."
              }
            ]
          },
          Dry: {
            treatments: [
              {
                brandName: "No treatment unless symptoms appear.",
                howToUse: "Keep monitoring plant health regularly.",
                recommendations: "Dry weather slows disease spread but does not eliminate risk."
              }
            ]
          }
        },
        preventive: [
          "Use disease-resistant rice varieties to minimize infection risk.",
          "Remove infected plant parts and sanitize tools to prevent fungal spread.",
          "Avoid over-fertilization with nitrogen, as it can increase disease susceptibility."
        ],
        environmental: [
          "Maintain moderate planting density to allow better air circulation.",
          "Ensure good drainage in fields to avoid excess soil moisture.",
          "If continuous rainy weather is expected, apply preventive fungicides before symptoms appear."
        ],
        monitoring: [
          "Check for oval, water-soaked lesions on sheaths—early detection prevents severe yield loss.",
          "If wet conditions persist, increase field inspections and apply fungicides accordingly."
        ]
      }
    },
    healthy: {
      inputs: {
        management: {
          Proper: {
            treatments: [
              {
                brandName: "No immediate treatment needed.",
                howToUse: "Continue best practices: proper irrigation, spacing, and pest control.",
                recommendations: "Healthy fields are less susceptible to diseases—maintain good management."
              }
            ]
          },
          Poor: {
            treatments: [
              {
                brandName: "Bio-fungicides (Trichoderma, Serenade, Bacillus subtilis)",
                howToUse: "Apply bio-fungicides as a preventive measure.",
                recommendations: "Poor management can lead to fungal growth—regularly clean the field."
              }
            ]
          }
        },
        soil: {
          Good: {
            treatments: [
              {
                brandName: "No additional treatment needed.",
                howToUse: "Continue balanced fertilization and soil testing.",
                recommendations: "Healthy soil supports disease resistance."
              }
            ]
          },
          Deficient: {
            treatments: [
              {
                brandName: "Organic fertilizers (Compost, Vermicompost, Biochar)",
                howToUse: "Apply recommended fertilizers based on soil test reports.",
                recommendations: "Nutrient deficiency weakens plants, making them vulnerable to diseases."
              },
              {
                brandName: "Nutrient Supplements (NPK, Zinc, Magnesium Sulfate)",
                howToUse: "Apply recommended fertilizers based on soil test reports.",
                recommendations: "Nutrient deficiency weakens plants, making them vulnerable to diseases."
              }
            ]
          }
        },
        preventive: [
          "Use disease-resistant rice varieties to enhance plant immunity.",
          "Monitor soil nutrients regularly to maintain optimal plant growth.",
          "Rotate crops to prevent soil-borne diseases."
        ],
        environmental: [
          "Maintain good drainage to avoid excessive moisture.",
          "Use organic mulch to retain soil moisture and improve fertility.",
          "Ensure proper sunlight exposure to prevent fungal growth."
        ],
        monitoring: [
          "Regularly check for early disease symptoms like leaf discoloration.",
          "Maintain a record of weather conditions to predict potential risks.",
          "Adjust fertilizer application based on plant health and growth stage."
        ]
      }
    }
  };

  // Process treatment data based on farmer inputs
  useEffect(() => {
    if (!disease || !farmerInputs || !treatmentData[diseaseType]) return;

    const customizedTreatmentsList = [];
    const data = treatmentData[diseaseType].inputs;
    
    // Process each farmer input to get corresponding treatments
    Object.keys(farmerInputs).forEach(inputKey => {
      const inputValue = farmerInputs[inputKey];
      
      // Check if we have recommendations for this input and value
      if (data[inputKey] && data[inputKey][inputValue] && data[inputKey][inputValue].treatments) {
        // Add treatments to the list
        customizedTreatmentsList.push(...data[inputKey][inputValue].treatments);
      }
    });

    // Set preventive measures and other recommendations
    setPreventiveMeasures(data.preventive || []);
    setEnvironmentalAdjustments(data.environmental || []);
    setMonitoringTips(data.monitoring || []);

    // If we found customized treatments, use them; otherwise use the default treatments
    if (customizedTreatmentsList.length > 0) {
      setCustomizedTreatments(customizedTreatmentsList);
    } else if (treatment && treatment.brandTreatments) {
      setCustomizedTreatments(treatment.brandTreatments);
    }
  }, [disease, farmerInputs, diseaseType]);

  // Handle back button
  const handleBack = () => {
    navigate(-1);
  };

  // Example of handleDownloadGuide function
  const handleDownloadGuide = async () => {
    try {
      setDownloading(true);
      setDownloadStatus(null);
      
      const predictedClass = disease;
      const suggestions = recommendations;
      const predictions = prediction_probabilities;
      const symptoms = treatment?.symptoms;
      const brandTreatments = customizedTreatments.length > 0 ? customizedTreatments : treatment?.brandTreatments;
      const formData = new FormData();

      // Append the image file to FormData
      if (imageFile) {
        formData.append("file", imageFile);
      }

      // Append other data to FormData
      if (predictedClass) {
        formData.append("predicted_class", predictedClass);
      }
      if (predictions) {
        formData.append("predictions", JSON.stringify(predictions));
      }
      if (suggestions) {
        formData.append("suggestions", JSON.stringify(suggestions));
      }
      // Add symptoms and brandTreatments data
      if (symptoms) {
        formData.append("symptoms", symptoms);
      }
      if (brandTreatments) {
        formData.append("brand_treatments", JSON.stringify(brandTreatments));
      }
      // Add preventive measures and other recommendations
      if (preventiveMeasures.length > 0) {
        formData.append("preventive_measures", JSON.stringify(preventiveMeasures));
      }
      if (environmentalAdjustments.length > 0) {
        formData.append("environmental_adjustments", JSON.stringify(environmentalAdjustments));
      }
      if (monitoringTips.length > 0) {
        formData.append("monitoring_tips", JSON.stringify(monitoringTips));
      }
      // Add farmer inputs
      if (farmerInputs) {
        formData.append("farmer_inputs", JSON.stringify(farmerInputs));
      }
        
      const response = await fetch('http://127.0.0.1:8080/api/download_pdf', {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error downloading PDF");
      }

      // Handle the PDF download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "prediction_report.pdf";
      link.click();
      
      setDownloadStatus('success');
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setDownloadStatus('error');
    } finally {
      setDownloading(false);
    }
  };

  // Function to determine severity level based on confidence
  const getSeverityLevel = (confidence) => {
    if (confidence > 85) return { level: 'High', color: 'text-red-400' };
    if (confidence > 60) return { level: 'Medium', color: 'text-yellow-400' };
    return { level: 'Low', color: 'text-green-400' };
  };

  const severityInfo = getSeverityLevel(confidence);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-900 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-green-500 rounded-full opacity-10"
            style={{
              width: Math.random() * 40 + 10,
              height: Math.random() * 40 + 10,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 150 - 75],
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: Math.random() * 12 + 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-no-repeat opacity-40 z-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('src/pages/PaddyDoctor/assets/background images/tbak.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            filter: "blur(2px)",
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 max-w-4xl mx-auto px-6 py-12"
      >
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleBack}
          className="absolute left-6 top-6 text-white flex items-center opacity-70 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </motion.button>

        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-extrabold mb-2 text-white text-center tracking-wide drop-shadow-lg"
        >
          Treatment Plan
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-green-400 text-center mb-8 font-medium"
        >
          Recommended actions for {treatment?.name}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Disease Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-1"
          >
            <div className="bg-black/80 backdrop-blur-md border border-green-900/50 shadow-xl rounded-xl p-6 h-full">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Info className="h-5 w-5 mr-2 text-green-500" />
                  Detection Details
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${severityInfo.color} border border-current`}>
                  {severityInfo.level} Severity
                </span>
              </div>

              {imageFile && (
                <div className="mb-4 relative overflow-hidden rounded-lg">
                  <img 
                    src={URL.createObjectURL(imageFile)} 
                    alt="Analyzed crop"
                    className="w-full h-48 object-cover rounded-lg shadow-md" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-3 w-full">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Confidence:</span>
                        <span className="text-white font-bold">{confidence?.toFixed(2)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                        <div 
                          className="h-1.5 rounded-full bg-gradient-to-r from-green-400 to-green-600" 
                          style={{ width: `${confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <h4 className="text-green-400 font-medium text-sm">Disease Type</h4>
                  <p className="text-white text-lg font-semibold">{treatment?.name}</p>
                </div>
                
                <div>
                  <h4 className="text-green-400 font-medium text-sm">Identification Date</h4>
                  <p className="text-white">{new Date().toLocaleDateString()}</p>
                </div>

                {/* Display Farmer Inputs */}
                {farmerInputs && Object.keys(farmerInputs).length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-green-400 font-medium text-sm mb-2">Field Conditions</h4>
                    <div className="space-y-2">
                      {Object.entries(farmerInputs).map(([key, value]) => (
                        <div key={key} className="bg-gray-900/50 px-3 py-2 rounded-lg flex justify-between">
                          <span className="text-gray-300 text-sm capitalize">{key}:</span>
                          <span className="text-white text-sm font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Symptoms Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-2"
          >
            <div className="bg-black/80 backdrop-blur-md border border-green-900/50 shadow-xl rounded-xl p-6 h-full">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                <h3 className="text-xl font-bold text-white">Symptoms</h3>
              </div>
              
              <div className="space-y-2">
                {treatment?.symptoms.split(',').map((symptom, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + (index * 0.1) }}
                    className="flex items-start bg-gray-800/50 p-3 rounded-lg border-l-4 border-yellow-600"
                  >
                    <span className="text-gray-200">{symptom.trim()}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Treatment Recommendations Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <div className="bg-black/80 backdrop-blur-md border border-green-900/50 shadow-xl rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Check className="h-5 w-5 mr-2 text-green-500" />
                Treatment Recommendations
              </h3>
              
              {/* <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownloadGuide}
                disabled={downloading}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-all duration-300 
                  ${downloading ? 'bg-gray-700 text-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:shadow-green-500/20'}`}
              >
                {downloading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <FileDown className="mr-2 h-4 w-4" />
                    Download Complete Guide
                  </>
                )}
              </motion.button> */}
            </div>

            {/* Download status message */}
            <AnimatePresence>
              {downloadStatus && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mb-4 px-4 py-3 rounded-lg flex items-center ${
                    downloadStatus === 'success' ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-red-900/30 text-red-400 border border-red-800'
                  }`}
                >
                  {downloadStatus === 'success' ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      PDF downloaded successfully!
                    </>
                  ) : (
                    <>
                      <X className="h-5 w-5 mr-2" />
                      Failed to download PDF. Please try again.
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-green-900 to-green-800">
                    <th className="text-left p-4 text-gray-100 font-medium">Brand Name</th>
                    <th className="text-left p-4 text-gray-100 font-medium">How to Use</th>
                    <th className="text-left p-4 text-gray-100 font-medium">Recommendations</th>
                  </tr>
                </thead>
                <tbody>
                  {customizedTreatments.map((brand, index) => (
                    <motion.tr 
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + (index * 0.1) }}
                      className={`border-b border-gray-700 hover:bg-green-900/10 transition-colors ${index % 2 === 0 ? 'bg-black/40' : 'bg-black/20'}`}
                    >
                      <td className="p-4 text-green-300 font-medium">{brand.brandName}</td>
                      <td className="p-4 text-gray-300">{brand.howToUse}</td>
                      <td className="p-4 text-gray-300">{brand.recommendations}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Prevention and Monitoring Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Preventive Measures */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-gradient-to-br from-green-900/80 to-black/80 backdrop-blur-md shadow-xl rounded-xl p-6 border border-green-700/30"
          >
            <div className="flex items-center mb-4">
              <Shield className="h-5 w-5 mr-2 text-green-400" />
              <h3 className="text-xl font-bold text-white">Preventive Measures</h3>
            </div>
            
            <div className="space-y-3">
              {preventiveMeasures.map((measure, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + (index * 0.1) }}
                  className="flex items-start bg-black/30 p-3 rounded-lg border-l-4 border-green-600"
                >
                  <span className="text-gray-200 text-sm">{measure}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Environmental Adjustments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-gradient-to-br from-green-900/80 to-black/80 backdrop-blur-md shadow-xl rounded-xl p-6 border border-green-700/30"
          >
            <div className="flex items-center mb-4">
              <Leaf className="h-5 w-5 mr-2 text-green-400" />
              <h3 className="text-xl font-bold text-white">Environmental Adjustments</h3>
            </div>
            
            <div className="space-y-3">
              {environmentalAdjustments.map((adjustment, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + (index * 0.1) }}
                  className="flex items-start bg-black/30 p-3 rounded-lg border-l-4 border-green-600"
                >
                  <span className="text-gray-200 text-sm">{adjustment}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Monitoring Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="bg-gradient-to-br from-green-900/80 to-black/80 backdrop-blur-md shadow-xl rounded-xl p-6 border border-green-700/30"
          >
            <div className="flex items-center mb-4">
              <Eye className="h-5 w-5 mr-2 text-green-400" />
              <h3 className="text-xl font-bold text-white">Monitoring Tips</h3>
            </div>
            
            <div className="space-y-3">
              {monitoringTips.map((tip, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + (index * 0.1) }}
                  className="flex items-start bg-black/30 p-3 rounded-lg border-l-4 border-green-600"
                >
                  <span className="text-gray-200 text-sm">{tip}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-center text-gray-400 text-xs mt-8"
        >
          Always consult with a local agricultural expert before applying chemical treatments
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TreatmentSuggestions;