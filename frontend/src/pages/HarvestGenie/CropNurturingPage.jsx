import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CropNurturingPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-16">
          <div className="absolute inset-0">
            <img
              src="https://www.ips.lk/talkingeconomics/wp-content/uploads/2021/10/wilsan-u-BCATbA86WAw-unsplash-640x416.jpg"
              alt="Crop Nurturing in Sri Lanka"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>

          <div className="relative py-32 px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-bold text-white mb-6"
            >
              Crop Nurturing for Paddy Prediction
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed"
            >
              Leverage data-driven insights and modern technology to nurture
              healthy paddy fields and predict optimal harvest outcomes.
            </motion.p>
          </div>
        </div>

        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-700 mb-6">
            The Role of Crop Nurturing in Paddy Prediction
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Crop nurturing is a critical component of the paddy prediction
            system. By monitoring growth stages, soil health, and environmental
            conditions, farmers can make informed decisions to optimize yield.
            Integrating predictive analytics with traditional nurturing
            techniques ensures that crops receive the right care at the right
            time, reducing risks and maximizing productivity.
          </p>
        </motion.div>

        {/* Key Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden h-full"
          >
            <div className="h-64 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/226615/pexels-photo-226615.jpeg"
                alt="IoT and Data Collection in Paddy Fields"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                IoT and Data Collection
              </h3>
              <p className="text-gray-700">
                Modern paddy farming in Sri Lanka utilizes IoT devices to collect
                real-time data on soil moisture, temperature, and humidity. This
                data is fed into the paddy prediction system to provide
                actionable insights for crop nurturing, such as optimal irrigation
                schedules and fertilizer application.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden h-full"
          >
            <div className="h-64 overflow-hidden">
              <img
                src="https://www.mdpi.com/agriculture/agriculture-11-00305/article_deploy/html/images/agriculture-11-00305-g001.png"
                alt="AI-Driven Predictive Analytics"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                AI-Driven Predictive Analytics
              </h3>
              <p className="text-gray-700">
                The paddy prediction system uses AI algorithms to analyze
                historical and real-time data, predicting crop growth stages,
                potential pest outbreaks, and yield estimates. This allows
                farmers to proactively address issues and optimize nurturing
                practices for better outcomes.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Traditional vs Modern Practices Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-green-700 to-green-600 rounded-3xl shadow-xl p-8 mb-16 text-white"
        >
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Combining Traditional Wisdom with Modern Technology
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Traditional Practices
              </h3>
              <p className="text-lg leading-relaxed">
                Sri Lankan farmers have long relied on traditional methods such as
                organic composting, crop rotation, and manual weeding. These
                practices are sustainable and time-tested, ensuring soil health
                and biodiversity.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Modern Innovations
              </h3>
              <p className="text-lg leading-relaxed">
                Modern technology, including IoT sensors, drones, and AI-driven
                analytics, complements traditional practices by providing
                precision and efficiency. For example, drones can monitor large
                fields for pest infestations, while AI predicts the best time for
                planting and harvesting.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Benefits of Data-Driven Nurturing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-700 mb-6">
            Benefits of Data-Driven Crop Nurturing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                Increased Yield
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                By using predictive analytics, farmers can optimize irrigation,
                fertilization, and pest control, leading to higher crop yields.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                Reduced Costs
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Precision agriculture minimizes resource wastage, reducing costs
                associated with water, fertilizers, and pesticides.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                Sustainability
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Data-driven nurturing promotes sustainable farming by ensuring
                efficient use of resources and reducing environmental impact.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                Risk Mitigation
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Early detection of pests, diseases, and adverse weather
                conditions helps farmers take preventive measures, reducing crop
                losses.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-lg p-8 text-center"
        >
          <h2 className="text-3xl font-semibold text-green-700 mb-6">
            Ready to Optimize Your Crop Nurturing?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Use our AI-powered paddy prediction system to get personalized
            recommendations for crop nurturing and maximize your harvest
            potential.
          </p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/input-form")} // Redirect to /new-farmer
          >
            Get Field Analysis
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CropNurturingPage;