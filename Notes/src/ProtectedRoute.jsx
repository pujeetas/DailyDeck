import { Navigate } from "react-router-dom";
import useUserStore from "./hooks/useUserStore";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
