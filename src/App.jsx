import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClarissaWebsite from "./ClarissaWebsite";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectsPage from "./pages/ProjectsPage";
import ServicesPage from "./pages/ServicesPage";
import ResearchPage from "./pages/ResearchPage";
import ProtectedRoute from "./components/ProtectedRoute";
import BookingPage from "./BookingPage";
import BookingConfirmed from "./BookingConfirmed";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClarissaWebsite />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/publications" element={<ResearchPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/booking-confirmed" element={<BookingConfirmed />} />
        <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
