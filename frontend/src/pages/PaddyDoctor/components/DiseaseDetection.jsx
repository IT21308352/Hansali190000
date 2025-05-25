// import React, { useState, useCallback, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useDropzone } from 'react-dropzone';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Upload, Leaf, Loader2, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

// const DiseaseDetection = () => {
//   const [image, setImage] = useState(null);
//   const [result, setResult] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   const navigate = useNavigate();

//   const onDrop = useCallback((acceptedFiles) => {
//     setImage(acceptedFiles[0]);
//     setErrorMsg('');
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {'image/*': []},
//     multiple: false
//   });

//   const handlePredict = async () => {
//     try {
//       setIsLoading(true);
//       setErrorMsg('');
//       const formData = new FormData();
//       formData.append('file', image);
//       const response = await axios.post('http://127.0.0.1:8000/api/predict', formData);
//       const result = response.data.result;
//       const updatedResult = {
//         ...result,      
//         imageFile: image    
//       };
//       setResult(updatedResult);
//     } catch (error) {
//       console.error('Error predicting disease:', error);
//       setErrorMsg('Failed to process image. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleUploadAnother = () => {
//     setImage(null);
//     setResult(null);
//     setErrorMsg('');
//   };

//   const handleViewTreatment = () => {
//     navigate('/treatment', { state: result });
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-green-900 to-black overflow-hidden">
//       {/* Animated background particles */}
//       <div className="absolute inset-0 z-0">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute bg-green-500 rounded-full opacity-20"
//             style={{
//               width: Math.random() * 30 + 10,
//               height: Math.random() * 30 + 10,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, Math.random() * 100 - 50],
//               opacity: [0.1, 0.3, 0.1],
//             }}
//             transition={{
//               duration: Math.random() * 10 + 15,
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
//             backgroundImage: `url('src/pages/PaddyDoctor/assets/background images/dbak.jpeg')`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             height: "100vh",
//             filter: "blur(2px)",
//           }}
//         />
//         <div className="absolute inset-0 bg-black/60" />
//       </div>

//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative z-10 max-w-3xl pt-16 mx-auto px-6"
//       >
//         <h2 className="text-4xl font-extrabold mb-8 text-white text-center tracking-wide drop-shadow-lg">
//           <span className="text-green-400 mr-2">Paddy</span>
//           Disease Detection
//         </h2>
        
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           className="bg-black/80 backdrop-blur-md shadow-2xl rounded-xl p-8 border border-green-900/50"
//         >
//           <div className="flex items-center justify-center mb-6">
//             <Leaf className="h-6 w-6 text-green-500 mr-2" />
//             <h3 className="text-xl font-bold text-white">Upload Paddy Image</h3>
//           </div>

//           <AnimatePresence mode="wait">
//             {image ? (
//               <motion.div 
//                 key="preview"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="mb-6"
//               >
//                 <div className="relative rounded-lg overflow-hidden group">
//                   <img
//                     src={URL.createObjectURL(image)}
//                     alt="Uploaded"
//                     className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
//                     <p className="text-white font-medium truncate">
//                       {image.name} ({(image.size / 1024).toFixed(1)} KB)
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ) : (
//               <motion.div 
//                 key="upload"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 <div 
//                   {...getRootProps()} 
//                   className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
//                     ${isDragActive 
//                       ? 'border-green-400 bg-green-900/20' 
//                       : 'border-gray-600 hover:border-green-500 hover:bg-green-900/10'}`}
//                 >
//                   <input {...getInputProps()} />
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     <Upload className={`mx-auto h-12 w-12 mb-3 ${isDragActive ? 'text-green-400' : 'text-gray-400'}`} />
//                     <p className={`text-lg ${isDragActive ? 'text-green-400' : 'text-gray-400'}`}>
//                       {isDragActive ? 'Drop the image here' : 'Drag and drop your paddy field image here'}
//                     </p>
//                     <p className="text-gray-500 text-sm mt-2">or</p>
//                     <motion.button
//                       whileTap={{ scale: 0.97 }}
//                       type="button"
//                       className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-md mt-4 font-medium shadow-lg hover:shadow-green-500/20 hover:from-green-500 hover:to-green-400 transition-all duration-300"
//                     >
//                       Select Image
//                     </motion.button>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {errorMsg && (
//             <motion.div 
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-red-900/40 border border-red-800 text-red-200 px-4 py-3 rounded-md mb-4 flex items-center"
//             >
//               <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
//               <p>{errorMsg}</p>
//             </motion.div>
//           )}

//           <AnimatePresence>
//             {result ? (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-4 mb-6">
//                   <h4 className="text-green-400 font-semibold text-lg mb-1">Analysis Result</h4>
//                   <div className="flex items-center">
//                     <div className="w-full bg-gray-700 rounded-full h-2.5">
//                       <div className="bg-gradient-to-r from-green-400 to-green-600 h-2.5 rounded-full" style={{ width: `${parseFloat(result.confidence)}%` }}></div>
//                     </div>
//                     <span className="text-white font-bold ml-3">{parseFloat(result.confidence).toFixed(1)}%</span>
//                   </div>
//                   <p className="text-white text-xl font-bold mt-3">
//                     {result.disease}
//                   </p>
//                 </div>
                
//                 <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
//                   <motion.button
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     type="button"
//                     className="bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center text-white px-6 py-3 rounded-md font-medium shadow-lg hover:shadow-green-500/20"
//                     onClick={handleViewTreatment}
//                   >
//                     View Treatment
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     type="button"
//                     className="bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
//                     onClick={handleUploadAnother}
//                   >
//                     <RefreshCw className="mr-2 h-5 w-5" />
//                     Upload Another Image
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ) : image && (
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="flex justify-end"
//               >
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.97 }}
//                   disabled={isLoading}
//                   type="button"
//                   className={`bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-md mt-4 font-medium
//                     shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center
//                     ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-green-500 hover:to-green-400'}`}
//                   onClick={handlePredict}
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                       Analyzing...
//                     </>
//                   ) : (
//                     <>Predict Disease</>
//                   )}
//                 </motion.button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>
        
