import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const IrrigationManagementPage = () => {
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
              src="https://cdn.prod.website-files.com/600ad47aac6ecfe2136e551a/600fb01a00ce6a84cc3f3b15_image%20(8)%201%20(1)-min.png"
              alt="Irrigation Management"
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
              Irrigation Management
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed"
            >
              Plan efficient water usage to ensure consistent growth and optimal yields.
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
            Importance of Irrigation Management
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Efficient irrigation management is essential for maximizing crop yields while conserving water resources. 
            Modern techniques like drip irrigation and smart systems ensure precise water delivery, reducing waste 
            and promoting sustainable farming practices.
          </p>
        </motion.div>

        {/* Key Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden h-full group"
          >
            <div className="h-64 overflow-hidden">
              <img
                src="https://imgs.mongabay.com/wp-content/uploads/sites/20/2023/04/22142124/Cover-photo-Cascade-tank-system-c-IUCN-Sri-Lanka.jpg"
                alt="Traditional Irrigation"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                Traditional Methods
              </h3>
              <p className="text-gray-700">
                Traditional irrigation methods, such as canal and tank systems, have been used for centuries 
                in Sri Lanka. These methods are cost-effective and well-suited for large-scale farming.
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
                src="https://t4.ftcdn.net/jpg/08/47/55/45/360_F_847554506_QBKpjM91OSckV90gX8IgwI4DQOOP7z6d.jpg"
                alt="Modern Irrigation"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                Modern Techniques
              </h3>
              <p className="text-gray-700">
                Modern irrigation systems, such as drip and sprinkler systems, use advanced technology to 
                deliver water precisely where it's needed. These systems reduce water waste and improve crop health.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-green-700 to-green-600 rounded-3xl shadow-xl p-8 mb-16 text-white"
        >
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Benefits of Efficient Irrigation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-4">
                Water Conservation
              </h3>
              <p className="text-lg leading-relaxed">
                Efficient irrigation systems reduce water waste, ensuring sustainable use of this vital resource.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-4">
                Higher Yields
              </h3>
              <p className="text-lg leading-relaxed">
                Proper water management leads to healthier crops and increased productivity.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-4">
                Cost Savings
              </h3>
              <p className="text-lg leading-relaxed">
                Reducing water usage lowers operational costs for farmers.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-4">
                Environmental Protection
              </h3>
              <p className="text-lg leading-relaxed">
                Sustainable irrigation practices help protect ecosystems and reduce soil erosion.
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
            Ready to Optimize Your Irrigation?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Use Rice Genie's AI-powered tools to get personalized irrigation recommendations
            and maximize your harvest potential.
          </p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/input-form")} // Redirect to /input-form
          >
            Get Irrigation Analysis
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IrrigationManagementPage;