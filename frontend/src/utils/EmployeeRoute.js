import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const EmployeeRoute = ({ children }) => {
  const [user] = useAuth();
  return user.is_student === false ? children : <Navigate to="/transcript" />;
};

export default EmployeeRoute;
