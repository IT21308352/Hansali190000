import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const FieldPreparationPage = () => {
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
              src="https://i.ytimg.com/vi/u2W4DmcIFec/maxresdefault.jpg"
              alt="Field Preparation in Sri Lanka"
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
              Field Preparation
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed"
            >
              The foundation of a successful harvest begins with
              proper field preparation
            </motion.p>
          </div>
        </div>

        {/* Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-700 mb-6">
            Importance of Field Preparation
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Field preparation is the critical first step towards a
            successful paddy harvest. In Sri Lanka, this process
            often begins with clearing the fields of debris and
            leveling the land. Proper preparation ensures efficient
            irrigation and optimal root development for healthy crop
            growth. Additionally, it helps prevent weed infestation,
            which can significantly reduce the yield. With proper
            planning, farmers can create an environment that
            maximizes crop resilience to pests and diseases.
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden h-full group"
          >
            <div className="h-64 overflow-hidden">
              <img
                src="https://doa.gov.lk/wp-content/uploads/2020/06/RRDI_LandLeveling_300.jpg"
                alt="Soil Preparation in Paddy Fields"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                Soil Preparation
              </h3>
              <p className="text-gray-700">
                Farmers in Sri Lanka enrich the soil using
                organic methods, including adding compost and
                livestock manure. These traditional techniques
                help improve soil structure, ensuring water
                retention and nutrient availability. Modern
                farmers also conduct soil testing to assess pH
                levels and nutrient deficiencies, allowing them
                to apply the right fertilizers and amendments
                for balanced growth.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden h-full group"
          >
            <div className="h-64 overflow-hidden">
              <img
                src="https://pub.mdpi-res.com/agronomy/agronomy-11-01264/article_deploy/html/images/agronomy-11-01264-g004.png?1625494334"
                alt="Modern Field Preparation in Sri Lanka"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                Modern Techniques
              </h3>
              <p className="text-gray-700">
                Modern Sri Lankan farmers combine traditional
                tools like the mammoty with machinery such as
                tractors for efficient field preparation.
                Advanced irrigation techniques, including laser
                leveling, have also gained popularity, ensuring
                uniform water distribution across the fields.
                Drone technology is being explored for field
                mapping and monitoring, providing precise data
                for better management of resources.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Steps Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-green-700 to-green-600 rounded-3xl shadow-xl p-8 mb-16 text-white"
        >
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Essential Field Preparation Steps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-white text-green-700 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Land Clearing
              </h3>
              <p>
                Remove debris, previous crop residues, and weeds
                to create a clean slate for the new crop cycle.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-white text-green-700 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Soil Testing
              </h3>
              <p>
                Analyze soil composition to determine pH levels
                and identify any nutrient deficiencies that need
                addressing.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-white text-green-700 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Land Leveling
              </h3>
              <p>
                Create a level surface to ensure even water
                distribution and prevent water logging in
                certain areas.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-white text-green-700 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Soil Amendment
              </h3>
              <p>
                Add organic matter, compost, or specific
                fertilizers based on soil test results to
                enhance fertility.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-white text-green-700 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                5
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Irrigation Setup
              </h3>
              <p>
                Install or prepare irrigation channels to ensure
                consistent water supply throughout the growing
                season.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-white text-green-700 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                6
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Final Tilling
              </h3>
              <p>
                Perform a final till of the soil to create the
                ideal seedbed texture for planting or
                transplanting.
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
            Ready to optimize your field preparation?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Use Rice Genie's AI-powered tools to get personalized
            recommendations for your specific field conditions and
            maximize your harvest potential.
          </p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/input-form")} // Redirect to /register
          >
            Get Field Analysis
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FieldPreparationPage;