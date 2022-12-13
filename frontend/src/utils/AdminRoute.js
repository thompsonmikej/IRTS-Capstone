import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => { 
  const [user] = useAuth();
  console.log('admin route', children)
  console.log('admin user is student', user.is_student)
  return user.is_student === false ? children : null;
  //the child is <Navigate to="/available" /> for the logged-in selected student;
};

export default AdminRoute;
