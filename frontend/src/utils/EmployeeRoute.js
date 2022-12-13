import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const EmployeeRoute = ({ children }) => {
  const [user] = useAuth();
  console.log('employee route', children)
  console.log('employee user is student', user.is_student)
  return user.is_student === false ? children : <Navigate to="/transcript" />;
};

export default EmployeeRoute;
