// General Imports
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";

// Pages Imports
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import GradsPage from "./pages/GradsPage/GradsPage";
import StudentDirectoryPage from "./pages/StudentDirectoryPage/StudentDirectoryPage"
import AvailableCourses from "./pages/AvailableCourses/AvailableCourses"
import TranscriptPage from "./pages/TranscriptPage/TranscriptPage";
import ScheduledCoursesPage from "./pages/ScheduledCoursesPage/ScheduledCoursesPage";
import SelectedStudentPage from "./pages/FindStudentCoursePage/FindStudentCoursePage";
import AddCoursesPage from "./pages/AddCoursesPage/AddCoursesPage";
import FindStudentPage from "./pages/FindStudentCoursePage/FindStudentCoursePage";
import GradeCoursePage from "./pages/GradeCoursePage/GradeCoursePage";
import EmployeePortalPage from "./pages/EmployeePortalPage/EmployeePortalPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import EmployeeRoute from "./utils/EmployeeRoute";


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
                <EmployeePortalPage />
                  
              </EmployeeRoute>
                           
            </PrivateRoute>
          }
        />
        {/* student portal */}
        <Route path="/enrolled" element={<StudentDirectoryPage />} /> 
        <Route path="/transcript" element={<TranscriptPage />} />
        <Route path="/available" element={<AvailableCourses />} />
        <Route path="/student/:studentId" element={<SelectedStudentPage />} />
        <Route path="/scheduled" element={<ScheduledCoursesPage />} />
        
        {/* EE portal */}
        <Route path="/directory" element={<EmployeePortalPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/grade_course/:studentId" element={<GradeCoursePage />} />
        <Route path="/grads" element={<GradsPage />} />
        <Route path="/find_student_course/:studentId" element={<FindStudentPage />} />
        <Route path="/add_courses" element={<AddCoursesPage />} /> 

      </Routes>
      <Footer />
    </div>
  );
}

export default App;


