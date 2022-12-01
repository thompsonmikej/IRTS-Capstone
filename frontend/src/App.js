// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import GradsPage from "./pages/GradsPage/GradsPage";
import GradeReport from "./pages/UngradedCourses/UngradedCourses"
import AllUsers from "./pages/AllUsers/AllUsers"
import AllCourses from "./pages/AllCourses/AllCourses"

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import TranscriptPage from "./pages/TranscriptPage/TranscriptPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/grads" element={<GradsPage />} />
        <Route path="/grades" element={<GradeReport />} />
        <Route path="/enrolled" element={<AllUsers />} />
        <Route path="/available" element={<AllCourses />} />
        <Route path="/transcript" element={<TranscriptPage />} />
        
        {/* Route for grad page */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;


