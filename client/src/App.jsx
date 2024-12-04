import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Home from "./pages/Home/Home/Home";  // Introductory landing page
import HomePage from "./pages/HomePage";        // Home page after login
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Donar from "./pages/Dashboard/Donar";
import Hospitals from "./pages/Dashboard/Hospitals";
import OrganisationPage from "./pages/Dashboard/OrganisationPage";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Donation";
import Analytics from "./pages/Dashboard/Analytics";


// Admin Pages
import DonarList from "./pages/Admin/DonarList";

import HospitalList from "./pages/Admin/HospitalList";
import OrgList from "./pages/Admin/OrgList";
import AdminHome from "./pages/Admin/AdminHome";

// Protected and Public Routes
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Readmore from "./pages/Home/Home/Readmore";
import Learnmore from "./pages/Home/Home/Learnmore";
import DonorCard from "./pages/Dashboard/Donarprofile";

import AdminProfile from "./pages/Dashboard/Adminprofile";
import OrganisationProfile from "./pages/Dashboard/Organisationprofile";
import HospitalProfile from "./pages/Dashboard/Hospitalprofile";
import ClientTicket from "./pages/Dashboard/ClientTicket";
import AdminTicket from "./pages/Dashboard/AdminTicket";
import InventoryOrgan from "./pages/Dashboard/InventoryOrgan";





function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
        <Route path="/donar-list" element={<ProtectedRoute><DonarList /></ProtectedRoute>} />
        <Route path="/hospital-list" element={<ProtectedRoute><HospitalList /></ProtectedRoute>} />
        <Route path="/org-list" element={<ProtectedRoute><OrgList /></ProtectedRoute>} />
        <Route path="/ClientTicket" element={<ProtectedRoute><ClientTicket /></ProtectedRoute>} />
        <Route path="/AdminTicket" element={<ProtectedRoute><AdminTicket /></ProtectedRoute>} />
        <Route path="/InventoryOrgan" element={<ProtectedRoute><InventoryOrgan /></ProtectedRoute>} />
        {/* Dashboard Routes */}
        <Route path="/camp" element={<ProtectedRoute><Hospitals /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/consumer" element={<ProtectedRoute><Consumer /></ProtectedRoute>} />
        <Route path="/donation" element={<ProtectedRoute><Donation /></ProtectedRoute>} />
        <Route path="/organisation" element={<ProtectedRoute><OrganisationPage /></ProtectedRoute>} />
        <Route path="/donar" element={<ProtectedRoute><Donar /></ProtectedRoute>} />
        <Route path="/donarprofile" element={<ProtectedRoute><DonorCard /></ProtectedRoute>} />
        <Route path="/adminprofile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
        <Route path="/organisationprofile" element={<ProtectedRoute><OrganisationProfile /></ProtectedRoute>} />
        <Route path="/Hospitalprofile" element={<ProtectedRoute><HospitalProfile /></ProtectedRoute>} />
        
        {/* Home Page (after login) */}
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} /> {/* HomePage is for logged-in users */}
        
        {/* Landing Page (before login) */}
        <Route path="/" element={<Home />} /> {/* LandingPage is the first page */}
        <Route path="/Readmore" element={<Readmore />} />
        <Route path="/Learnmore" element={<Learnmore />} /> {/* LandingPage is the
      

        {/* Auth Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      </Routes>
    </>
  );
}

export default App;
