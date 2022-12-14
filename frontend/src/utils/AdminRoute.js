import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => { 
  const [user] = useAuth();
  console.log('admin route', children)
  console.log('admin user is student', user.is_student)
  return user.is_student === false ? user==userId : null;
  
  // Employee tries to enroll a student in a course without having to log in as the student.
  //return user.is an employee ? (display) the chosen student userId object: user.is the student;
  //return user.is_student === false ? (display the) userId object: user.is_student === True;
  //return user.is_student === false ? <Navigate to="/available" />: user.is_student === True;
  //the child is <Navigate to="/available" /> for the logged-in selected student;
};

export default AdminRoute;
