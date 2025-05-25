import { useState, useEffect, useRef } from "react";
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const [riceOpen, setRiceOpen] = useState(false);
  const [varietyOpen, setVarietyOpen] = useState(false);
  const [paddyDoctorOpen, setPaddyDoctorOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { isAuthenticated, logout, userEmail } = useAuth();

  // Refs for click outside detection
  const riceDropdownRef = useRef(null);
  const varietyDropdownRef = useRef(null);
  const paddyDoctorDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const bse = '';

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (riceDropdownRef.current && !riceDropdownRef.current.contains(event.target)) {
        setRiceOpen(false);
      }
      if (varietyDropdownRef.current && !varietyDropdownRef.current.contains(event.target)) {
        setVarietyOpen(false);
      }
      if (paddyDoctorDropdownRef.current && !paddyDoctorDropdownRef.current.contains(event.target)) {
        setPaddyDoctorOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
  };

  const getDisplayName = (email) => {
    return email ? email.split('@')[0] : '';
  };

  const toggleRiceDropdown = () => {
    setRiceOpen(!riceOpen);
    setVarietyOpen(false); // Close other dropdowns
    setPaddyDoctorOpen(false);
    setUserDropdownOpen(false);
  };

  const toggleVarietyDropdown = () => {
    setVarietyOpen(!varietyOpen);
    setRiceOpen(false); // Close other dropdowns
    setPaddyDoctorOpen(false);
    setUserDropdownOpen(false);
  };

  const togglePaddyDoctorDropdown = () => {
    setPaddyDoctorOpen(!paddyDoctorOpen);
    setRiceOpen(false); // Close other dropdowns
    setVarietyOpen(false);
    setUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
    setRiceOpen(false); // Close other dropdowns
    setVarietyOpen(false);
    setPaddyDoctorOpen(false);
  };

  return (
    <div className="relative z-20">
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-800/90 backdrop-blur-md"></div>     
      <nav className="relative z-10 shadow-2xl border-b border-green-600/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo + Home */}
            <div className="flex items-center space-x-8">
              <a href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <img src="./logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
                </div>
                <span className="text-white text-xl font-bold tracking-wide">RiceGenie</span>
              </a>
              <a
                href="/"
                className="text-white/90 text-lg font-medium hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300"
              >
                Home
              </a>
            </div>
            
            {/* Navigation Items */}
            <div className="flex items-center space-x-2">
              {/* Rice Genie Dropdown */}
              <div className="relative" ref={riceDropdownRef}>
                <button 
                  onClick={toggleRiceDropdown}
                  className={`text-white/90 bg-darkgreen/0 border-0 text-lg font-medium hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-1 ${riceOpen ? 'bg-white/10 text-white' : ''}`}
                >
                  <span>Rice Genie</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${riceOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {riceOpen && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-green-200/50 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="py-2">
                      <a
                        href="/rice-home"
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-b border-gray-100/50"
                        onClick={() => setRiceOpen(false)}
                      >
                        <div className="font-medium">Harvest Home Page</div>
                        <div className="text-sm text-gray-500">Main dashboard</div>
                      </a>
                      <a
                        href="/input-form"
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-b border-gray-100/50"
                        onClick={() => setRiceOpen(false)}
                      >
                        <div className="font-medium">Harvest Prediction</div>
                        <div className="text-sm text-gray-500">Predict your yield</div>
                      </a>
                      <a
                        href="/paddy-cultivation-map"
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-b border-gray-100/50"
                        onClick={() => setRiceOpen(false)}
                      >
                        <div className="font-medium">Sri Lankan Recent Yield</div>
                        <div className="text-sm text-gray-500">National statistics</div>
                      </a>
                      <a
                        href="/new-farmer"
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200"
                        onClick={() => setRiceOpen(false)}
                      >
                        <div className="font-medium">New Farmer</div>
                        <div className="text-sm text-gray-500">Getting started guide</div>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Variety Genie Dropdown */}
              <div className="relative" ref={varietyDropdownRef}>
                <button 
                  onClick={toggleVarietyDropdown}
                  className={`text-white/90 bg-darkgreen/0 border-0 text-lg font-medium hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-1 ${varietyOpen ? 'bg-white/10 text-white' : ''}`}
                >
                  <span>Variety Genie</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${varietyOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {varietyOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-green-200/50 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="py-2">
                      <a
                        href="/variety-home"
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-b border-gray-100/50"
                        onClick={() => setVarietyOpen(false)}
                      >
                        <div className="font-medium">Variety Home Page</div>
                        <div className="text-sm text-gray-500">Main variety dashboard</div>
                      </a>
                      <a
                        href="/variety-input"
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-b border-gray-100/50"
                        onClick={() => setVarietyOpen(false)}
                      >
                        <div className="font-medium">Variety Prediction</div>
                        <div className="text-sm text-gray-500">Find best varieties</div>
                      </a>
                      <a
                        href="/varieties"
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-b border-gray-100/50"
                        onClick={() => setVarietyOpen(false)}
                      >
                        <div className="font-medium">All Rice Varieties</div>
                        <div className="text-sm text-gray-500">Complete catalog</div>
                      </a>
                      <a
                        href="/variety-process"
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-b border-gray-100/50"
                        onClick={() => setVarietyOpen(false)}
                      >
                        <div className="font-medium">Recommendation Process</div>
                        <div className="text-sm text-gray-500">How it works</div>
                      </a>
                      <a
                        href="/crop-calender"
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-b border-gray-100/50"
                        onClick={() => setVarietyOpen(false)}
                      >
                        <div className="font-medium">Crop Calendar</div>
                        <div className="text-sm text-gray-500">Planting schedule</div>
                      </a>
                      <a
                        href="/rice-variety-map"
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200"
                        onClick={() => setVarietyOpen(false)}
                      >
                        <div className="font-medium">Variety Distribution</div>
                        <div className="text-sm text-gray-500">Regional mapping</div>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Paddy Doctor Dropdown */}
              <div className="relative" ref={paddyDoctorDropdownRef}>
                <button 
                  onClick={togglePaddyDoctorDropdown}
                  className={`text-white/90 bg-darkgreen/0 border-0 text-lg font-medium hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-1 ${paddyDoctorOpen ? 'bg-white/10 text-white' : ''}`}
                >
                  <span>Paddy Doctor</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${paddyDoctorOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {paddyDoctorOpen && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-green-200/50 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="py-2">
                      <a
                        href={`${bse}/pddhome`}
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-b border-gray-100/50"
                        onClick={() => setPaddyDoctorOpen(false)}
                      >
                        <div className="font-medium">Doctor Home Page</div>
                        <div className="text-sm text-gray-500">Main health dashboard</div>
                      </a>
                      <a
                        href={`${bse}/detect`}
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-b border-gray-100/50"
                        onClick={() => setPaddyDoctorOpen(false)}
                      >
                        <div className="font-medium">Disease Detection</div>
                        <div className="text-sm text-gray-500">Diagnose crop issues</div>
                      </a>
                      <a
                        href={`${bse}/disease`}
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-b border-gray-100/50"
                        onClick={() => setPaddyDoctorOpen(false)}
                      >
                        <div className="font-medium">Disease Database</div>
                        <div className="text-sm text-gray-500">Browse all diseases</div>
                      </a>
                      <a
                        href={`${bse}/treatment`}
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200"
                        onClick={() => setPaddyDoctorOpen(false)}
                      >
                        <div className="font-medium">Treatment Guide</div>
                        <div className="text-sm text-gray-500">Cure recommendations</div>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Tabs */}
              <a
                href="/weed-detection"
                className="text-white/90 text-lg font-medium hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-300"
              >
                Weed Detector
              </a>
             

              {/* Authentication Section */}
              {isAuthenticated ? (
                <div className="relative" ref={userDropdownRef}>
                  <button 
                    onClick={toggleUserDropdown}
                    className={`flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 ${userDropdownOpen ? 'bg-white/20' : ''}`}
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {getDisplayName(userEmail).charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-medium text-sm">Hello,</div>
                      <div className="text-white/80 text-sm truncate max-w-32">
                        {getDisplayName(userEmail)}
                      </div>
                    </div>
                    <svg className={`w-4 h-4 text-white/70 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-green-200/50 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                      <div className="py-2">
                        <div className="px-6 py-3 border-b border-gray-100/50">
                          <div className="text-sm text-gray-500">Signed in as</div>
                          <div className="font-medium text-gray-700 truncate">{userEmail}</div>
                        </div>
                        <a
                          href="/profile"
                          className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-b border-gray-100/50"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          Profile Settings
                        </a>
                        <a
                          href="/dashboard"
                          className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-b border-gray-100/50"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          Dashboard
                        </a>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href="/login"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-green-400/30"
                >
                  Login
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;