// General Imports
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import GradsPage from "./pages/GradsPage/GradsPage";
import AllUsers from "./pages/AllUsers/AllUsers"
import AvailableCourses from "./pages/AvailableCourses/AvailableCourses"
import TranscriptPage from "./pages/TranscriptPage/TranscriptPage";
import ScheduledCoursesPage from "./pages/ScheduledCoursesPage/ScheduledCoursesPage";
import AddCoursesPage from "./pages/AddCoursesPage/AddCoursesPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";


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
        {/* <Route path="/grades" element={<GradeReport />} /> */}
        <Route path="/enrolled" element={<AllUsers />} />
        <Route path="/available" element={<AvailableCourses />} />
        <Route path="/transcript" element={<TranscriptPage />} />
        <Route path="/scheduled" element={<ScheduledCoursesPage />} />
        <Route path="/add_courses" element={<PrivateRoute><AddCoursesPage /></PrivateRoute>} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;


