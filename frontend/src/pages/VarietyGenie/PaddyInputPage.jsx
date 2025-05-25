import { useState, useEffect } from "react";
import axios from "axios";
import { FaSeedling, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const provinces = [
  "Western Province",
  "Eastern Province",
  "Southern Province",
  "Northern Province",
  "Central Province",
  "Uva Province",
  "Sabaragamuwa Province",
  "North Central Province",
  "North Western Province",
];

const districtData = {
  "Western Province": ["Colombo", "Gampaha", "Kalutara"],
  "Eastern Province": ["Ampara", "Batticaloa", "Trincomalee"],
  "Southern Province": ["Galle", "Matara", "Hambantota"],
  "Northern Province": ["Jaffna", "Kilinochchi", "Mannar"],
  "Central Province": ["Kandy", "Nuwara Eliya", "Matale"],
  "Uva Province": ["Badulla", "Monaragala"],
  "Sabaragamuwa Province": ["Ratnapura", "Kegalle"],
  "North Central Province": ["Anuradhapura", "Polonnaruwa"],
  "North Western Province": ["Kurunegala", "Puttalam"],
};

const RiceVarietyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    province: "",
    district: "",
    ageGroup: ""
  });
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (formData.province) {
      setDistricts(districtData[formData.province] || []);
      setFormData(prev => ({ ...prev, district: "", ageGroup: "" }));
    }
  }, [formData.province]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.province || !formData.district || !formData.ageGroup) {
      setError("Please select all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/rice_varieties",
        {
          province_name: formData.province,
          district_name: formData.district,
          age_group: formData.ageGroup,
        }
      );
      
      navigate("/variety-result", {
        state: {
          province: formData.province,
          district: formData.district,
          ageGroup: formData.ageGroup,
          riceVarieties: response.data.map(v => v.variety_name),
        },
      });
    } catch (error) {
      console.error("Error fetching rice varieties:", error);
      setError("Failed to fetch rice varieties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4" 
         style={{ backgroundImage: `url('https://images.pexels.com/photos/4224250/pexels-photo-4224250.jpeg')` }}>
      
      {/* Main Content Container */}
      <div className="relative w-full max-w-2xl">
        {/* Overlay limited to the form container */}
        <div className="absolute -inset-8 bg-black/80 rounded-2xl"></div>
        
        {/* Form Content */}
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl text-center font-bold text-white mb-6">
            Predict the Best Suited Varieties
          </h2>

          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-center">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Province Dropdown */}
              <div>
                <label htmlFor="province" className="block text-lg font-medium text-white mb-2">
                  Province
                </label>
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                >
                  <option value="" disabled>Select Province</option>
                  {provinces.map(province => (
                    <option key={province} value={province} className="text-gray-800">
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              {/* District Dropdown */}
              <div>
                <label htmlFor="district" className="block text-lg font-medium text-white mb-2">
                  District
                </label>
                <select
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={!formData.province}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all disabled:opacity-50"
                >
                  <option value="" disabled>Select District</option>
                  {districts.map(district => (
                    <option key={district} value={district} className="text-gray-800">
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age Group Dropdown */}
              <div>
                <label htmlFor="ageGroup" className="block text-lg font-medium text-white mb-2">
                  Age Group (months)
                </label>
                <select
                  id="ageGroup"
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleChange}
                  disabled={!formData.province}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all disabled:opacity-50"
                >
                  <div className="text-black">
                    <option value="" disabled>Select Age Group</option>
                    <option value="2.5">2.5</option>
                    <option value="3.0">3.0</option>
                    <option value="3.5">3.5</option>
                    <option value="4.0">4.0</option>
                    <option value="5.0">5.0</option>
                  </div>
                  
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaSeedling />
                    PREDICT
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RiceVarietyForm;


