import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WeedUploadPage = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      console.log("Preview file selected:", file.name);
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      console.log("Invalid file selected");
      alert("Please select a valid image file.");
      setImage(null);
      setPreviewUrl(null);
    }
  };



  useEffect(() => {
    // Cleanup to avoid memory leaks
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);


  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    setIsLoading(true);
    const startTime = Date.now();

    try {
      const response = await fetch("http://127.0.0.1:8000/weed/predict/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error processing image.");
      }

      const data = await response.json();
      const elapsed = Date.now() - startTime;
      console.log(" Received Response from API:", data);

      const minDuration = 3000;
      if (elapsed < minDuration) {
        await new Promise((resolve) => setTimeout(resolve, minDuration - elapsed));
      }

      navigate("/weed-detection/result", {
        state: {
          result: data.weed_class,
          mitigation: data.mitigation,
        },
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error processing image.");
      setIsLoading(false);
    }
  };





  return (
    <>

      {isLoading && (
        <div className="fixed inset-0 z-[1000] bg-black bg-opacity-70 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
            <p className="text-white text-lg font-semibold font-poppins">Processing image...</p>
          </div>
        </div>
      )}

      <div className="uploadPage">
        <div
          className="flex flex-col justify-center items-center relative px-6"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/219517/pexels-photo-219517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "calc(100vh - 104px)",
          }}
        >
          {/* Overlay for contrast */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <h2 style={{
            color: "white",
            fontSize: "56px",
            position: "relative",
            marginBottom: "100px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
          }}>IDENTIFY WEED VARIETIES</h2>

          {/* Black Inner Container with White Text */}
          <div className="relative bg-black bg-opacity-80 backdrop-blur-lg p-8 rounded-3xl shadow-lg text-center w-96">
            <h2 className="text-2xl font-bold text-white mb-4"
              style={{
                color: "white",
                fontSize: 14,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
              }}>Select an Image</h2>

            <label className="block bg-gray-700 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-600 transition">
              Choose File
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>

            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-h-64 object-contain rounded-lg shadow"
                />
              </div>
            )}


            <button
              onClick={handleUpload}
              className="mt-6 bg-green-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md"
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                border: "none"
              }}
            >
              Predict weed
            </button>
          </div>
        </div>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4" style={{
            fontFamily: "Poppins, sans-serif",
          }}>
            <h1 className="text-4xl font-bold mb-6">Instructions for Uploading Images:</h1>

            <div className="text-lg text-gray-700 space-y-6"
              style={{
                maxWidth: "900px",
                margin: "0 auto",
                fontFamily: "Poppins, sans-serif",
              }}>
              <div>
                <h2 className="font-semibold text-xl">Image Quality:</h2>
                <ul className="list-disc pl-6">
                  <li>Ensure the image is clear and well-focused.</li>
                  <li>Avoid blurry or pixelated images for accurate analysis.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold text-xl">Lighting Conditions:</h2>
                <ul className="list-disc pl-6">
                  <li>Take the images in natural daylight for the best results.</li>
                  <li>Avoid shadows or overexposure on the field.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold text-xl">Field View:</h2>
                <ul className="list-disc pl-6">
                  <li>Capture images of the paddy field with visible weed patches if present.</li>
                  <li>Ensure the camera angle is perpendicular to the field for accurate detection.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold text-xl">File Format:</h2>
                <ul className="list-disc pl-6">
                  <li>Accepted formats: JPG, PNG, or BMP.</li>
                  <li>Maximum file size: 10 MB.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold text-xl">Area Coverage:</h2>
                <ul className="list-disc pl-6">
                  <li>Include a broad field area to ensure more comprehensive weed detection.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold text-xl">Do Not Include:</h2>
                <ul className="list-disc pl-6">
                  <li>Close-ups of individual plants.</li>
                  <li>Images with significant obstructions like people, tools, or animals.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </div>

    </>
  );


};

export default WeedUploadPage;