//         <motion.p 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//           className="text-center text-gray-400 text-xs mt-6"
//         >
//           Upload clear images of paddy leaves for the most accurate disease detection
//         </motion.p>
//       </motion.div>
//     </div>
//   );
// };

// export default DiseaseDetection;


import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Leaf, Loader2, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

const DiseaseDetection = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
    setErrorMsg('');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    multiple: false
  });

  const handlePredict = async () => {
    try {
      setIsLoading(true);
      setErrorMsg('');
      const formData = new FormData();
      formData.append('file', image);
      const response = await axios.post('http://127.0.0.1:8080/api/predict', formData);
      const result = response.data.result;
      const updatedResult = {
        ...result,      
        imageFile: image    
      };
      setResult(updatedResult);
    } catch (error) {
      console.error('Error predicting disease:', error);
      setErrorMsg('Failed to process image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadAnother = () => {
    setImage(null);
    setResult(null);
    setErrorMsg('');
  };

  // Navigate to the farmer inputs page instead of directly to treatment
  const handleViewTreatment = () => {
    navigate('/farmer-inputs', { state: result });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-900 to-black overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-green-500 rounded-full opacity-20"
            style={{
              width: Math.random() * 30 + 10,
              height: Math.random() * 30 + 10,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
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
            backgroundImage: `url('src/pages/PaddyDoctor/assets/background images/dbak.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            filter: "blur(2px)",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl pt-16 mx-auto px-6"
      >
        <h2 className="text-4xl font-extrabold mb-8 text-white text-center tracking-wide drop-shadow-lg">
          <span className="text-green-400 mr-2">Paddy</span>
          Disease Detection
        </h2>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-black/80 backdrop-blur-md shadow-2xl rounded-xl p-8 border border-green-900/50"
        >
          <div className="flex items-center justify-center mb-6">
            <Leaf className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="text-xl font-bold text-white">Upload Paddy Image</h3>
          </div>

          <AnimatePresence mode="wait">
            {image ? (
              <motion.div 
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-6"
              >
                <div className="relative rounded-lg overflow-hidden group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-medium truncate">
                      {image.name} ({(image.size / 1024).toFixed(1)} KB)
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div 
                  {...getRootProps()} 
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
                    ${isDragActive 
                      ? 'border-green-400 bg-green-900/20' 
                      : 'border-gray-600 hover:border-green-500 hover:bg-green-900/10'}`}
                >
                  <input {...getInputProps()} />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Upload className={`mx-auto h-12 w-12 mb-3 ${isDragActive ? 'text-green-400' : 'text-gray-400'}`} />
                    <p className={`text-lg ${isDragActive ? 'text-green-400' : 'text-gray-400'}`}>
                      {isDragActive ? 'Drop the image here' : 'Drag and drop your paddy field image here'}
                    </p>
                    <p className="text-gray-500 text-sm mt-2">or</p>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-md mt-4 font-medium shadow-lg hover:shadow-green-500/20 hover:from-green-500 hover:to-green-400 transition-all duration-300"
                    >
                      Select Image
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/40 border border-red-800 text-red-200 px-4 py-3 rounded-md mb-4 flex items-center"
            >
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p>{errorMsg}</p>
            </motion.div>
          )}

          <AnimatePresence>
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-4 mb-6">
                  <h4 className="text-green-400 font-semibold text-lg mb-1">Analysis Result</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-green-400 to-green-600 h-2.5 rounded-full" style={{ width: `${parseFloat(result.confidence)}%` }}></div>
                    </div>
                    <span className="text-white font-bold ml-3">{parseFloat(result.confidence).toFixed(1)}%</span>
                  </div>
                  <p className="text-white text-xl font-bold mt-3">
                    {result.disease}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center text-white px-6 py-3 rounded-md font-medium shadow-lg hover:shadow-green-500/20"
                    onClick={handleViewTreatment}
                  >
                    Customize Treatment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
                    onClick={handleUploadAnother}
                  >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Upload Another Image
                  </motion.button>
                </div>
              </motion.div>
            ) : image && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-end"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isLoading}
                  type="button"
                  className={`bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-md mt-4 font-medium
                    shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center
                    ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-green-500 hover:to-green-400'}`}
                  onClick={handlePredict}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>Predict Disease</>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-400 text-xs mt-6"
        >
          Upload clear images of paddy leaves for the most accurate disease detection
        </motion.p>
      </motion.div>
    </div>
  );
};

export default DiseaseDetection;