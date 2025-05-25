import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import PaddyYieldHome from "./pages/HarvestGenie/PaddyYeildHome";
import InputPage from "./pages/HarvestGenie/InputPage";
import ResultPage from "./pages/HarvestGenie/ResultPage";
import FieldPreparationPage from "./pages/HarvestGenie/FieldPreparationPage";
import SeedSelectionPage from "./pages/HarvestGenie/SeedSelectionPage";
import CropNurturingPage from "./pages/HarvestGenie/CropNurturingPage";
import PestControlPage from "./pages/HarvestGenie/PestControlPage";
import IrrigationManagementPage from "./pages/HarvestGenie/IrrigationManagementPage";
import HarvestPlanningPage from "./pages/HarvestGenie/HarvestPlaningPage";
import RecommendationsPage from "./pages/HarvestGenie/RecommendationsPage";
import NewFarmer from "./pages/HarvestGenie/NewFarmer";
import ModernLandingPage from "./pages/Homepage";

import VarietyPredictionHome from "./pages/VarietyGenie/VarietyPredictionHome";
import PaddyVarietyForm from "./pages/VarietyGenie/PaddyInputPage";
import VarietyResult from "./pages/VarietyGenie/VarietyResults";
import VarietyDetails from "./pages/VarietyGenie/VarietyDetails";
import RiceVarietiesPage from "./pages/VarietyGenie/Varieties";
import PaddyCropCalender from "./pages/VarietyGenie/PaddyCropCalender";
import VarietyRecommendationProcess from "./pages/VarietyGenie/VarityRecommendatioProcess";

import DiseaseDetection from "./pages/PaddyDoctor/components/DiseaseDetection";
import TreatmentSuggestions from "./pages/PaddyDoctor/components/TreatmentSuggestions";
import PddHomePage from "./pages/PaddyDoctor/components/PddHomePage";
import Diseases from "./pages/PaddyDoctor/components/Diseases";
import FarmerInputs from "./pages/PaddyDoctor/components/FarmerInputs";

import WeedUploadPage from "./pages/Weed/WeedUploadPage";
import WeedResultPage from "./pages/Weed/WeedResultPage";
import WeedMitigationPage from "./pages/Weed/WeedMitigationPage"; 
import WeedPlantInfo from "./pages/Weed/WeedPlantInfo";

import PaddyCultivationMap from "./pages/HarvestGenie/PaddyCultivationMap";
import RiceVarietyMap from "./pages/VarietyGenie/RiceVarietyMap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/register"];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ModernLandingPage />} />
            {/* Rice Prediction Feature */}
            <Route path="/rice-home" element={<PaddyYieldHome />} />
            <Route path="/input-form" element={<InputPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route
              path="/field-preparation"
              element={<FieldPreparationPage />}
            />
            <Route path="/seed-selection" element={<SeedSelectionPage />} />
            <Route path="/crop-nurturing" element={<CropNurturingPage />} />
            <Route path="/pest-control" element={<PestControlPage />} />
            <Route
              path="/irrigation-management"
              element={<IrrigationManagementPage />}
            />
            <Route path="/harvest-planning" element={<HarvestPlanningPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/new-farmer" element={<NewFarmer />} />
            <Route path="/home" element={<ModernLandingPage />} />

            {/* Variety Prediction Feature */}
            <Route path="/variety-home" element={<VarietyPredictionHome />} />
            <Route path="/variety-input" element={<PaddyVarietyForm />} />
            <Route path="/variety-result" element={<VarietyResult />} />
            <Route
              path="/variety-details/:varietyName"
              element={<VarietyDetails />}
            />
            <Route path="/varieties" element={<RiceVarietiesPage />} />
            <Route path="/crop-calender" element={<PaddyCropCalender />} />
            <Route
              path="/variety-process"
              element={<VarietyRecommendationProcess />}
            />

            {/* Paddy doctor*/}
            <Route path="/pddhome" element={<PddHomePage />} />
            <Route path="/detect" element={<DiseaseDetection />} />
            <Route path="/farmer-inputs" element={<FarmerInputs />} />
            <Route path="/treatment" element={<TreatmentSuggestions />} />
            <Route path="/disease" element={<Diseases />} />

             {/* Weed*/}
             <Route path="/weed-detection" element={<WeedUploadPage />} />
          <Route path="/weed-detection/result" element={<WeedResultPage />} />
          <Route path="/weed-detection/mitigation" element={<WeedMitigationPage />} />
          <Route path="/weed-detection/weed-info" element={<WeedPlantInfo />} />

            {/* Common */}
            <Route
              path="/paddy-cultivation-map"
              element={<PaddyCultivationMap />}
            />
            <Route path="/rice-variety-map" element={<RiceVarietyMap />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
