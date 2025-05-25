import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SeedSelectionPage = () => {
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
              src="https://images.pexels.com/photos/18446086/pexels-photo-18446086/free-photo-of-close-up-of-seeds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Selecting Paddy Seeds"
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
              Seed Selection and Sowing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed"
            >
              Discover how Sri Lankan farmers ensure quality through the careful
              selection of seeds and strategic sowing methods, combining tradition
              and innovation.
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
            Importance of Seed Selection
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            In Sri Lanka, seed selection is a critical process. Farmers often
            choose traditional paddy varieties like "Suwandel" or "Kalu Heenati"
            for their resilience and nutritional value. Modern hybrid seeds have
            also gained popularity for their high yields and disease resistance.
            Proper seed selection ensures better germination, healthier crops, and
            higher productivity.
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
                src="https://i.ytimg.com/vi/oYiuCAO1XTc/sddefault.jpg"
                alt="Sowing Techniques"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                Sowing Techniques
              </h3>
              <p className="text-gray-700">
                Sowing methods range from broadcasting seeds to using direct
                seeding tools. In rain-fed regions, farmers adapt their techniques
                to ensure maximum water absorption and germination. Modern methods
                like precision seeding ensure uniform spacing and optimal growth.
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
                src="https://doa.gov.lk/wp-content/uploads/2021/02/RRDI_AgroTech2_3.jpg"
                alt="Seed Treatment"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                Traditional & Modern Methods
              </h3>
              <p className="text-gray-700">
                Sri Lankan farmers blend traditional seed treatments, like soaking
                seeds in cow dung for protection, with modern innovations such as
                precision seeding equipment. These practices enhance crop health
                and ensure sustainable farming.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Additional Section: Seed Varieties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-700 mb-6">
            Popular Seed Varieties in Sri Lanka
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src="https://www.agrimin.gov.lk/web/images/pictures/News/2022.02.24-4/image_agc_01.jpeg"
                alt="Suwandel Rice"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-green-700 mb-2">
                Suwandel
              </h3>
              <p className="text-gray-700">
                A traditional rice variety known for its fragrant aroma and
                nutritional value. It is highly resistant to pests and diseases.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/164504/pexels-photo-164504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Kalu Heenati Rice"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-green-700 mb-2">
                Kalu Heenati
              </h3>
              <p className="text-gray-700">
                A red rice variety rich in antioxidants and minerals. It is
                drought-resistant and ideal for organic farming.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-green-700 to-green-600 rounded-3xl shadow-xl p-8 mb-16 text-white"
        >
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Benefits of Proper Seed Selection
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Higher Yields
              </h3>
              <p className="text-lg leading-relaxed">
                Choosing high-quality seeds ensures better germination rates and
                healthier crops, leading to higher yields.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Disease Resistance
              </h3>
              <p className="text-lg leading-relaxed">
                Modern hybrid seeds are often bred for resistance to common
                diseases, reducing the need for chemical treatments.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Sustainability
              </h3>
              <p className="text-lg leading-relaxed">
                Traditional seed treatments and organic practices promote
                sustainable farming and soil health.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Cost Efficiency
              </h3>
              <p className="text-lg leading-relaxed">
                Proper seed selection reduces the need for replanting and
                minimizes resource wastage.
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
            Ready to Optimize Your Seed Selection?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Use our AI-powered tools to select the best seeds and maximize your
            harvest potential.
          </p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/input-form")} // Redirect to /new-farmer
          >
            Get Started
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SeedSelectionPage;