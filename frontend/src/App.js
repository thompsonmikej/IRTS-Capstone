// General Imports
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import GradsPage from "./pages/GradsPage/GradsPage";
import EnrolledStudentsPage from "./pages/EnrolledStudentsPage/EnrolledStudentsPage"
import AvailableCourses from "./pages/AvailableCourses/AvailableCourses"
import TranscriptPage from "./pages/TranscriptPage/TranscriptPage";
import ScheduledCoursesPage from "./pages/ScheduledCoursesPage/ScheduledCoursesPage";
import AddCoursesPage from "./pages/AddCoursesPage/AddCoursesPage";
import AddGradesPage from "./pages/AddGradesPage/AddGradesPage";
import DirectoryPage from "./pages/DirectoryPage/DirectoryPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import EmployeeRoute from "./utils/EmployeeRoute";
import AdminRoute from "./utils/AdminRoute";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <EmployeeRoute>
                <DirectoryPage />
                
                 

              </EmployeeRoute>
                           
            </PrivateRoute>
          }
        />
        {/* EE access to student records */}
        {/* <Route path="/grades/:studentId/" element={<AddGradesPage />} />
        <Route path="/enrolled/:studentId/" element={<EnrolledStudentsPage />} />
        <Route path="/available/:studentId/" element={<AvailableCourses />} /> */}

        {/* student portal */}
        <Route path="/enrolled" element={<EnrolledStudentsPage />} /> 
        <Route path="/transcript" element={<TranscriptPage />} />
        <Route path="/available" element={<AvailableCourses />} />
        <Route path="/scheduled" element={<ScheduledCoursesPage />} />

        
        {/* EE portal */}
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/grads" element={<GradsPage />} />
        <Route path="/grades" element={<AddGradesPage />} />
        <Route path="/add_courses" element={<AddCoursesPage />} /> 
        <Route path="/HomePage" element={<HomePage />} /> 

      </Routes>
      <Footer />
    </div>
  );
}

export default App;


